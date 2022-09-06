import React from "react";
import classNames from "classnames/bind";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import styles from "./MenuItem.module.scss";

const cx = classNames.bind(styles);
const MenuItem = ({ icon, title, to, classNameIcon, ...props }) => {
  const toggleSideBarAdmin = useSelector(
    (prev) => prev.root.toggleSideBarAdmin
  );
  const className = (nav) =>
    cx("item", { active: nav.isActive, toggleActive: toggleSideBarAdmin });
  return (
    <div className={cx("wrapper")}>
      <NavLink className={className} to={to} {...props}>
        {icon}
        <span>{title}</span>
      </NavLink>
    </div>
  );
};

export default MenuItem;
