import React, { useEffect, useState } from "react";
import axios from "axios";
import className from "classnames/bind";
import { Scrollbars } from "react-custom-scrollbars";
import Parser from "html-react-parser";
import { useDispatch, useSelector } from "react-redux";

import { useParams } from "react-router-dom";
import styles from "./DetailMovie.module.scss";
import { Star } from "../../components/Star";
import images from "../../assets/images";
import { setDetailNameMovie } from "../../redux/action";

const cx = className.bind(styles);
const DetailMovie = () => {
  console.log("re-render");
  let { nameMovie } = useParams();
  const dispatch = useDispatch();
  const data = useSelector((prev) => prev.detailNameMovie);
  const [content, setContent] = useState("");
  const onClickStar = (star) => console.log(star);
  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(`https://ophim1.com/phim/${nameMovie}`);
      dispatch(setDetailNameMovie(res.data.movie));
      setContent(res.data.movie.content);
    };
    fetch();
  }, [nameMovie, dispatch]);
  return (
    <div className={cx("wrapper")}>
      <div className={cx("header")}>
        <div className={cx("wrapper-image")}>
          <img src={data && data.thumb_url} alt="" />
          <div className={cx("btn-block")}>
            <div className={cx("btn")}>Xem trailer</div>
            <div className={cx("btn")}>Xem phim</div>
          </div>
        </div>
        <div className={cx("wrapper-content")}>
          <div className={cx("heading")}>
            <h2>{data?.name}</h2>
            <span>{data?.origin_name}</span>
          </div>
          <div className={cx("content")}>
            <table>
              <tbody>
                <tr>
                  <td>Số tập</td>
                  <td>
                    :{" "}
                    {data?.episode_total
                      ? data?.episode_total
                      : " Đang cập nhập"}
                  </td>
                </tr>
                <tr>
                  <td>Quốc gia</td>
                  <td>: {data?.country && data?.country[0]?.name}</td>
                </tr>
                <tr>
                  <td>Năm sản xuất</td>
                  <td>: {data?.year}</td>
                </tr>
                <tr>
                  <td>Thời lượng</td>
                  <td>: {data?.time ? data?.time : " Đang cập nhập"}</td>
                </tr>
                <tr>
                  <td>Độ phân giải</td>
                  <td>: {data?.quality}</td>
                </tr>
                <tr>
                  <td>Ngôn ngữ</td>
                  <td>: {data?.lang}</td>
                </tr>
                <tr>
                  <td>Thể loại</td>
                  <td>
                    :{" "}
                    {data?.category
                      ? data?.category?.map((category) => {
                          return category.name;
                        })
                      : " Đang cập nhập"}
                  </td>
                </tr>
                <tr>
                  <td>Thể Loại</td>
                  <td>: {data?.type}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className={cx("footer")}>
            <h3>
              đánh giá phim <span>(1 lượt đánh giá )</span>
            </h3>
            <Star onClickStar={onClickStar} />
          </div>
        </div>
      </div>

      <div className={cx("container")}>
        <div className={cx("list-actor-block")}>
          <span className={cx("heading")}>DIỄN VIÊN</span>
          <Scrollbars autoHide autoHideTimeout={1000} autoHeight universal>
            <div className={cx("actor-block")}>
              {data?.actor && data?.actor?.length > 1
                ? data?.actor?.map((data, index) => (
                    <div className={cx("item-actor-block")} key={index}>
                      <div className={cx("image-block")}>
                        <img src={images.avatar} alt="" />
                      </div>
                      <span>{data}</span>
                    </div>
                  ))
                : "Đang cập nhập"}
            </div>
          </Scrollbars>
        </div>

        <div className={cx("content-movie")}>
          <span className={cx("heading")}>NỘI DUNG PHIM</span>
          <div className={cx("content-movie-block")}>
            <h2>
              {data?.name}, {data?.origin_name}
            </h2>
            <span>{Parser(content)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailMovie;
