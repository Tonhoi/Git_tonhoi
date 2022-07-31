import PropTypes from "prop-types";
import React from "react";
import classNames from "classnames/bind";
import styles from "./MenuItem.module.scss";

const cx = classNames.bind(styles);

const Header = ({ title }) => {
  return (
    <div className={cx("wrapper-header")}>
      <p className={cx("title")}>{title}</p>
    </div>
  );
};

Header.propTypes = {
  title: PropTypes.string,
};

export default Header;
