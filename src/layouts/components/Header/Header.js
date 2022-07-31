import React from "react";
import classNames from "classnames/bind";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { useParams } from "react-router-dom";

import { ChevronDownIcon, SettingsIcon } from "../../../components/Icons";
import { Search } from "./Search";
import Menu from "../../../components/Popper/Menu";
import styles from "./Header.module.scss";
import { List } from "./List";
import { CATEGORY, COUNTRY } from "../../../components/DropDown";
import { routes } from "../../../configs";
import { setCheckBlur } from "../../../redux/action";

const cx = classNames.bind(styles);

const Header = () => {
  let { theloai } = useParams();
  let { quocgia } = useParams();
  return (
    <div className={cx("wrapper")}>
      <div className={cx("wrapper-top")}>
        <div className={cx("logo")}>
          <img src="https://motchill.net/motchill.png?v1.0.2" alt="" />
        </div>
        <Search />
        <div className={cx("options")}>
          <Tippy content="Cài đặt">
            <div>
              <SettingsIcon className={cx("icon-setting")} />
            </div>
          </Tippy>
          <img src="https://avatar.talk.zdn.vn/default" alt="" />
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
                classNames={typeof theloai !== "undefined" ? cx("active") : ""}
              />
            </Menu>
            <Menu items={COUNTRY}>
              <List
                title="QUỐC GIA"
                iconRight={<ChevronDownIcon />}
                classNames={typeof quocgia !== "undefined" ? cx("active") : ""}
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