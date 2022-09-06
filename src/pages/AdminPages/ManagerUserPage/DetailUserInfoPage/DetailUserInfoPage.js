import React from "react";
import classNames from "classnames/bind";
import { doc, onSnapshot } from "firebase/firestore";

import styles from "./DetailUserInfoPage.module.scss";
import { useEffect } from "react";
import { db } from "../../../../firebase/firebase-config";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { routes } from "../../../../configs";

const cx = classNames.bind(styles);
const DetailUserInfoPage = () => {
  const { uid } = useParams();
  const [user, setUser] = useState([]);
  useEffect(() => {
    const database = doc(db, "users", uid);
    onSnapshot(database, (doc) => {
      setUser(doc.data());
    });
  }, []);
  return (
    <div className={cx("wrapper")}>
      <div className={cx("btn-block")}>
        <Link to={routes.managerUser} className={cx("btn")}>
          Trở về
        </Link>
      </div>
      <h3 className={cx("heading")}>Chi tiết tài khoản</h3>
      <div style={{ overflowX: "auto" }}>
        <table>
          <thead>
            <tr className={cx("title-block")}>
              <td>id</td>
              <td>: {uid}</td>
            </tr>
            <tr className={cx("title-block")}>
              <td>Họ và tên</td>
              <td>: {user.displayName}</td>
            </tr>
            <tr className={cx("title-block")}>
              <td>Email</td>
              <td>: {user.email}</td>
            </tr>
            <tr className={cx("title-block")}>
              <td>Quyền hiện tại</td>
              <td>: {user.role === 0 ? "user" : "admin"}</td>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  );
};

export default DetailUserInfoPage;
