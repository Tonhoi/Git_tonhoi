import PropTypes from "prop-types";
import React from "react";
import classNames from "classnames/bind";
import styles from "./MenuItem.module.scss";
import Button from "../../Button";

const cx = classNames.bind(styles);
const MenuItem = ({ data, onClick }) => {
  return (
    <div className={cx("menu-item")} onClick={onClick}>
      <Button className={cx("list-menu")}>{data.title}</Button>
    </div>
  );
};
MenuItem.propTypes = {
  data: PropTypes.object,
  onClick: PropTypes.func,
};

export default MenuItem;
