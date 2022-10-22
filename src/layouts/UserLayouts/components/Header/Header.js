import React, { memo, useEffect, useState } from "react";
import classNames from "classnames/bind";
import "tippy.js/dist/tippy.css";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TippyHeadless from "@tippyjs/react/headless";

import {
  ChevronDownIcon,
  MenuIcon,
  SearchIcon,
  LogOutIcon,
  SettingIcon,
  HomeIcon,
  BookMarkIconTabletMobile,
  BookMarkIconPc,
} from "../../../../components/Icons";
import { signOut } from "firebase/auth";
import { Search } from "./Search";
import Menu from "../../../../components/Popper/Menu";
import styles from "./Header.module.scss";
import { List } from "./List";
import { CATEGORY, COUNTRY } from "../../../../components/DropDown";
import { routes } from "../../../../configs";
import { auth } from "../../../../firebase/firebase-config";

const cx = classNames.bind(styles);

const Header = () => {
  const currentUser = useSelector((prev) => prev.root.userinfo);
  const authenticatorUser = useSelector((prev) => prev.root.authenticatorUser);
  let param = useParams();
  const [checkBlur, setCheckBlur] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const handleLogout = (e) => {
    signOut(auth);
  };

  const handleSearchOnTabletMobile = () => {
    setIsSearch(!isSearch);
  };

  useEffect(() => {
    const clear = setTimeout(() => {
      setCheckBlur(false);
    }, 500);
    return () => {
      clearTimeout(clear);
    };
  }, [checkBlur]);

  const handleOpenMenuOnTabletMobile = () => {
    setIsOpenMenu(!isOpenMenu);
  };

  return (
    <>
      <ToastContainer />

      {/* code in pc */}
      <div
        className={cx("wrapper", {
          active: isSearch,
        })}
      >
        <div className={cx("wrapper-top")}>
          <div className={cx("logo")}>
            <div
              className={cx("menu-icon-block")}
              onClick={handleOpenMenuOnTabletMobile}
            >
              <MenuIcon />
            </div>
            <img src="https://xemphim.fun/static/skin/logo-full.png" alt="" />
          </div>
          <Search isSearch={isSearch} />
          <div className={cx("options")}>
            {currentUser?.displayName && (
              <div className={cx("favourite-movie")}>
                <BookMarkIconPc className={cx("bookmark-icon")} />
                <Link to={routes.saveMovie} className={cx("title")}>
                  Phim yêu thích
                </Link>
              </div>
            )}

            <div>
              <TippyHeadless
                trigger="click"
                interactive
                placement="bottom-end"
                delay={[50, 100]}
                disabled={checkBlur}
                render={(attrs) =>
                  currentUser?.displayName && (
                    <div className={cx("list")} tabIndex="-1" {...attrs}>
                      {authenticatorUser.role === 1 && (
                        <Link to={routes.dashboard} className={cx("item")}>
                          <div>
                            <HomeIcon />
                          </div>
                          Trang admin
                        </Link>
                      )}
                      <Link to={routes.saveMovie} className={cx("item")}>
                        <BookMarkIconTabletMobile
                          className={cx("bookmark-icon")}
                        />
                        phim yêu thích
                      </Link>
                      <span
                        className={cx("item")}
                        onClick={(e) => setCheckBlur(true)}
                      >
                        <div>
                          <SettingIcon />
                        </div>
                        Cài đặt
                      </span>
                      <span onClick={handleLogout} className={cx("item")}>
                        <div>
                          <LogOutIcon />
                        </div>
                        Đăng xuất
                      </span>
                    </div>
                  )
                }
              >
                {!currentUser?.displayName ? (
                  <Link to={routes.login} className={cx("image-block")}>
                    <img src="https://avatar.talk.zdn.vn/default" alt="" />
                    <span>Đăng nhập</span>
                  </Link>
                ) : (
                  <span to={routes.login} className={cx("image-block")}>
                    <img src="https://avatar.talk.zdn.vn/default" alt="" />
                    <span>
                      {currentUser?.displayName
                        ? currentUser?.displayName
                        : "Đăng nhập"}
                    </span>
                  </span>
                )}
              </TippyHeadless>
            </div>

            <span
              className={cx("search-block-on-tablet-mobile")}
              onClick={handleSearchOnTabletMobile}
            >
              <SearchIcon className={cx("search-icon")} />
              <span>Tìm kiếm</span>
            </span>
          </div>
        </div>

        {/* category */}

        <div
          className={cx("wrapper-category", {
            active: isOpenMenu,
          })}
        >
          <div
            className={cx("wrapper-list", {
              active: isOpenMenu,
            })}
          >
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
    </>
  );
};

export default memo(Header);
