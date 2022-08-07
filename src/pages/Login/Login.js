import React, { useState } from "react";
import classNames from "classnames/bind";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "../../firebase/firebase-config";

import styles from "./Login.module.scss";
import { GoogleIcon } from "../../components/Icons/Icons";
import { setUserInfo } from "../../redux/reducer";

const cx = classNames.bind(styles);
const Login = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const currentUser = useSelector((prev) => prev.root.userinfo);
  console.log(currentUser);
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  console.log(inputValue);

  const handleChangeInput = (e) => {
    setInputValue({
      ...inputValue,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await signInWithEmailAndPassword(
      auth,
      inputValue.email,
      inputValue.password
    );
    dispatch(setUserInfo(user));
    console.log("đăng nhập thành công");
    navigate("/");
  };
  return (
    <>
      {!currentUser ? (
        <form className={cx("wrapper")} onSubmit={handleSubmit}>
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
                  value={inputValue.email}
                  onChange={handleChangeInput}
                />
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
                  value={inputValue.password}
                  onChange={handleChangeInput}
                />
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
                  <button className={cx("btn-login-other")}>
                    <div className={cx("icon-block")}>
                      <GoogleIcon className={cx("google-icon")} />
                    </div>
                    <span>Đăng nhập với Google</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className={cx("footer-form")}>
            <Link to="/register" className={cx("register")}>
              Đăng ký
            </Link>
            <span>|</span>
            <span>Quên mật khẩu</span>
          </div>
        </form>
      ) : (
        <h2>Bạn đã đăng nhập</h2>
      )}
    </>
  );
};

export default Login;
