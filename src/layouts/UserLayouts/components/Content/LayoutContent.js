import React, { memo } from "react";
import classNames from "classnames/bind";
import { useSelector } from "react-redux";

import styles from "./Content.module.scss";
import Content from "./Content";
const cx = classNames.bind(styles);
const LayoutContent = () => {
  const data = useSelector((prev) => prev?.root?.items?.data?.items);

  const display = useSelector((prev) => prev?.root?.display);
  const RenderContent = () => {
    return (
      data?.length > 0 &&
      data.map((data) => <Content data={data} key={data._id} />)
    );
  };
  return (
    <>
      {display === "column" ? (
        <div className={cx("wrapper-column")}>
          <RenderContent />
        </div>
      ) : (
        <div className={cx("wrapper-row")}>
          <RenderContent />
        </div>
      )}
    </>
  );
};

export default memo(LayoutContent);
