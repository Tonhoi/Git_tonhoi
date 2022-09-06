import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./UpdateUserInfoPage.module.scss";
import { useParams } from "react-router-dom";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../../firebase/firebase-config";

const cx = classNames.bind(styles);
const UpdateUserInfoPage = () => {
  const { uid } = useParams();
  const [user, setUser] = useState([]);
  console.log(user);
  useEffect(() => {
    const database = doc(db, "users", uid);
    onSnapshot(database, (doc) => {
      setUser(doc.data());
    });
  }, []);
  return (
    <form className={cx("wrapper")}>
      <div className={cx("form-group")}>
        <label htmlFor=""></label>
        <input
          type="text"
          name="username"
          placeholder="Họ và tên"
          value={user.displayName}
        />
      </div>
      <div className={cx("form-group")}>
        <label htmlFor=""></label>
        <input
          type="text"
          name="email"
          placeholder="email"
          value={user.email}
        />
      </div>
      <div className={cx("form-group")}>
        <label htmlFor=""></label>
        <input
          type="password"
          name="password"
          placeholder="mật khẩu"
          value={user.password}
        />
      </div>
      <div className={cx("form-group")}>
        <label htmlFor=""></label>
        <input
          type="password"
          name="confirm_password"
          placeholder="Nhập lại mật khẩu"
          value={user.password}
        />
      </div>
    </form>
  );
};

export default UpdateUserInfoPage;
