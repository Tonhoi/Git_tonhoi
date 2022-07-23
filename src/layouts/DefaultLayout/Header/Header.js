import React, { useRef } from "react";
import classNames from "classnames/bind";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

import { ChevronDownIcon, SettingsIcon } from "../../../components/Icons/Icons";
import { Search } from "./Search";
import Menu from "../../../components/Popper/Menu";
import styles from "./Header.module.scss";
import List from "./List";

const CATEGORY = [
  {
    id: 1,
    title: "Hành Động",
  },
  {
    id: 2,
    title: "Tình Cảm",
  },
  {
    id: 3,
    title: "Hài Hước",
  },
  {
    id: 4,
    title: "Cổ Trang",
  },
  {
    id: 5,
    title: "Tâm Lý",
  },
  {
    id: 6,
    title: "Hình Sự",
  },
  {
    id: 7,
    title: "Chiến Tranh",
  },
  {
    id: 8,
    title: "Thể Thao",
  },
  {
    id: 9,
    title: "Võ Thuật",
  },
  {
    id: 10,
    title: "Viễn Tưởng",
  },
  {
    id: 11,
    title: "Phiêu Lưu",
  },
  {
    id: 12,
    title: "Khoa Học",
  },
  {
    id: 13,
    title: "Kinh Dị",
  },
  {
    id: 14,
    title: "Âm Nhạc",
  },
  {
    id: 15,
    title: "Thân Thoại",
  },
  {
    id: 16,
    title: "Tài Liệu",
  },
  {
    id: 17,
    title: "Gia Đình",
  },
  {
    id: 18,
    title: "Chính Kịch",
  },
  {
    id: 19,
    title: "Bí Ẩn",
  },
  {
    id: 20,
    title: "Học Đường",
  },
  {
    id: 21,
    title: "Kinh Điển",
  },
];
const COUNTRY = [
  {
    id: 1,
    title: "Trung Quốc",
  },
  {
    id: 2,
    title: "Hàn Quốc",
  },
  {
    id: 3,
    title: "Thái Lan",
  },
  {
    id: 4,
    title: "Âu Mỹ",
  },
  {
    id: 5,
    title: "Đài Loan",
  },
  {
    id: 6,
    title: "Hồng Kông",
  },
  {
    id: 7,
    title: "Ấn Độ",
  },
  {
    id: 8,
    title: "Anh",
  },
  {
    id: 9,
    title: "Pháp",
  },
  {
    id: 10,
    title: "Canada",
  },
  {
    id: 11,
    title: "Đức",
  },
  {
    id: 12,
    title: "Tây Ban Nha",
  },
  {
    id: 13,
    title: "Thổ Nhĩ Kỳ",
  },
  {
    id: 14,
    title: "Hà Lan",
  },
  {
    id: 15,
    title: "Indonesia",
  },
  {
    id: 16,
    title: "Nga",
  },
  {
    id: 17,
    title: "Mexico",
  },
  {
    id: 18,
    title: "Ba Lan",
  },
  {
    id: 19,
    title: "Úc",
  },
  {
    id: 20,
    title: "Thụy Điển",
  },
  {
    id: 21,
    title: "Malaysia",
  },
  {
    id: 22,
    title: "Brazil",
  },
  {
    id: 23,
    title: "Philippines",
  },
  {
    id: 24,
    title: "Bồ Đào Nha",
  },
  {
    id: 25,
    title: "Ý",
  },
  {
    id: 27,
    title: "Đan Mạch",
  },
  {
    id: 28,
    title: "UAE",
  },
  {
    id: 29,
    title: "Na Uy",
  },
  {
    id: 30,
    title: "Thụy Sĩ",
  },
  {
    id: 31,
    title: "Châu Phi",
  },
  {
    id: 32,
    title: "Nam Phi",
  },
  {
    id: 33,
    title: "Ukraina",
  },
  {
    id: 34,
    title: "Ả Rập Xê Út",
  },
  {
    id: 35,
    title: "Quốc Gia Khác",
  },
];

const cx = classNames.bind(styles);

const Header = () => {
  let lineRef = useRef();
  // lineRef.current.style.left =
  const handleChange = (e) => {
    const { left, width } = e.target.getBoundingClientRect();
    lineRef.current.style.width = width + "px";
    lineRef.current.style.left = left + "px";
  };

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
            {/* <List list={LISTS} onChange={handleChange} /> */}
            <List title="TRANG CHỦ" to="/" />
            <List title="SHOWS" to="/shows" />
            <Menu items={CATEGORY}>
              <List
                title="THỂ LOẠI"
                to="/the-loai"
                iconRight={<ChevronDownIcon />}
              />
            </Menu>
            <Menu items={COUNTRY}>
              <List
                title="QUỐC GIA"
                to="/quoc-gia"
                iconRight={<ChevronDownIcon />}
              />
            </Menu>
            <List title="PHIM BỘ" to="/phim-bo" />
            <List title="PHIM LẺ" to="/phim-le" />
            <List title="PHIM SẮP CHIẾU" to="/phim-sap-chieu" />
            <List title="HOẠT HÌNH" to="/phim-hoat-hinh" />
          </div>
          <div className={cx("line")} ref={lineRef}></div>
        </div>
      </div>
    </div>
  );
};

export default Header;
