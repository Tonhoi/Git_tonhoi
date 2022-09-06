import React, { useState, useEffect } from "react";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { useSelector } from "react-redux";
import classNames from "classnames/bind";
import Parser from "html-react-parser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styles from "./SaveMoviePage.module.scss";
import { db } from "../../../firebase/firebase-config";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);
const SaveMoviePage = () => {
  const database = collection(db, "saveMovie");
  const [movies, setMovie] = useState([]);
  const currentUser = useSelector((prev) => prev.root.userinfo);
  const theme = useSelector((prev) => prev.root.theme);

  useEffect(() => {
    onSnapshot(database, (snapshot) => {
      let saveMovie = [];
      snapshot.docs.forEach((doc) => {
        saveMovie.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setMovie(saveMovie);
    });
  }, []);

  const handleDeleteMovie = async (e, id, name) => {
    e.preventDefault();
    console.log(id);
    const commentDelete = doc(db, "saveMovie", id);
    await deleteDoc(commentDelete);
    toast(`bạn đã xóa thành công phim ${name} khỏi mục yêu thích !!`);
  };
  return (
    <>
      <ToastContainer />
      <div className={cx("wrapper")}>
        {movies &&
          movies.length > 0 &&
          movies.map((movie) => {
            if (movie?.uid === currentUser?.uid) {
              return (
                <Link
                  to={`/phim/${movie.slug_movie}`}
                  className={cx("cart-row", {
                    light_theme: theme,
                  })}
                  key={movie.id}
                >
                  <div className={cx("image-block-row")}>
                    <img
                      src={`https://ophim.cc/_next/image?url=https%3A%2F%2Fimg.ophim.cc%2Fuploads%2Fmovies%2F${movie?.slug_movie}-thumb.jpg&w=192&q=75`}
                      alt=""
                    />
                  </div>
                  <div className={cx("container-row")}>
                    <div className={cx("heading-row")}>
                      <div className={cx("left-row")}>
                        <span>
                          <span className={cx(`${theme ? "light_theme" : ""}`)}>
                            {movie.name_movie}
                          </span>
                          <span
                            className={cx("quality-lang", {
                              light_theme: theme,
                            })}
                          >{`${movie.quality} - ${movie.lang}`}</span>
                        </span>
                        <span>{movie.origin_name}</span>
                      </div>
                      <div className={cx("right-row")}>
                        <span className={cx(`${theme ? "light_theme" : ""}`)}>
                          {movie.time ? movie.time : "Đang cập nhập"}
                        </span>
                        <span>
                          {movie.country &&
                            movie.country.length > 0 &&
                            movie.country.map((movie, index) => (
                              <span
                                key={index}
                                className={cx(`${theme ? "light_theme" : ""}`)}
                              >
                                {" "}
                                {movie.name},
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
                      <span>{Parser(movie.title)}</span>
                    </div>
                    <div className={cx("footer")}>
                      <div className={cx("footer-block")}>
                        <div className={cx("left")}>
                          {movie.category &&
                            movie.category.length > 0 &&
                            movie.category.map((movie, index) => (
                              <Link
                                to={`/the-loai/${movie.name
                                  .toLowerCase()
                                  .normalize("NFKD")
                                  .replace(/đ/g, "d")
                                  .replace(/([^ (A-Za-z0-9)])/g, "")
                                  .replace(/ /g, "-")}`}
                                key={index}
                                className={cx("div")}
                              >
                                <span>{movie.name}</span>
                              </Link>
                            ))}
                        </div>
                        <div className={cx("right")}>
                          <div>
                            <span>{movie.episode_current}</span>
                          </div>
                          <span
                            onClick={(e) =>
                              handleDeleteMovie(e, movie.id, movie.name_movie)
                            }
                          >
                            Xóa
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            }
          })}
      </div>
    </>
  );
};

export default SaveMoviePage;
