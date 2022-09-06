import React from "react";
import classNames from "classnames/bind";
import styles from "./DashBoardPage.module.scss";
import {
  ChatIcon,
  MovieIcon,
  TrailerMovieIcon,
  UserIcon,
} from "../../../components/Icons/Icons";
import { useSelector } from "react-redux";

const cx = classNames.bind(styles);
const DashBoardPage = () => {
  const posts = useSelector((prev) => prev.root.posts);
  const totalMovie = useSelector(
    (prev) => prev?.root?.items?.data?.params?.pagination
  );

  return (
    <div className={cx("wrapper")}>
      <div className={cx("heading")}>
        <div className={cx("user-block")}>
          <div className={cx("icon-block")}>
            <UserIcon className={cx("icon")} />
          </div>
          <div>
            <span>31</span>
            <span>Members</span>
          </div>
        </div>
        <div className={cx("chat-block")}>
          <div className={cx("icon-block")}>
            <ChatIcon className={cx("icon")} />
          </div>
          <div>
            <span>{posts.length}</span>
            <span>total comment</span>
          </div>
        </div>
        <div className={cx("movie-block")}>
          <div className={cx("icon-block")}>
            <MovieIcon className={cx("icon")} />
          </div>
          <div>
            <span>{totalMovie?.totalItems}</span>
            <span>total movie</span>
          </div>
        </div>
        <div className={cx("trailer-movie-block")}>
          <div className={cx("icon-block")}>
            <TrailerMovieIcon className={cx("icon")} />
          </div>
          <div>
            <span>20</span>
            <span>total trailer movie</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoardPage;
