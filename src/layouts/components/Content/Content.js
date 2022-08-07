import React, { memo, useEffect, useState } from "react";
import classNames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Parser from "html-react-parser";

import styles from "./Content.module.scss";
import { PlayIcon } from "../../../components/Icons/Icons";
import { Link, useParams } from "react-router-dom";
import { setThumnail } from "../../../redux/reducer";

const cx = classNames.bind(styles);
const Content = ({ data }) => {
  const dispatch = useDispatch();
  const display = useSelector((prev) => prev.root.display);
  const theme = useSelector((prev) => prev.root.theme);

  const [contentMovie, setContentMovie] = useState("");

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(`https://ophim1.com/phim/${data.slug}`);
      setContentMovie(res.data.movie.content);
    };
    fetch();
  }, [dispatch, data.slug]);
  const hanleGetThumnail = () => {
    dispatch(setThumnail(`${data?.thumb_url}`));
  };
  return (
    <>
      {display === "column" ? (
        <Link
          to={`/phim/${data.slug}`}
          className={cx("cart-column")}
          onClick={hanleGetThumnail}
        >
          <div className={cx("wrapper-img-column")}>
            <span
              className={cx("status-column")}
            >{`${data.lang} - ${data.quality}`}</span>
            <span className={cx("episode-column")}>{data.episode_current}</span>
            <img
              src={`https://ophim.cc/_next/image?url=https%3A%2F%2Fimg.ophim.cc%2Fuploads%2Fmovies%2F${data?.thumb_url}&w=192&q=75`}
              alt=""
              className={cx("img-column")}
            />
            <div className={cx("overlay-column")}>
              <div className={cx("icon-play-column")}>
                <PlayIcon />
              </div>
            </div>
          </div>
          <div className={cx("wrapper-content-column")}>
            <span>{data.name}</span>
            <span>{data.origin_name}</span>
          </div>
        </Link>
      ) : (
        <Link
          to={`/phim/${data.slug}`}
          className={cx("cart-row", {
            light_theme: theme,
          })}
          onClick={hanleGetThumnail}
        >
          <div className={cx("image-block-row")}>
            <img
              src={`https://ophim.cc/_next/image?url=https%3A%2F%2Fimg.ophim.cc%2Fuploads%2Fmovies%2F${data?.thumb_url}&w=192&q=75`}
              alt=""
            />
          </div>
          <div className={cx("container-row")}>
            <div className={cx("heading-row")}>
              <div className={cx("left-row")}>
                <span>
                  <span className={cx(`${theme ? "light_theme" : ""}`)}>
                    {data.name}
                  </span>
                  <span
                    className={cx("quality-lang", {
                      light_theme: theme,
                    })}
                  >{`${data.quality} - ${data.lang}`}</span>
                </span>
                <span>{data.origin_name}</span>
              </div>
              <div className={cx("right-row")}>
                <span className={cx(`${theme ? "light_theme" : ""}`)}>
                  {data.time ? data.time : "Đang cập nhập"}
                </span>
                <span>
                  {data.country &&
                    data.country.length > 0 &&
                    data.country.map((data, index) => (
                      <span
                        key={index}
                        className={cx(`${theme ? "light_theme" : ""}`)}
                      >
                        {" "}
                        {data.name},
                      </span>
                    ))}
                </span>
              </div>
            </div>
            <div
              className={cx("content", {
                light_theme: theme,
              })}
            >
              <span>{Parser(contentMovie)}</span>
            </div>
            <div className={cx("footer")}>
              <div className={cx("footer-block")}>
                <div className={cx("left")}>
                  {data.category &&
                    data.category.length > 0 &&
                    data.category.map((data, index) => (
                      <div key={index}>
                        <span>{data.name}</span>
                      </div>
                    ))}
                </div>
                <div className={cx("right")}>
                  <span>{data.episode_current}</span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      )}
    </>
  );
};

export default memo(Content);
