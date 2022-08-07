import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import classNames from "classnames/bind";

import styles from "./WatchMoviePage.module.scss";
import { routes } from "../../configs";
import { SaveIcon } from "../../components/Icons/Icons";
import { Comment } from "../../layouts/components/Content/Comment";

const cx = classNames.bind(styles);
const WatchMoviePage = () => {
  const className = (nav) => cx("btn", { active: nav.isActive });

  const param = useParams();
  const data = useSelector((prev) => prev.root.detailNameMovie);
  const theme = useSelector((prev) => prev.root.theme);
  console.log(data);

  const [listEpisode, setListEpisode] = useState([]);
  const [episode, setEpisode] = useState("");
  const [episodeOne, setepisodeOne] = useState("");

  useEffect(() => {
    setListEpisode(data?.episodes && data?.episodes[0]?.server_data);
    setepisodeOne(
      data?.episodes && data?.episodes[0]?.server_data[0].link_embed
    );
  }, [param?.episode, data?.episodes]);

  const handleChangeEpisode = (e) => {
    setEpisode(e);
  };
  return (
    <div className={cx("wrapper")}>
      <iframe
        width="100%"
        height="500px"
        src={episode || episodeOne}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <div
        className={cx("note-block", {
          light_theme: theme,
        })}
      >
        <span>
          Phim không có tiếng / mất tiếng nhân vật / âm thanh bị rè?{" "}
          <a href={routes.faq} target="_blank" rel="noreferrer">
            Xem hướng dẫn
          </a>
        </span>
      </div>
      <div className={cx("info-block")}>
        <div className={cx("info-block-left")}>
          <span
            className={cx("name-movie", {
              light_theme: theme,
            })}
          >
            {data?.movie?.name}
          </span>
          <span
            className={cx("sub-name-movie", {
              light_theme: theme,
            })}
          >
            {data?.movie?.origin_name} ( {data?.movie?.year} )
          </span>
        </div>
        <div className={cx("info-block-right")}>
          <span className={cx("icon-block")}>
            <SaveIcon classname={cx("save-icon")} />
          </span>
          <span>Lưu phim</span>
        </div>
      </div>
      <div className={cx("btn-block")}>
        {listEpisode &&
          listEpisode.length > 0 &&
          listEpisode.map((listEpisode, index) => {
            return (
              <NavLink
                key={index}
                to={`/watch/${data?.movie?.slug}/tap${listEpisode.slug}`}
                onClick={(e) => handleChangeEpisode(listEpisode.link_embed)}
                className={className}
              >
                Tập {index + 1}
              </NavLink>
            );
          })}
      </div>
      <div className={cx("comment")}>
        <Comment />
      </div>
    </div>
  );
};

export default WatchMoviePage;
