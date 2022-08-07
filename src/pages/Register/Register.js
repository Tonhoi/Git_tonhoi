import React, { useState } from "react";
import classNames from "classnames/bind";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import { auth } from "../../firebase/firebase-config";

import styles from "./Register.module.scss";
import { GoogleIcon } from "../../components/Icons/Icons";
import { setUserInfo } from "../../redux/reducer";

const cx = classNames.bind(styles);
const Register = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const handleInput = (e) => {
    setInputValue({
      ...inputValue,
      [e.target.name]: e.target.value,
    });
  };
  // console.log(inputValue);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        inputValue.email,
        inputValue.password
      );
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

  return (
    <form className={cx("wrapper")} onSubmit={handleSubmit}>
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
              value={inputValue.username}
              onChange={handleInput}
            />
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
              value={inputValue.email}
              onChange={handleInput}
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
              placeholder="Mật khẩu"
              className={cx("form-input")}
              value={inputValue.password}
              onChange={handleInput}
            />
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
              onChange={handleInput}
            />
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
        <Link to="/login" className={cx("login")}>
          Đăng Nhập
        </Link>
      </div>
    </form>
  );
};

export default Register;
