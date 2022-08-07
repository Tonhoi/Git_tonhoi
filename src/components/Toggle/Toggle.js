import React, { useState } from "react";
import classNames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../../redux/reducer";

import styles from "./Toggle.module.scss";

const cx = classNames.bind(styles);
const Toggle = () => {
  const dispatch = useDispatch();
  const theme = useSelector((prev) => prev.root.theme);

  const handleChangeTheme = (e) => {
    localStorage.setItem("theme", !theme);
    // localStorage.removeItem("theme");
    // setChangeTheme(!changeTheme);
    dispatch(setTheme(!theme));
  };
  return (
    <label htmlFor="checkbox" className={cx("wrapper")}>
      <div
        className={cx("toggle", {
          active: theme,
        })}
        onClick={handleChangeTheme}
      >
        <div
          className={cx("circle", {
            active: theme,
          })}
        ></div>
      </div>
    </label>
  );
};

export default Toggle;
