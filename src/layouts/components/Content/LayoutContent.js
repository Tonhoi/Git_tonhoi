import React, { memo } from "react";
import classNames from "classnames/bind";
import { useSelector } from "react-redux";

import styles from "./Content.module.scss";
import Content from "./Content";
const cx = classNames.bind(styles);
const LayoutContent = () => {
  const data = useSelector((prev) => prev?.items?.data?.items);

  const RenderContent = () => {
    return (
      data?.length > 0 &&
      data.map((data) => <Content data={data} key={data._id} />)
    );
  };
  return (
    <div className={cx("wrapper")}>
      <RenderContent />
    </div>
  );
};

export default memo(LayoutContent);
