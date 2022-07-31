import React from "react";
import classNames from "classnames/bind";

import styles from "./LayoutMovie.module.scss";
import { Header } from "../components/Header";
import { Breadcrumbs } from "../components/Breadcrumbs";

const cx = classNames.bind(styles);
const LayoutMovie = ({ children }) => {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("wrapper-wide")}>
        <div className={cx("header")}>
          <Header />
        </div>
      </div>
      <div className={cx("breadcrumbs")}>
        <Breadcrumbs />
      </div>

      <div className={cx("content")}>{children}</div>
    </div>
  );
};

export default LayoutMovie;
