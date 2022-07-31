import React from "react";
import classNames from "classnames/bind";
import styles from "./Loading.module.scss";

const cx = classNames.bind(styles);
const Loading = () => {
  return (
    <div className={cx("loading-container")}>
      <div className={cx("item")}></div>
      <div className={cx("item")}></div>
      <div className={cx("item")}></div>
      <div className={cx("item")}></div>
    </div>
  );
};

export default Loading;
