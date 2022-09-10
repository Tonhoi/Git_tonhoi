import React, { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import Modal from "react-modal";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import classNames from "classnames/bind";

import { auth, db } from "../../../firebase/firebase-config";
import styles from "./ManagerUserPage.module.scss";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

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
const ManagerUserPage = () => {
  const navigate = useNavigate();
  const database = collection(db, "users");
  const [users, setUsers] = useState([]);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const currentUser = useSelector((prev) => prev.root.userinfo);
  const [inputValue, setInputValue] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });
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
  const handleInputChange = (e) => {
    setInputValue({
      ...inputValue,
      [e.target.name]: e.target.value,
    });
  };

  const handleViewUserInfo = (e, id) => {
    navigate(id);
  };

  const handleUpdateUserInfo = (e, id) => {
    navigate(`/admin/UpdateUserPage/${id}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      console.log("thành công");
    } catch (error) {
      console.log("có lỗi xảy ra");
    }
  };

  const handleDeleteUser = (e, id) => {
    console.log(id);
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("heading")}>
        <h3>Quản lý người dùng</h3>
        <button onClick={openModal} className={cx("button-heading")}>
          Đăng ký tài khoản
        </button>
      </div>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>avatar</th>
              <th>id</th>
              <th>Tên hiển thị</th>
              <th>Email</th>
              <th>quyền</th>
              <th>chức năng</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.length > 0 &&
              users.map((user, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <img
                        src="https://coderthemes.com/hyper/saas/assets/images/users/avatar-1.jpg"
                        alt=""
                        className={cx("img-table")}
                      />
                    </td>
                    <td>{user.uid}</td>
                    <td>{user.displayName}</td>
                    <td>{user.email}</td>
                    <td>{user.role === 0 ? "users" : "admin"}</td>
                    <td>
                      <div className={cx("btn-block")}>
                        <span onClick={(e) => handleViewUserInfo(e, user.id)}>
                          chi tiết
                        </span>
                        <span onClick={(e) => handleUpdateUserInfo(e, user.id)}>
                          Chỉnh sửa
                        </span>
                        {currentUser.uid !== user.uid && (
                          <span onClick={(e) => handleDeleteUser(e, user.id)}>
                            Xóa
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
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
        <form className={cx("form-modal")} onSubmit={handleSubmit}>
          <div className={cx("form-control")}>
            <label htmlFor="" className={cx("form-label")}>
              Họ và tên
            </label>
            <input
              type="text"
              placeholder="Họ và tên"
              name="username"
              value={inputValue.username}
              className={cx("form-input")}
              onChange={handleInputChange}
            />
          </div>
          <div className={cx("form-control")}>
            <label htmlFor="" className={cx("form-label")}>
              Email
            </label>
            <input
              type="text"
              placeholder="Email"
              name="email"
              value={inputValue.email}
              className={cx("form-input")}
              onChange={handleInputChange}
            />
          </div>
          <div className={cx("form-control")}>
            <label htmlFor="" className={cx("form-label")}>
              Mật khẩu
            </label>
            <input
              type="password"
              placeholder="Mật khẩu"
              name="password"
              value={inputValue.password}
              className={cx("form-input")}
              onChange={handleInputChange}
            />
          </div>
          <div className={cx("form-control")}>
            <label htmlFor="" className={cx("form-label")}>
              Nhập lại mật khẩu
            </label>
            <input
              type="password"
              placeholder="Nhập lại mật khẩu"
              name="confirm_password"
              value={inputValue.confirm_password}
              className={cx("form-input")}
              onChange={handleInputChange}
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

export default ManagerUserPage;
