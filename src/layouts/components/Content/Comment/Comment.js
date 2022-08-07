import React, { memo, useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  updateDoc,
  addDoc,
  deleteDoc,
  collection,
  doc,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";

import styles from "./Comment.module.scss";
import { routes } from "../../../../configs";
import { db } from "../../../../firebase/firebase-config";

const cx = classNames.bind(styles);
const Comment = () => {
  const theme = useSelector((prev) => prev.root.theme);
  const currentUser = useSelector((prev) => prev.root.userinfo);
  const database = collection(db, "comments");
  const [posts, setPosts] = useState([]);
  const [value, setValue] = useState("");
  const [isLike, setIsLike] = useState(false);
  const textRef = useRef();

  // console.log(isLike);
  useEffect(() => {
    onSnapshot(database, (snapshot) => {
      let comments = [];
      snapshot.docs.forEach((doc) => {
        comments.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setPosts(comments);
    });
  }, []);

  const handleChangeInput = (e) => {
    setValue(e.target.value);
  };

  const handleAddLike = async (e, post) => {
    const commentUpdate = doc(db, "comments", post.id);
    if (isLike && textRef.current === post.id) {
      await updateDoc(commentUpdate, {
        like: post.like - 1,
      });
      e.target.classList.remove(cx("active"));
      setIsLike(false);
    } else if (isLike && textRef.current !== post.id) {
      if (e.target.classList.contains(cx("active"))) {
        await updateDoc(commentUpdate, {
          like: post.like - 1,
        });
        e.target.classList.remove(cx("active"));
        setIsLike(false);
      } else {
        await updateDoc(commentUpdate, {
          like: post.like + 1,
        });
        e.target.classList.add(cx("active"));
        setIsLike(true);
      }
    } else if (!isLike && textRef.current === post.id) {
      await updateDoc(commentUpdate, {
        like: post.like + 1,
      });
      e.target.classList.add(cx("active"));
      setIsLike(true);
    } else if (!isLike && textRef.current !== post.id) {
      await updateDoc(commentUpdate, {
        like: post.like - 1,
      });
      e.target.classList.remove(cx("active"));
      setIsLike(false);
    }

    textRef.current = post.id;
  };

  // tạo comments
  const handleSubmit = (e) => {
    e.preventDefault();
    addDoc(database, {
      username: currentUser.displayName,
      title: value,
      like: 0,
      createAt: serverTimestamp(),
    }).then(setValue(""));
  };

  // xóa comments
  const handleDeleteComment = async (e) => {
    const commentDelete = doc(db, "comments", e);
    await deleteDoc(commentDelete);
  };

  return (
    <>
      {currentUser ? (
        <div
          className={cx("wrapper-block-comment", {
            light_theme: theme,
          })}
        >
          <div className={cx("header")}>
            <span>
              {posts.length && posts.length > 0
                ? posts.length
                : "Không có bình luận nào"}
              <span> bình luận</span>
            </span>
            <div>
              <span>sắp xếp theo</span>
              <select name="" id="">
                <option value="">Mới nhất</option>
                <option value="">Cũ nhất</option>
              </select>
            </div>
          </div>

          <form onSubmit={handleSubmit} className={cx("write-comment-block")}>
            <div className={cx("comment-box")}>
              <img
                src="https://scontent.fsgn2-3.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?stp=cp0_dst-png_p48x48&_nc_cat=1&ccb=1-7&_nc_sid=dbb9e7&_nc_ohc=1VCfoj_TtCEAX8EogrI&_nc_ht=scontent.fsgn2-3.fna&edm=AJqh0Q8EAAAA&oh=00_AT9FJhajqPM_kYHToWrINKNjV2FqeJbLq8jDo-gp81I8VQ&oe=630DB478"
                alt=""
              />

              <input
                type="text"
                placeholder="Viêt bình luận tại đây"
                value={value}
                onChange={handleChangeInput}
              />
            </div>
            <div className={cx("btn-block")}>
              <button>HỦY</button>
              <button
                className={cx(`${!!value ? "active" : ""}`)}
                disabled={value.length <= 0}
              >
                BÌNH LUẬN
              </button>
            </div>
          </form>

          <ul className={cx("list")}>
            {posts &&
              posts.length > 0 &&
              posts.map((post, index) => (
                <li className={cx("item")} key={index}>
                  <div className={cx("image-block")}>
                    <img
                      src="https://scontent.fsgn2-3.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?stp=cp0_dst-png_p48x48&_nc_cat=1&ccb=1-7&_nc_sid=dbb9e7&_nc_ohc=1VCfoj_TtCEAX8EogrI&_nc_ht=scontent.fsgn2-3.fna&edm=AJqh0Q8EAAAA&oh=00_AT9FJhajqPM_kYHToWrINKNjV2FqeJbLq8jDo-gp81I8VQ&oe=630DB478"
                      alt=""
                    />
                  </div>
                  <div className={cx("content-block")}>
                    <span>{post.username}</span>
                    <span>{post.title}</span>
                    <div className={cx("options-block")}>
                      <span onClick={(e) => handleAddLike(e, post)}>thích</span>
                      <span>phản hồi</span>
                      {post.username === currentUser.displayName ? (
                        <span onClick={(e) => handleDeleteComment(post.id)}>
                          Xóa
                        </span>
                      ) : (
                        ""
                      )}
                      {post.like && +post.like > 0 ? (
                        <span>
                          <img
                            src="data:image/png;base64,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"
                            alt=""
                            style={{ width: "14px", height: "14px" }}
                          />
                          <span>{post.like}</span>
                        </span>
                      ) : (
                        ""
                      )}
                      <span>12 giờ</span>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      ) : (
        <div
          className={cx("suggestions-login", {
            light_theme: theme,
          })}
        >
          <span>
            Vui lòng <Link to={routes.login}>Đăng nhập</Link> để có thể sử dụng
            được chức năng bình luận !!!
          </span>
        </div>
      )}
    </>
  );
};

export default memo(Comment);
