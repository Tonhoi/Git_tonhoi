import React, { memo } from "react";
import classNames from "classnames/bind";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

import styles from "./List.module.scss";
import Button from "../../../../components/Button";

const cx = classNames.bind(styles);
const List = ({ onClick, to, title, iconLeft, iconRight, classNames }) => {
  const className = (nav) => cx("item", { active: nav.isActive });
  return to ? (
    <NavLink className={className} onClick={onClick} to={to}>
      {iconLeft && <div>{iconLeft}</div>}
      {title}
      {iconRight && <div>{iconRight}</div>}
    </NavLink>
  ) : (
    <Button
      onClick={onClick}
      className={cx("item", {
        [classNames]: classNames,
      })}
    >
      {iconLeft && <div>{iconLeft}</div>}
      {title}
      {iconRight && <div>{iconRight}</div>}
    </Button>
  );
};
List.propTypes = {
  onClick: PropTypes.func,
  to: PropTypes.string,
  title: PropTypes.string,
  iconLeft: PropTypes.object,
  iconRight: PropTypes.object,
};

export default memo(List);
