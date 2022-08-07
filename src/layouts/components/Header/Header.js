import React from "react";
import classNames from "classnames/bind";
import "tippy.js/dist/tippy.css";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  BookMarkIcon,
  ChevronDownIcon,
  MenuIcon,
  SearchIcon,
} from "../../../components/Icons";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { Search } from "./Search";
import Menu from "../../../components/Popper/Menu";
import styles from "./Header.module.scss";
import { List } from "./List";
import { CATEGORY, COUNTRY } from "../../../components/DropDown";
import { routes } from "../../../configs";
import { auth } from "../../../firebase/firebase-config";
import { setUserInfo } from "../../../redux/reducer";

const cx = classNames.bind(styles);

const Header = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((prev) => prev.root.userinfo);
  let param = useParams();

  onAuthStateChanged(auth, (currentUser) => {
    dispatch(setUserInfo(currentUser));
  });
  const handleLogout = (e) => {
    signOut(auth);
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("wrapper-top")}>
        <div className={cx("logo")}>
          <div className={cx("menu-icon-block")}>
            <MenuIcon />
          </div>
          <img src="https://xemphim.fun/static/skin/logo-full.png" alt="" />
        </div>
        <Search />
        <div className={cx("options")}>
          <div className={cx("favourite-movie")}>
            <BookMarkIcon className={cx("bookmark-icon")} />
            <span>Phim yêu thích</span>
          </div>
          <Link to={routes.login} className={cx("image-block")}>
            <img src="https://avatar.talk.zdn.vn/default" alt="" />
            <span>
              {currentUser?.displayName
                ? currentUser?.displayName
                : "Đăng nhập"}
            </span>
            {currentUser?.displayName && (
              <ul>
                <li onClick={handleLogout}>Đăng xuất</li>
              </ul>
            )}
          </Link>
          <div className={cx("search-block-on-tablet-mobile")}>
            <SearchIcon className={cx("search-icon")} />
            <span>Tìm kiếm</span>
          </div>
        </div>
      </div>

      {/* category */}

      <div className={cx("wrapper-category")}>
        <div className={cx("wrapper-list")}>
          <div className={cx("list")}>
            <List title="TRANG CHỦ" to={routes.home} />
            <List title="SHOWS" to={routes.shows} />
            <Menu items={CATEGORY}>
              <List
                title="THỂ LOẠI"
                iconRight={<ChevronDownIcon />}
                classNames={
                  typeof param.theloai !== "undefined" ? cx("active") : ""
                }
              />
            </Menu>
            <Menu items={COUNTRY}>
              <List
                title="QUỐC GIA"
                iconRight={<ChevronDownIcon />}
                classNames={
                  typeof param.quocgia !== "undefined" ? cx("active") : ""
                }
              />
            </Menu>
            <List title="PHIM BỘ" to={routes.phimBo} />
            <List title="PHIM LẺ" to={routes.phimLe} />
            <List title="PHIM SẮP CHIẾU" to={routes.phimSapChieu} />
            <List title="HOẠT HÌNH" to={routes.phimHoatHinh} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
