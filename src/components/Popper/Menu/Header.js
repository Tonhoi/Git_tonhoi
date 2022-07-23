import PropTypes from "prop-types";
import React from "react";
import classNames from "classnames/bind";
import styles from "./MenuItem.module.scss";
// import { IconOnBack } from '../../Icons';

const cx = classNames.bind(styles);

const Header = ({ onBack, title }) => {
  return (
    <div className={cx("wrapper-header")}>
      {/* <button onClick={onBack}>
                <IconOnBack />
            </button> */}
      <p className={cx("title")}>{title}</p>
    </div>
  );
};

Header.propTypes = {
  onBack: PropTypes.func,
  title: PropTypes.string,
};

export default Header;
