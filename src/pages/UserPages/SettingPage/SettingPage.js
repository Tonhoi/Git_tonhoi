import React from "react";
import classNames from "classnames/bind";
import styles from "./SettingPage.module.scss";

const cx = classNames.bind(styles);
const SettingPage = () => {
  return (
    <div className={cx("wrapper")}>
      <div>
        <span>Cài đặt</span>
        <span>Thông tin cá nhân</span>
      </div>
      <form>
        <div>
          <span>Họ tên</span>
          <span>hội tôn thất</span>
          <span>
            Tên của bạn xuất hiện trên trang cá nhân và bên cạnh các bình luận
            của bạn.
          </span>
        </div>
        <div>
          <button>Chỉnh sửa</button>
        </div>
      </form>
    </div>
  );
};

export default SettingPage;
