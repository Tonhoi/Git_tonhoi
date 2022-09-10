import React, { useEffect, useState, memo } from "react";
import axios from "axios";
import className from "classnames/bind";
import { Scrollbars } from "react-custom-scrollbars";
import Parser from "html-react-parser";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styles from "./DetailMovie.module.scss";
import { Star } from "../../../components/Star";
import images from "../../../assets/images";
import { setDetailNameMovie, setLoadingAdvanced } from "../../../redux/reducer";
import { Comment } from "../../../layouts/UserLayouts/components/Content/Comment";
import { Loading } from "../../../components/Loading/LoadingAdvanced";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../firebase/firebase-config";

const cx = className.bind(styles);
const DetailMoviePage = () => {
  let { nameMovie } = useParams();
  const database = collection(db, "userLikeComment");

  const dispatch = useDispatch();
  const data = useSelector((prev) => prev.root.detailNameMovie);
  const currentUser = useSelector((prev) => prev.root.userinfo);

  const loadingAdvanced = useSelector((prev) => prev.root.loadingAdvanced);

  const [content, setContent] = useState("");
  const onClickStar = async (star) => {
    await addDoc(database, {
      user_id: currentUser.uid,
      movie_id: data?.movie?._id,
      star_count: star,
      isLike: true,
    });
    // console.log("hello");
    // console.log(data?.movie?._id);
  };
  useEffect(() => {
    const fetch = async () => {
      dispatch(setLoadingAdvanced(true));
      const res = await axios.get(`https://ophim1.com/phim/${nameMovie}`);
      dispatch(setDetailNameMovie(res.data));
      setContent(res.data.movie.content);
      dispatch(setLoadingAdvanced(false));
    };
    fetch();
  }, [nameMovie, dispatch]);
  const handleShowNotification = () => {
    toast("Hiện chưa có link phim, bạn có thể xem trailer của phim !!");
  };
  return (
    <>
      {!loadingAdvanced ? (
        <div className={cx("wrapper")}>
          <ToastContainer />
          <div className={cx("wrapper-info")}>
            <div className={cx("header")}>
              <div className={cx("wrapper-image")}>
                <img
                  srcSet={`https://ophim.cc/_next/image?url=https%3A%2F%2Fimg.ophim.cc%2Fuploads%2Fmovies%2F${nameMovie}-thumb.jpg&w=16&q=75 16w,
                          https://ophim.cc/_next/image?url=https%3A%2F%2Fimg.ophim.cc%2Fuploads%2Fmovies%2F${nameMovie}-thumb.jpg&w=32&q=75 32w,
                          https://ophim.cc/_next/image?url=https%3A%2F%2Fimg.ophim.cc%2Fuploads%2Fmovies%2F${nameMovie}-thumb.jpg&w=48&q=75 48w,
                          https://ophim.cc/_next/image?url=https%3A%2F%2Fimg.ophim.cc%2Fuploads%2Fmovies%2F${nameMovie}-thumb.jpg&w=64&q=75 64w,
                          https://ophim.cc/_next/image?url=https%3A%2F%2Fimg.ophim.cc%2Fuploads%2Fmovies%2F${nameMovie}-thumb.jpg&w=96&q=75 96w,
                          https://ophim.cc/_next/image?url=https%3A%2F%2Fimg.ophim.cc%2Fuploads%2Fmovies%2F${nameMovie}-thumb.jpg&w=128&q=75 128w,
                          https://ophim.cc/_next/image?url=https%3A%2F%2Fimg.ophim.cc%2Fuploads%2Fmovies%2F${nameMovie}-thumb.jpg&w=136&q=75 136w,
                          https://ophim.cc/_next/image?url=https%3A%2F%2Fimg.ophim.cc%2Fuploads%2Fmovies%2F${nameMovie}-thumb.jpg&w=160&q=75 160w,
                          https://ophim.cc/_next/image?url=https%3A%2F%2Fimg.ophim.cc%2Fuploads%2Fmovies%2F${nameMovie}-thumb.jpg&w=169&q=75 169w,
                          https://ophim.cc/_next/image?url=https%3A%2F%2Fimg.ophim.cc%2Fuploads%2Fmovies%2F${nameMovie}-thumb.jpg&w=192&q=75 192w,
                          https://ophim.cc/_next/image?url=https%3A%2F%2Fimg.ophim.cc%2Fuploads%2Fmovies%2F${nameMovie}-thumb.jpg&w=256&q=75 256w,
                          https://ophim.cc/_next/image?url=https%3A%2F%2Fimg.ophim.cc%2Fuploads%2Fmovies%2F${nameMovie}-thumb.jpg&w=384&q=75 384w,
                          https://ophim.cc/_next/image?url=https%3A%2F%2Fimg.ophim.cc%2Fuploads%2Fmovies%2F${nameMovie}-thumb.jpg&w=684&q=75 684w
                        `}
                  sizes="(max-width: 480px) 335px, (max-width: 1000px) 252px, 252px"
                  src={`https://ophim.cc/_next/image?url=https%3A%2F%2Fimg.ophim.cc%2Fuploads%2Fmovies%2F${nameMovie}-thumb.jpg&w=684&q=75`}
                  alt=""
                />
                <div className={cx("btn-block")}>
                  <div className={cx("btn")}>Xem trailer</div>
                  {data?.episodes &&
                  data?.episodes[0]?.server_data &&
                  data?.episodes[0]?.server_data[0]?.link_embed ? (
                    <Link
                      className={cx("btn")}
                      to={`/watch/${data?.movie?.slug}/tap1`}
                    >
                      Xem phim
                    </Link>
                  ) : (
                    <button
                      className={cx("btn")}
                      onClick={handleShowNotification}
                    >
                      Xem phim
                    </button>
                  )}
                </div>
              </div>
              <div className={cx("wrapper-content")}>
                <div className={cx("heading")}>
                  <h2>{data?.movie?.name}</h2>
                  <span>{data?.movie?.origin_name}</span>
                </div>
                <div className={cx("content")}>
                  <table>
                    <tbody>
                      <tr>
                        <td>Số tập</td>
                        <td>
                          :{" "}
                          {data?.movie?.episode_total
                            ? data?.movie?.episode_total
                            : " Đang cập nhập"}
                        </td>
                      </tr>
                      <tr>
                        <td>Quốc gia</td>
                        <td>
                          :{" "}
                          {data?.movie?.country &&
                            data?.movie?.country[0]?.name}
                        </td>
                      </tr>
                      <tr>
                        <td>Năm sản xuất</td>
                        <td>: {data?.movie?.year}</td>
                      </tr>
                      <tr>
                        <td>Thời lượng</td>
                        <td>
                          :{" "}
                          {data?.movie?.time
                            ? data?.movie?.time
                            : " Đang cập nhập"}
                        </td>
                      </tr>
                      <tr>
                        <td>Độ phân giải</td>
                        <td>: {data?.movie?.quality}</td>
                      </tr>
                      <tr>
                        <td>Ngôn ngữ</td>
                        <td>: {data?.movie?.lang}</td>
                      </tr>
                      <tr>
                        <td>Thể loại</td>
                        <td>
                          :{" "}
                          {data?.movie?.category
                            ? data?.movie?.category?.map((category) => {
                                return category.name;
                              })
                            : " Đang cập nhập"}
                        </td>
                      </tr>
                      <tr>
                        <td>Thể Loại</td>
                        <td>: {data?.movie?.type}</td>
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
                <Scrollbars
                  autoHide
                  autoHideTimeout={1000}
                  autoHeight
                  universal
                >
                  <div className={cx("actor-block")}>
                    {data?.movie?.actor && data?.movie?.actor?.length > 1
                      ? data?.movie?.actor?.map((data, index) => (
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
                    {data?.movie?.name}, {data?.movie?.origin_name}
                  </h2>
                  <span>{Parser(content)}</span>
                </div>
              </div>
            </div>
          </div>
          <Comment />
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default memo(DetailMoviePage);
