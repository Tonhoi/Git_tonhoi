import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./UpdateUserInfoPage.module.scss";
import { useParams } from "react-router-dom";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { updateProfile, updateEmail, updatePassword } from "firebase/auth";
import { auth, db } from "../../../../firebase/firebase-config";

const cx = classNames.bind(styles);
const UpdateUserInfoPage = () => {
  console.log("re-render");
  const { uid } = useParams();
  const [user, setUser] = useState([]);
  const [inputValue, setInpuValue] = useState({
    fullname: "",
    email: "",
    password: "",
  });
  // console.log(inputValue);
  useEffect(() => {
    const database = doc(db, "users", uid);
    onSnapshot(database, (doc) => {
      setUser(doc.data());
    });
  }, []);

  const handleInputChange = (e) => {
    setInpuValue({
      ...inputValue,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const database = doc(db, "users", uid);
      await updateProfile(auth.currentUser, {
        displayName: inputValue.fullname,
      });
      console.log(auth);

      await updateDoc(database, {
        displayName:
          inputValue.fullname !== "" && inputValue.fullname !== user.displayName
            ? inputValue.fullname
            : user.displayName,
        email:
          inputValue.email !== "" && inputValue.email !== user.email
            ? inputValue.email
            : user.email,
        password:
          inputValue.password !== "" && inputValue.password !== user.password
            ? inputValue.password
            : user.password,
      });
    } catch (error) {
      console.log("có lỗi xảy ra !!");
    }
  };
  return (
    <form className={cx("wrapper")} onSubmit={handleSubmit}>
      <div className={cx("form-group")}>
        <label htmlFor=""></label>
        <input
          type="text"
          name="fullname"
          placeholder="Họ và tên"
          value={inputValue.fullname || user.displayName}
          onChange={handleInputChange}
        />
      </div>
      <div className={cx("form-group")}>
        <label htmlFor=""></label>
        <input
          type="email"
          name="email"
          placeholder="email"
          value={inputValue.email || user.email}
          onChange={handleInputChange}
        />
      </div>
      <div className={cx("form-group")}>
        <label htmlFor=""></label>
        <input
          type="password"
          name="password"
          placeholder="mật khẩu"
          value={inputValue.password || user.password}
          onChange={handleInputChange}
        />
      </div>
      <button>Lưu thay đổi</button>
    </form>
  );
};

export default UpdateUserInfoPage;
