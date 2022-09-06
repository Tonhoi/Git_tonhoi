import React from "react";
import classNames from "classnames/bind";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

import styles from "./DefaultLayout.module.scss";
import { Header } from "../components/Header";
import Sidebar from "../components/Sidebar/Sidebar";

const cx = classNames.bind(styles);
const DefaultLayout = ({ children }) => {
  const toggleSideBarAdmin = useSelector(
    (prev) => prev.root.toggleSideBarAdmin
  );
  return (
    <div className={cx("wrapper")}>
      <div
        className={cx("container", {
          active: toggleSideBarAdmin,
        })}
      >
        <div className={cx("header")}>
          <Header />
        </div>
        <div className={cx("content")}>{children}</div>
      </div>
      <div className={cx("sidebar")}>
        <Sidebar />
      </div>
    </div>
  );
};
DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DefaultLayout;
