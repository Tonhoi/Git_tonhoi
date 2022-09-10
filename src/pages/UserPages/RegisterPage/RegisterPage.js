import React, { useState } from "react";
import classNames from "classnames/bind";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { auth, db } from "../../../firebase/firebase-config";

import styles from "./Register.module.scss";
import { GoogleIcon } from "../../../components/Icons/Icons";
import { setUserInfo } from "../../../redux/reducer";

const cx = classNames.bind(styles);
const Register = () => {
  const database = collection(db, "users");
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const currentUser = useSelector((prev) => prev.root.userinfo);

  const schema = yup.object({
    username: yup
      .string()
      .required("Trường này không được để trống")
      .min(6, "Họ và tên phải có tối thiểu 6 ký tự")
      .max(14, "Họ và tên không được vượt quá 14 kí tự"),
    email: yup
      .string()
      .required("Trường này không được để trống")
      .email("Email phải có định dạng: @gmail.com"),
    password: yup
      .string()
      .required("Trường này không được để trống")
      .max(20, "Mật khẩu quá dài")
      .min(6, "Mật khẩu phải có tối thiểu 6 ký tự")
      .oneOf([yup.ref("confirm_password")], "2 mật khẩu không trùng nhau"),
    confirm_password: yup
      .string()
      .required("Trường này không được để trống")
      .max(20, "Mật khẩu quá dài")
      .min(6, "Mật khẩu phải có tối thiểu 6 ký tự")
      .oneOf([yup.ref("password")], "2 mật khẩu không trùng nhau"),
  });

  const [inputValue, setInputValue] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const handleInputChange = (e) => {
    setInputValue({
      ...inputValue,
      [e.target.id]: e.target.value,
    });
  };
  // console.log(inputValue);

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
      const user = await createUserWithEmailAndPassword(
        auth,
        inputValue.email,
        inputValue.password
      );

      await addDoc(database, {
        uid: auth.currentUser.uid,
        displayName: inputValue.username,
        email: inputValue.email,
        password: inputValue.password,
        role: 0,
        createAt: serverTimestamp(),
      });
      await updateProfile(auth.currentUser, {
        displayName: inputValue.username,
      });
      dispatch(setUserInfo(user));
      navigate("/");
      console.log("chuyển hướng thành công");
    } catch (error) {
      console.log("có lỗi xảy ra");
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
      console.log(user);
      await addDoc(database, {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        role: 0,
        createAt: serverTimestamp(),
      });
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
    <form className={cx("wrapper")} onSubmit={handleSubmit(onSubmit)}>
      <div>
        <h1 className={cx("heading")}>Đăng ký</h1>
        <div className={cx("form-control-block")}>
          <div className={cx("form-control")}>
            <label htmlFor="" className={cx("form-label")}>
              Họ và tên
            </label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Họ và tên"
              className={cx("form-input")}
              {...register("username")}
              onChange={handleInputChange}
            />
            <i className={cx("error-message")}>{errors.username?.message}</i>
          </div>
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
              onChange={handleInputChange}
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
              placeholder="Mật khẩu"
              className={cx("form-input")}
              {...register("password")}
              onChange={handleInputChange}
            />
            <i className={cx("error-message")}>{errors.password?.message}</i>
          </div>
          <div className={cx("form-control")}>
            <label htmlFor="" className={cx("form-label")}>
              Nhập lại mật khẩu
            </label>
            <input
              type="password"
              name="confirm_password"
              id="confirm_password"
              placeholder="Nhập lại mật khẩu"
              className={cx("form-input")}
              value={inputValue.confirm_password}
              {...register("confirm_password")}
              onChange={handleInputChange}
            />
            <i className={cx("error-message")}>
              {errors.confirm_password?.message}
            </i>
          </div>

          <div className={cx("form-control-checkbox")}>
            <input type="checkbox" className={cx("form-input")} />
            <span className={cx("form-title")}>Ghi nhớ</span>
          </div>
          <div className={cx("btn-wrapper")}>
            <div className={cx("btn-block")}>
              <button className={cx("btn-login-normal")}>Đăng ký</button>
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
        <Link to="/login" className={cx("login")}>
          Đăng Nhập
        </Link>
      </div>
    </form>
  );
};

export default Register;
