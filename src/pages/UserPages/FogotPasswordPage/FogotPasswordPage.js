import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./FogotPasswordPage.module.scss";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { auth } from "../../../firebase/firebase-config";
const cx = classNames.bind(styles);
const FogotPasswordPage = () => {
  const currentUser = useSelector((prev) => prev.root.userinfo);
  const [inputValue, setInputValue] = useState("");

  //   console.log(inputValue);
  const handleChangeInput = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendPasswordResetEmail(auth, inputValue);
    toast(
      "Đã gửi yêu cầu lấy mật khẩu vào email của bạn, hãy kiểm tra làm theo hướng dẫn trong email để có thể lấy lại mật khẩu của bạn !!"
    );
  };
  return (
    <>
      <ToastContainer />
      {!currentUser ? (
        <form className={cx("wrapper")} onSubmit={handleSubmit}>
          <div>
            <h1 className={cx("heading")}>Quên mật khẩu</h1>
            <div className={cx("form-control-block")}>
              <div className={cx("form-control")}>
                <label htmlFor="" className={cx("form-label")}>
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  className={cx("form-input")}
                  onChange={handleChangeInput}
                  required="Trường này không được bỏ trống"
                  e
                />
              </div>
              <div className={cx("btn-wrapper")}>
                <div className={cx("btn-block")}>
                  <button className={cx("btn-send-Mail")}>Lấy mật khẩu</button>
                </div>
              </div>
            </div>
          </div>

          <div className={cx("footer-form")}>
            <Link to="/register" className={cx("register")}>
              Đăng ký
            </Link>
            <span>|</span>
            <Link to="/login" className={cx("forgot_password")}>
              Đăng nhập
            </Link>
          </div>
        </form>
      ) : (
        <h2>Bạn đã đăng nhập</h2>
      )}
    </>
  );
};

export default FogotPasswordPage;
