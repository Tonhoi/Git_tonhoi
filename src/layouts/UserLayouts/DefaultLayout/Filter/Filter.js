import React, { memo, useEffect, useRef } from "react";
import classNames from "classnames/bind";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { useLocation, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import styles from "./Filter.module.scss";
import {
  DisplayListIcon,
  DisplayTableIcon,
} from "../../../../components/Icons/Icons";
import {
  setDisplay,
  setSaveSort,
  setSlugUrlCurrent,
} from "../../../../redux/reducer";
import { useState } from "react";

const cx = classNames.bind(styles);
const Filter = () => {
  let navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const display = useSelector((prev) => prev.root.display);

  const text = [];

  const [sort, setSort] = useState({
    sapXep: "",
    danhMuc: "",
    theLoai: "",
    quocGia: "",
    nam: "",
  });
  const sapXep = useRef();
  const danhMuc = useRef();
  const theLoai = useRef();
  const quocGia = useRef();
  const nam = useRef();

  const handSortField = (e) => {
    setSort({
      ...sort,
      [e.target.name]: e.target.value,
    });
    if (danhMuc.current.value === "true") {
      danhMuc.current.value = "phim-bo";
    }

    text.push(`sort_field=${sapXep.current.value}`);
    text.push(`slug=${danhMuc.current.value}`);
    text.push(`category=${theLoai.current.value}`);
    text.push(`country=${quocGia.current.value}`);
    text.push(`year=${nam.current.value}`);
    const result = text.filter((text) => {
      if (!text.includes("true")) {
        return text;
      }
      return null;
    });

    navigate(`/browse/${result.join("&")}`);

    dispatch(setSaveSort(result.join("&")));

    localStorage.setItem("slugUrlCurrent", danhMuc.current.value);
    dispatch(setSlugUrlCurrent(danhMuc.current.value));
    console.log(danhMuc.current.value);
  };
  useEffect(() => {
    if (window.performance) {
      if (performance.navigation.type == 1) {
        const sliceRult = pathname.slice(8, pathname.length);
        // console.log(sliceRult);
        // console.log(sliceRult.indexOf("&"));
        // console.log(sliceRult.search("hai-huoc"));
        console.log(sliceRult.substring("minh toc quan"));
        // console.log(danhMuc.current.value);
      }
    }
  }, []);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("wrapper-content")}>
        <div>
          <span>Sắp xếp</span>
          <select name="sapXep" id="sort" onChange={handSortField} ref={sapXep}>
            <option value>~ Sắp xếp ~</option>
            <option value="_id">Phim Mới nhất</option>
            <option value="modified.time">Thời gian cập nhập</option>
            <option value="year">Năm Sản xuất</option>
          </select>
        </div>

        <div>
          <span>Danh mục</span>
          <select
            name="danhMuc"
            id="cars"
            onChange={handSortField}
            ref={danhMuc}
          >
            <option value>~ Danh mục ~</option>
            <option value="phim-bo">Phim Bộ</option>
            <option value="phim-le">Phim Lẻ</option>
            <option value="tv-show">TV Shows</option>
            <option value="hoat-hinh">Hoạt Hình</option>
            <option value="phim-vietsub">Phim Vietsub</option>
            <option value="phim-thuyet-minh">Phim Thuyết Minh</option>
            <option value="phim-long-tieng">Phim Lồng Tiếng</option>
            <option value="phim-bo-dang-chieu">Phim Bộ Đang Chiếu</option>
            <option value="phim-tron-bo">Phim Trọn Bộ</option>
            <option value="phim-sap-chieu">Phim Sắp Chiếu</option>
            <option value="subteam">Subteam</option>
          </select>
        </div>

        <div>
          <span>Thể loại</span>
          <select
            name="theLoai"
            id="cars"
            onChange={handSortField}
            ref={theLoai}
          >
            <option value>~ Thể loại ~</option>
            <option value="hanh-dong">Hành Động</option>
            <option value="tinh-cam">Tình Cảm</option>
            <option value="hai-huoc">Hài Hước</option>
            <option value="co-trang">Cổ Trang</option>
            <option value="tam-ly">Tâm Lý</option>
            <option value="hinh-su">Hình Sự</option>
            <option value="chien-tranh">Chiến Tranh</option>
            <option value="the-thao">Thể Thao</option>
            <option value="vo-thaut">Võ Thuật</option>
            <option value="vien-tuong">Viễn Tưởng</option>
            <option value="phieu-luu">Phiêu Lưu</option>
            <option value="khoa-hoc">Khoa Học</option>
            <option value="kinh-di">Kinh Dị</option>
            <option value="am-nhac">Âm Nhạc</option>
            <option value="than-thoai">Thần Thoại</option>
            <option value="tai-lieu">Tài Liệu</option>
            <option value="gia-dinh">Gia Đình</option>
            <option value="chinh-kich">Chính Kịch</option>
            <option value="bi-an">Bí Ẩn</option>
            <option value="hoc-duong">Học Đường</option>
            <option value="kinh-dien">Kinh Điển</option>
          </select>
        </div>

        <div>
          <span>Quốc gia</span>
          <select
            name="quocGia"
            id="cars"
            onChange={handSortField}
            ref={quocGia}
          >
            <option value>~ Quốc gia ~</option>
            <option value="trung-quoc">Trung Quốc</option>
            <option value="han-quoc">Hàn Quốc</option>
            <option value="nhat-ban">Nhật Bản</option>
            <option value="thai-lan">Thái Lan</option>
            <option value="au-my">Âu Mỹ</option>
            <option value="dai-loan">Đài Loan</option>
            <option value="hong-kong">Hồng Kông</option>
            <option value="an-do">Ấn Độ</option>
            <option value="anh">Anh</option>
            <option value="phap">Pháp</option>
            <option value="canada">Canada</option>
            <option value="duc">Đức</option>
            <option value="tay-ban-nha">Tây Ban Nha</option>
            <option value="tho-nhi-ki">Thổ Nhỉ Kì</option>
            <option value="ha-lan">hà Lan</option>
            <option value="indonesia">Indonesia</option>
            <option value="nga">Nga</option>
            <option value="mexico">Mexico</option>
            <option value="ba-lan">Ba Lan</option>
            <option value="uc">Úc</option>
            <option value="thuy-dien">Thụy Điển</option>
            <option value="malaysia">Malaysia</option>
            <option value="brazil">Brazil</option>
            <option value="philippines">Philippines</option>
            <option value="bo-dao-nha">Bồ Đào Nha</option>
            <option value="y">Ý</option>
            <option value="da-mach">Đa Mạch</option>
            <option value="uae">UAE</option>
            <option value="na-uy">Na Uy</option>
            <option value="thuy-si">Thụy Sĩ</option>
            <option value="chau-phi">Châu Phi</option>
            <option value="ukraina">Ukraina</option>
            <option value="a-rap-xe-ut">Ả Rập Xê Út</option>
            <option value="quoc-gia-khac">Quốc gia khác</option>
          </select>
        </div>

        <div>
          <span>Năm phát hành</span>
          <select name="nam" id="cars" onChange={handSortField} ref={nam}>
            <option value>~ Năm ~</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
            <option value="2019">2019</option>
            <option value="2018">2018</option>
            <option value="2017">2017</option>
            <option value="2016">2016</option>
            <option value="2015">2015</option>
            <option value="2014">2014</option>
            <option value="2013">2013</option>
            <option value="2012">2012</option>
            <option value="2011">2011</option>
            <option value="2010">2010</option>
          </select>
        </div>

        <div className={cx("options")}>
          <span className={cx("title")}>Hiển thị</span>
          <div className={cx("display-block")}>
            <Tippy content="Dàn layout theo hàng">
              <button
                onClick={(e) => dispatch(setDisplay("row"))}
                className={cx(`${display === "row" ? "active" : ""}`)}
                disabled={display === "row"}
              >
                <DisplayListIcon />
              </button>
            </Tippy>

            <Tippy content="Dàn layout theo cột">
              <button
                onClick={(e) => dispatch(setDisplay("column"))}
                className={cx(`${display === "column" ? "active" : ""}`)}
                disabled={display === "column"}
              >
                <DisplayTableIcon />
              </button>
            </Tippy>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Filter);
