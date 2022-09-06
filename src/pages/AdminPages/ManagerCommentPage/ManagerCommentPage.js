import React, { useEffect } from "react";
import classNames from "classnames/bind";
import { collection, onSnapshot } from "firebase/firestore";
import { useState } from "react";
import Modal from "react-modal";

import { db } from "../../../firebase/firebase-config";
import styles from "./ManagerCommentPage.module.scss";

const cx = classNames.bind(styles);
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "calc(100% - 12px)",
    overflow: "unset",
    width: "500px",
  },
};
Modal.setAppElement("#root");
const ManagerCommentPage = () => {
  const database = collection(db, "comments");
  const [users, setUsers] = useState([]);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  let subtitle;

  const openModal = () => {
    setIsOpen(true);
  };

  const afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    onSnapshot(database, (snapshot) => {
      let users = [];
      snapshot.docs.forEach((doc) => {
        users.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setUsers(users);
    });
  }, []);
  return (
    <div className={cx("wrapper")}>
      <div className={cx("heading")}>
        <h3>Quản lý người dùng</h3>
        <button onClick={openModal} className={cx("button-heading")}>
          Tạo bình luận mới
        </button>
      </div>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>avatar</th>
              <th>id bình luận</th>
              <th>Tên hiển thị</th>
              <th>Nội dung</th>
              <th>Số lượt thích</th>
              <th>chức năng</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.length > 0 &&
              users.map((user, index) => (
                <tr key={index}>
                  <td>
                    <img
                      src="https://coderthemes.com/hyper/saas/assets/images/users/avatar-1.jpg"
                      alt=""
                      className={cx("img-table")}
                    />
                  </td>
                  <td>{user.comment_id}</td>
                  <td>{user.username}</td>
                  <td>{user.title}</td>
                  <td>{user.like}</td>
                  <td>
                    <div className={cx("btn-block")}>
                      <span>chi tiết</span>
                      <span>Chỉnh sửa</span>
                      <span>Xóa</span>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="modal register"
      >
        <div className={cx("modal-heading")}>
          <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Tạo tài khoản</h2>
          <span onClick={closeModal} className={cx("btn-close-modal")}>
            &times;
          </span>
        </div>
        <form className={cx("form-modal")}>
          <div className={cx("form-control")}>
            <label htmlFor="" className={cx("form-label")}>
              Họ và tên
            </label>
            <input
              type="text"
              placeholder="Họ và tên"
              className={cx("form-input")}
            />
          </div>
          <div className={cx("form-control")}>
            <label htmlFor="" className={cx("form-label")}>
              Email
            </label>
            <input
              type="text"
              placeholder="Email"
              className={cx("form-input")}
            />
          </div>
          <div className={cx("form-control")}>
            <label htmlFor="" className={cx("form-label")}>
              Mật khẩu
            </label>
            <input
              type="password"
              placeholder="Mật khẩu"
              className={cx("form-input")}
            />
          </div>
          <div className={cx("form-control")}>
            <label htmlFor="" className={cx("form-label")}>
              Nhập lại mật khẩu
            </label>
            <input
              type="password"
              placeholder="Nhập lại mật khẩu"
              className={cx("form-input")}
            />
          </div>
          <div className={cx("btn-block")}>
            <button className={cx("btn-modal")}>Hủy</button>
            <button className={cx("btn-modal")}>Đăng kí</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ManagerCommentPage;
