import PropTypes from "prop-types";
import React from "react";
import classNames from "classnames/bind";
import { NavLink } from "react-router-dom";

import styles from "./MenuItem.module.scss";
import Button from "../../Button";

const cx = classNames.bind(styles);
const MenuItem = ({ data, onClick }) => {
  const className = (nav) => cx("menu-item", { active: nav.isActive });
  return (
    <NavLink className={className} onClick={onClick} to={data.to}>
      <Button className={cx("list-menu")}>{data.title}</Button>
    </NavLink>
  );
};
MenuItem.propTypes = {
  data: PropTypes.object,
  onClick: PropTypes.func,
};

export default MenuItem;
