import React from "react";
import classNames from "classnames/bind";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import styles from "./Breadcrumbs.module.scss";
import { ArrowRight, HomeIcon } from "../../../../components/Icons";

const cx = classNames.bind(styles);
const Breadcrumbs = () => {
  const theme = useSelector((prev) => prev.root.theme);
  const slugUrlCurrentt = useLocation();
  const page = useSelector((prev) => prev.root.pages);
  const data = useSelector((prev) => prev.root.detailNameMovie.movie);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("icon-home")}>
        <HomeIcon />
      </div>

      <Link
        to="/"
        className={cx("wrapper-content", {
          light_theme: theme,
        })}
      >
        <span className={cx("title")}>Trang Chủ</span>
        <div className={cx("icon-arrow-right")}>
          <ArrowRight />
        </div>
      </Link>

      {(slugUrlCurrentt?.pathname?.startsWith("/watch/") ||
        slugUrlCurrentt?.pathname?.startsWith("/phim/")) && (
        <>
          {data?.type === "single" ? (
            <Link
              to="/phim-le"
              className={cx("wrapper-content", {
                light_theme: theme,
              })}
            >
              <span>Phim Lẻ</span>
              <div className={cx("icon-arrow-right")}>
                <ArrowRight />
              </div>
            </Link>
          ) : data?.type === "tvshows" ? (
            <Link
              to="/shows"
              className={cx("wrapper-content", {
                light_theme: theme,
              })}
            >
              <span>Tv Shows</span>
              <div className={cx("icon-arrow-right")}>
                <ArrowRight />
              </div>
            </Link>
          ) : data?.type === "series" ? (
            <Link
              to="/phim-bo"
              className={cx("wrapper-content", {
                light_theme: theme,
              })}
            >
              <span>Phim bộ</span>
              <div className={cx("icon-arrow-right")}>
                <ArrowRight />
              </div>
            </Link>
          ) : (
            <Link
              to="/phim-hoat-hinh"
              className={cx("wrapper-content", {
                light_theme: theme,
              })}
            >
              <span>Phim hoạt hình</span>
              <div className={cx("icon-arrow-right")}>
                <ArrowRight />
              </div>
            </Link>
          )}
          {data?.country &&
            data?.country.length > 0 &&
            data?.country.map((data, index) => {
              return (
                <Link
                  key={index}
                  to={`/quoc-gia/${data.name
                    .toLowerCase()
                    .normalize("NFD")
                    .replace(/đ/g, "d")
                    .replace(/[^a-zA-Z0-9 ]/g, "")
                    .replace(/ /g, "-")}`}
                  className={cx("wrapper-content", {
                    light_theme: theme,
                  })}
                >
                  <span>{data?.name}</span>
                  <div className={cx("icon-arrow-right")}>
                    <ArrowRight />
                  </div>
                </Link>
              );
            })}

          {data?.category &&
            data?.category.length > 0 &&
            data?.category.map((data, index) => {
              return (
                <Link
                  key={index}
                  to={`/the-loai/${data.name
                    .toLowerCase()
                    .normalize("NFD")
                    .replace(/đ/g, "d")
                    .replace(/[^a-zA-Z0-9 ]/g, "")
                    .replace(/ /g, "-")}`}
                  className={cx("wrapper-content", {
                    light_theme: theme,
                  })}
                >
                  <span>{data?.name}</span>
                  <div className={cx("icon-arrow-right")}>
                    <ArrowRight />
                  </div>
                </Link>
              );
            })}

          <div
            className={cx("wrapper-content", {
              light_theme: theme,
            })}
            style={{ color: "var(--white-color)" }}
          >
            <span className={cx("title")}>{data?.name}</span>
          </div>
        </>
      )}

      {/* phân trang */}
      {!slugUrlCurrentt?.pathname?.startsWith("/phim/") &&
        !slugUrlCurrentt?.pathname?.startsWith("/watch/") &&
        !slugUrlCurrentt?.pathname?.startsWith("/browse/") && (
          <>
            <div
              className={cx("wrapper-content", {
                light_theme: theme,
              })}
            >
              <span>
                {slugUrlCurrentt.pathname
                  .slice(1)
                  .replace(/[/]/g, " > ")
                  .replaceAll(/-/g, " ")}
              </span>
              {slugUrlCurrentt.pathname !== "/" && (
                <div className={cx("icon-arrow-right")}>
                  <ArrowRight />
                </div>
              )}
            </div>
            <div
              className={cx("wrapper-content", {
                light_theme: theme,
              })}
            >
              <span className={cx("title")}>{`Trang ${page}`}</span>
            </div>
          </>
        )}

      {slugUrlCurrentt?.pathname?.startsWith("/browse/") && (
        <div style={{ color: "white" }}>đang cập nhập</div>
      )}
    </div>
  );
};

export default Breadcrumbs;
