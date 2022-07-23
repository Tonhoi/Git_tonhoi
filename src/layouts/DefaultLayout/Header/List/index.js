import React from "react";
import classNames from "classnames/bind";
import styles from "./List.module.scss";
import Button from "../../../../components/Button";
import { NavLink } from "react-router-dom";

const cx = classNames.bind(styles);
const List = ({ onClick, to, title, iconLeft, iconRight }) => {
  const className = (nav) => cx("item", { active: nav.isActive });
  return to ? (
    <NavLink className={className} onClick={onClick} to={to}>
      {iconLeft && <div>{iconLeft}</div>}
      {title}
      {iconRight && <div>{iconRight}</div>}
    </NavLink>
  ) : (
    <Button className={className}>{title}</Button>
  );
};

export default List;
