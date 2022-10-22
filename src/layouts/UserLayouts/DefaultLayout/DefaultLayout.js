import React from "react";
import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import styles from "./DefaultLayout.module.scss";
import { Header } from "../components/Header";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { Filter } from "./Filter";
import { Pagination } from "./Pagination";
import { Footer } from "../components/Footer";
import { Toggle } from "../../../components/Toggle";
import { useEffect } from "react";
import { ArrowRight } from "../../../components/Icons";
import { useState } from "react";

const cx = classNames.bind(styles);
const DefaultLayout = ({ children }) => {
  const theme = useSelector((prev) => prev.root.theme);
  const [isEasyTop, setIsEasyTop] = useState(false);

  useEffect(() => {
    const reset = (document.onscroll = () => {
      console.log(typeof document.documentElement.scrollTop);
      document.documentElement.scrollTop >= 1500
        ? setIsEasyTop(true)
        : setIsEasyTop(false);
    });

    return () => {
      reset();
    };
  }, []);

  const handleOnScrollTop = () => {
    document.documentElement.scrollTop = 0;
  };
  return (
    <>
      <div
        className={cx("wrapper", {
          light_theme: theme,
        })}
      >
        <div
          className={cx("wrapper-wide", {
            light_theme: theme,
          })}
        >
          <div className={cx("header")}>
            <Header />
          </div>
        </div>
        <div className={cx("breadcrumbs")}>
          <Breadcrumbs />
        </div>

        <div className={cx("filter")}>
          <Filter />
        </div>
        <div className={cx("content")}>
          <div className={cx("pagination")}>
            <div>{children}</div>
            <Pagination />
          </div>
        </div>
        <div className={cx("toggle")}>
          <Toggle />
        </div>
        <div className={cx("footer")}>
          <Footer />
        </div>
        <div
          className={cx("easy-top", {
            active: isEasyTop,
          })}
          onClick={handleOnScrollTop}
        >
          <ArrowRight className={cx("icon-arrow")} />
        </div>
      </div>
    </>
  );
};
DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DefaultLayout;
