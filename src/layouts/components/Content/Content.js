import React, { memo } from "react";
import classNames from "classnames/bind";

import styles from "./Content.module.scss";
import { PlayIcon } from "../../../components/Icons/Icons";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);
const Content = ({ data }) => {
  // console.log(data);
  return (
    <Link to={`/phim/${data.slug}`} className={cx("cart")}>
      <div className={cx("wrapper-img")}>
        <span className={cx("status")}>{`${data.lang} - ${data.quality}`}</span>
        <span className={cx("episode")}>{data.episode_current}</span>
        <img
          src={`https://ophim.cc/_next/image?url=https%3A%2F%2Fimg.ophim.cc%2Fuploads%2Fmovies%2F${data?.thumb_url}&w=192&q=75`}
          alt=""
          className={cx("img")}
        />
        <div className={cx("overlay")}>
          <div className={cx("icon-play")}>
            <PlayIcon />
          </div>
        </div>
      </div>
      <div className={cx("wrapper-content")}>
        <span>{data.name}</span>
        <span>{data.origin_name}</span>
      </div>
    </Link>
  );
};

export default memo(Content);
