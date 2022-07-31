import React from "react";
import classnames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";

import styles from "./Pagination.module.scss";
import { setPage } from "../../../redux/action";

const cx = classnames.bind(styles);
let totalPage;
const Pagination = () => {
  const dispatch = useDispatch();

  const pagination = useSelector(
    (prev) => prev?.items?.data?.params?.pagination
  );
  totalPage = Math.ceil(pagination?.totalItems / 24);

  const handleHref = (e) => {
    dispatch(setPage(e.nextSelectedPage + 1));
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("total-item")}>
        <span>{`Trang ${pagination?.currentPage} / ${totalPage} | Tổng ${pagination?.totalItems} Kết quả`}</span>
      </div>
      <div className={cx("pagination")}>
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          pageRangeDisplayed={5}
          pageCount={totalPage}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          activeClassName={cx("active")}
          hrefBuilder={(e) => {
            return "/dasd";
          }}
          onClick={handleHref}
          hrefAllControls
        />
      </div>
    </div>
  );
};

export default Pagination;
