import PropTypes from "prop-types";
import React from "react";
import classNames from "classnames/bind";
import styles from "./MovieItem.module.scss";
// import { TicksIcon } from "../Icons";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

const MovieItem = ({ item }) => {
  return (
    <Link to={`@${item.slug}`} className={cx("list")}>
      <div className={cx("item")}>
        <img
          src={`https://ophim.tv/_next/image?url=https%3A%2F%2Fimg.ophim.tv%2Fuploads%2Fmovies%2F${item.thumb_url}&w=192&q=75`}
          alt=""
          className={cx("item-img")}
        />
        <div className={cx("item-content")}>
          <div className={cx("heading")}>
            <h4 className={cx("item-heading")}>{item.name}</h4>
            {/* <TicksIcon className={cx("tick-icon")} /> */}
          </div>
          <span className={cx("item-title")}>{item.country[0].name}</span>
        </div>
      </div>
    </Link>
  );
};

MovieItem.propTypes = {
  item: PropTypes.object,
};

export default MovieItem;
