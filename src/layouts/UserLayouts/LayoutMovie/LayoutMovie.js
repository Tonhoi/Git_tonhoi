import React from "react";
import classNames from "classnames/bind";
import PropTypes from "prop-types";

import styles from "./LayoutMovie.module.scss";
import { Header } from "../components/Header";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { Footer } from "../components/Footer";
import { Toggle } from "../../../components/Toggle";
import { useSelector } from "react-redux";

const cx = classNames.bind(styles);
const LayoutMovie = ({ children }) => {
  const theme = useSelector((prev) => prev.root.theme);
  return (
    <div
      className={cx("wrapper", {
        light_theme: theme,
      })}
    >
      <div
        className={cx("wrapper-wide", {
          light_theme: theme,
        })}
      >
        <div className={cx("header")}>
          <Header />
        </div>
      </div>
      <div className={cx("breadcrumbs")}>
        <Breadcrumbs />
      </div>
      <div className={cx("content")}>
        <div className={cx("children")}>{children}</div>
      </div>
      <div className={cx("toggle")}>
        <Toggle />
      </div>
      <div className={cx("footer")}>
        <Footer />
      </div>
    </div>
  );
};

LayoutMovie.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LayoutMovie;
