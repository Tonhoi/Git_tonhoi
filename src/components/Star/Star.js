import React, { memo, useState } from "react";
import classNames from "classnames/bind";
import PropTypes from "prop-types";

import styles from "./Star.module.scss";
import images from "../../assets/images";
const STARS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const MESSAGES = {
  0: "",
  1: "Dở Tệ",
  2: "Dở",
  3: "Không hay",
  4: "Không Hay Lắm",
  5: "Bình thường",
  6: "Xem được",
  7: "Có vẻ hay",
  8: "hay",
  9: "Rất hay",
  10: "Hay tuyệt",
};

const cx = classNames.bind(styles);
const Star = ({ value = 0, messages = MESSAGES, onClickStar = () => {} }) => {
  const [selected, setSelected] = useState(value);
  const [starHovered, setStarHovered] = useState(0);

  const applyClasses = (star) => {
    if (selected >= star || starHovered >= star) {
      return images.starActive;
    }
    return images.starNoActive;
  };
  return (
    <div className={cx("star-block")}>
      {STARS.map((star, index) => {
        return (
          <img
            key={index}
            src={applyClasses(star)}
            alt=""
            onClick={() => {
              onClickStar(star);
              setSelected(star);
            }}
            onMouseOver={() => {
              setSelected(star);
              setStarHovered(star);
            }}
            onMouseOut={() => setStarHovered(0)}
          />
        );
      })}
      <p className={cx("star_message")}>{messages[selected]}</p>
    </div>
  );
};

Star.propTypes = {
  value: PropTypes.number,
  messages: PropTypes.string,
  onClickStar: PropTypes.func,
};

export default memo(Star);
