import React from "react";
import classNames from "classnames/bind";

import styles from "./DefaultLayout.module.scss";
import { Header } from "./Header";

const cx = classNames.bind(styles);
const DefaultLayout = ({ children }) => {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("wrapper-wide")}>
        <div className={cx("header")}>
          <Header />
        </div>
      </div>
      <div className={cx("content")}>{children}</div>
    </div>
  );
};

export default DefaultLayout;
