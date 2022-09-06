import React from "react";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";

import styles from "./ErrorPage.module.scss";

const cx = classNames.bind(styles);
const ErrorPage = () => {
  return (
    <div className={cx("wrapper")}>
      <h1>Không tìm thấy nội dung 😓 </h1>
      <p className={cx("zoom-area")}>
        <b>URL</b> của nội dung này đã bị thay đổi hoặc không còn tồn tại. Nếu
        bạn đang lưu URL này, hãy thử truy cập lại từ trang chủ thay vì dùng URL
        đã lưu.
      </p>
      <section className={cx("error-container")}>
        <span>4</span>
        <span>
          <span>0</span>
        </span>
        <span>4</span>
      </section>
      <div className={cx("link-container")}>
        <Link to="/" className={cx("more-link")}>
          Quay lại trang chủ
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
