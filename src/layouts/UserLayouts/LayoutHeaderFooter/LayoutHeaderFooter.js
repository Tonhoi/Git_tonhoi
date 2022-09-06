import React from "react";
import classNames from "classnames/bind";
import PropTypes from "prop-types";

import styles from "./LayoutHeaderFooter.module.scss";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

const cx = classNames.bind(styles);
const LayoutHeaderFooter = ({ children }) => {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("wrapper-wide")}>
        <div className={cx("header")}>
          <Header />
        </div>
      </div>
      <div className={cx("children")}>{children}</div>
      <div className={cx("footer")}>
        <Footer />
      </div>
    </div>
  );
};

LayoutHeaderFooter.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LayoutHeaderFooter;
