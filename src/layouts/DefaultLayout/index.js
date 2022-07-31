import React from "react";
import classNames from "classnames/bind";
import PropTypes from "prop-types";

import styles from "./DefaultLayout.module.scss";
import { Header } from "../components/Header";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { Filter } from "./Filter";
import { Pagination } from "../components/Pagination";

const cx = classNames.bind(styles);
const DefaultLayout = ({ children }) => {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("wrapper-wide")}>
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
      <div className={cx("content")}>{children}</div>
      <div className={cx("pagination")}>
        <Pagination />
      </div>
    </div>
  );
};
DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DefaultLayout;
