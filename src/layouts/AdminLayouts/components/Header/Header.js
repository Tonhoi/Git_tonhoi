import React from "react";
import classNames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";

import styles from "./Header.module.scss";
import {
  BellIcon,
  MenuIcon,
  SearchIcon,
  SettingIcon,
} from "../../../../components/Icons";
import { setToggleSideBarAdmin } from "../../../../redux/reducer";

const cx = classNames.bind(styles);
const Header = () => {
  const dispatch = useDispatch();
  const toggleSideBarAdmin = useSelector(
    (prev) => prev.root.toggleSideBarAdmin
  );
  const currentUser = useSelector((prev) => prev.root.userinfo);

  return (
    <div className={cx("header")}>
      <div className={cx("left-block")}>
        <div
          className={cx("menu-icon-block")}
          onClick={(e) => dispatch(setToggleSideBarAdmin(!toggleSideBarAdmin))}
        >
          <MenuIcon />
        </div>

        <div className={cx("search-block")}>
          <div className={cx("search-icon-block")}>
            <SearchIcon className={cx("search-icon")} />
          </div>
          <input type="text" placeholder="Search" />
          <button className={cx("btn-search")}>Searchs</button>
        </div>
      </div>

      <div className={cx("right-block")}>
        <div className={cx("search-icon-block-on-tablet-mobile")}>
          <SearchIcon className={cx("search-icon-on-tablet-mobile")} />
        </div>
        <div className={cx("bell-icon-block")}>
          <BellIcon className={cx("bell-icon")} />
        </div>

        <div className={cx("setting-icon-block")}>
          <SettingIcon className={cx("setting-icon")} />
        </div>
        <div className={cx("avatar-block")}>
          <img
            src="https://coderthemes.com/hyper/saas/assets/images/users/avatar-1.jpg"
            alt=""
          />
          <span>{currentUser.displayName}</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
