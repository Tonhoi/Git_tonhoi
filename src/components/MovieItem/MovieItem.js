import React, { memo } from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";

import styles from "./MovieItem.module.scss";

const cx = classNames.bind(styles);

const MovieItem = ({ item, onClick }) => {
  return (
    <Link to={`/phim/${item?.slug}`} className={cx("list")} onClick={onClick}>
      <div className={cx("item")}>
        <img
          src={`https://ophim.cc/_next/image?url=https%3A%2F%2Fimg.ophim.cc%2Fuploads%2Fmovies%2F${item?.thumb_url}&w=192&q=75`}
          alt=""
          className={cx("item-img")}
        />
        <div className={cx("item-content")}>
          <div className={cx("heading")}>
            <h4 className={cx("item-heading")}>{item?.name}</h4>
          </div>
          <span className={cx("item-title")}>
            {item?.country ? item?.country[0]?.name : ""}
          </span>
        </div>
      </div>
    </Link>
  );
};

MovieItem.propTypes = {
  item: PropTypes.object,
  onClick: PropTypes.func,
};

export default memo(MovieItem);
