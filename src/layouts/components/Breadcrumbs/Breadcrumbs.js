import React from "react";
import classNames from "classnames/bind";
import { useSelector } from "react-redux";

import styles from "./Breadcrumbs.module.scss";
import { ArrowRight, HomeIcon } from "../../../components/Icons";

const cx = classNames.bind(styles);
const Breadcrumbs = () => {
  const theme = useSelector((prev) => prev.root.theme);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("icon-home")}>
        <HomeIcon />
      </div>

      <div
        className={cx("wrapper-content", {
          light_theme: theme,
        })}
      >
        <span className={cx("title")}>Trang Chủ</span>
        <div className={cx("icon-arrow-right")}>
          <ArrowRight />
        </div>
      </div>
    </div>
  );
};

export default Breadcrumbs;
