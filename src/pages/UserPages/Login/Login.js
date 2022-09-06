import React, { useState } from "react";
import classNames from "classnames/bind";
// firebase
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  getAdditionalUserInfo,
} from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
// validation form with react-hook-form
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// toast message
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styles from "./Login.module.scss";
import { auth, db } from "../../../firebase/firebase-config";
import { GoogleIcon } from "../../../components/Icons/Icons";
import { setUserInfo } from "../../../redux/reducer";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { ErrorPage } from "../ErrorPage";

const cx = classNames.bind(styles);
const Login = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const database = collection(db, "users");

  const currentUser = useSelector((prev) => prev.root.userinfo);
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });

  const schema = yup.object({
    email: yup
      .string()
      .required("Trường này không được để trống")
      .email("Email phải có định dạng: @gmail.com"),
    password: yup
      .string()
      .required("Trường này không được để trống")
      .max(20, "Mật khẩu quá dài")
      .min(6, "Mật khẩu phải có tối thiểu 6 ký tự"),
  });

  const handleChangeInput = (e) => {
    setInputValue({
      ...inputValue,
      [e.target.id]: e.target.value,
    });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (e) => {
    // e.preventDefault();
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        inputValue.email,
        inputValue.password
      );
      dispatch(setUserInfo(user));
      console.log("đăng nhập thành công");
      navigate("/");
    } catch (error) {
      toast("Tài khoản hoặc mật khẩu không chính xác");
    }
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    try {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      // The signed-in user info.
      const user = result.user;

      if (getAdditionalUserInfo(result).isNewUser) {
        await addDoc(database, {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          role: 0,
          createAt: serverTimestamp(),
        });
        console.log("chưa tồn tại");
      } else {
        console.log("đã tồn tại");
      }
      navigate("/");
    } catch (error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log({ errorCode, errorMessage, email, credential });
    }
  };
  return (
    <>
      <ToastContainer />
      {!currentUser ? (
        <form className={cx("wrapper")} onSubmit={handleSubmit(onSubmit)}>
          <div>
            <h1 className={cx("heading")}>Đăng nhập</h1>
            <div className={cx("form-control-block")}>
              <div className={cx("form-control")}>
                <label htmlFor="" className={cx("form-label")}>
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  placeholder="Email"
                  className={cx("form-input")}
                  {...register("email")}
                  onChange={handleChangeInput}
                />
                <i className={cx("error-message")}>{errors.email?.message}</i>
              </div>
              <div className={cx("form-control")}>
                <label htmlFor="" className={cx("form-label")}>
                  Mật khẩu
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  className={cx("form-input")}
                  {...register("password")}
                  onChange={handleChangeInput}
                />
                <i className={cx("error-message")}>
                  {errors.password?.message}
                </i>
              </div>

              <div className={cx("form-control-checkbox")}>
                <input type="checkbox" className={cx("form-input")} />
                <span className={cx("form-title")}>Ghi nhớ</span>
              </div>
              <div className={cx("btn-wrapper")}>
                <div className={cx("btn-block")}>
                  <button className={cx("btn-login-normal")}>Đăng nhập</button>
                </div>

                <div className={cx("btn-block")}>
                  <h3>Hoặc</h3>
                </div>

                <div className={cx("btn-block")}>
                  <span
                    className={cx("btn-login-other")}
                    onClick={signInWithGoogle}
                  >
                    <div className={cx("icon-block")}>
                      <GoogleIcon className={cx("google-icon")} />
                    </div>
                    <span>Đăng nhập với Google</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className={cx("footer-form")}>
            <Link to="/register" className={cx("register")}>
              Đăng ký
            </Link>
            <span>|</span>
            <Link to="/forgotPassword" className={cx("forgot_password")}>
              Quên mật khẩu
            </Link>
          </div>
        </form>
      ) : (
        <ErrorPage />
      )}
    </>
  );
};

export default Login;
