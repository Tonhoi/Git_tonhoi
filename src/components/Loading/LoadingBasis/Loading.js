import React from "react";
import className from "classnames/bind";
import styles from "./Loading.module.scss";

const cx = className.bind(styles);
const Loading = () => {
  return (
    <div className={cx("loader")}>
      <div className={cx("loader-wheel")}></div>
    </div>
  );
};

export default Loading;
