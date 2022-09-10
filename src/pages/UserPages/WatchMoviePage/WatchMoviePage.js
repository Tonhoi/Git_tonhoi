import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames/bind";
import axios from "axios";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styles from "./WatchMoviePage.module.scss";
import { routes } from "../../../configs";
import { SaveIcon } from "../../../components/Icons/Icons";
import { Comment } from "../../../layouts/UserLayouts/components/Content/Comment";
import { setDetailNameMovie } from "../../../redux/reducer";
import { db } from "../../../firebase/firebase-config";
import { getAdditionalUserInfo } from "firebase/auth";

const cx = classNames.bind(styles);

let alo = false;
const WatchMoviePage = () => {
  const dispatch = useDispatch();
  let { nameMovie } = useParams();

  const className = (nav) => cx("btn", { active: nav.isActive });

  const param = useParams();
  const data = useSelector((prev) => prev.root.detailNameMovie);
  const theme = useSelector((prev) => prev.root.theme);
  const currentUser = useSelector((prev) => prev.root.userinfo);
  const [listEpisode, setListEpisode] = useState([]);
  const [episode, setEpisode] = useState("");
  const [episodeOne, setepisodeOne] = useState("");

  // console.log(data);
  useEffect(() => {
    setListEpisode(data?.episodes && data?.episodes[0]?.server_data);
    setepisodeOne(
      data?.episodes && data?.episodes[0]?.server_data[0].link_embed
    );
  }, [param?.episode, data?.episodes]);

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(`https://ophim1.com/phim/${nameMovie}`);
      dispatch(setDetailNameMovie(res.data));
    };
    fetch();
  }, [nameMovie, dispatch]);

  const handleChangeEpisode = (e) => {
    setEpisode(e);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const database = collection(db, "saveMovie");

    const text = query(database, where("uid", "==", currentUser.uid));
    onSnapshot(text, async (snapshot) => {
      snapshot.docs.length <= 0
        ? (alo = false)
        : (alo = snapshot.docs.some((doc) => {
            return doc.data().name_movie === data.movie.name;
          }));
    });
    if (!alo) {
      await addDoc(database, {
        createAt: serverTimestamp(),
        uid: currentUser.uid,
        movie_id: data.movie?._id,
        name_movie: data.movie.name,
        origin_name: data.movie.origin_name,
        title: data.movie.content,
        slug_movie: data.movie.slug,
        quality: data.movie.lang,
        lang: data.movie.lang,
        time: data.movie.time,
        country: data.movie.country,
        category: data.movie.category,
        thumb_url: data.movie.thumb_url,
        episode_current: data.movie.episode_current,
      });
      toast("phim này đã được thêm vào danh sách yêu thích !!");
    } else {
      toast(
        "không thể thực hiện vì phim này đã có trong danh sách yêu thích của bạn !"
      );
    }
  };
  return (
    <>
      <ToastContainer />
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
          <form onSubmit={handleSubmit} className={cx("info-block-right")}>
            <span className={cx("icon-block")}>
              <SaveIcon classname={cx("save-icon")} />
            </span>
            <button>Lưu phim</button>
          </form>
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
    </>
  );
};

export default WatchMoviePage;
