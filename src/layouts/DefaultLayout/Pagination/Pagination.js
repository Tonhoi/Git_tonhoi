import React, { useEffect } from "react";
import classnames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import { useLocation } from "react-router-dom";

import styles from "./Pagination.module.scss";
import { setPage } from "../../../redux/reducer";

const cx = classnames.bind(styles);
let totalPage;
const Pagination = () => {
  const dispatch = useDispatch();
  let param = useLocation();

  const page = useSelector((prev) => prev.root.pages);
  const theme = useSelector((prev) => prev.root.theme);

  useEffect(() => {
    dispatch(setPage(1));
  }, [param]);

  const pagination = useSelector(
    (prev) => prev?.root?.items?.data?.params?.pagination
  );
  console.log(pagination);
  totalPage = Math.ceil(pagination?.totalItems / 24);

  const handleHref = (e) => {
    dispatch(setPage(e.nextSelectedPage + 1));
    document.documentElement.scrollTop = 0;
  };
  return (
    <div className={cx("wrapper")}>
      <div
        className={cx("total-item", {
          leght_theme: theme,
        })}
      >
        <span>{`Trang ${pagination?.currentPage} / ${totalPage} | Tổng ${pagination?.totalItems} Kết quả`}</span>
      </div>
      <div className={cx("pagination")}>
        <ReactPaginate
          breakLabel={null}
          nextLabel=">"
          pageRangeDisplayed={5}
          pageCount={totalPage}
          previousLabel="<"
          renderOnZeroPageCount={null}
          activeClassName={cx("active")}
          hrefBuilder={(e) => {
            return "/dasd";
          }}
          onClick={handleHref}
          hrefAllControls
          marginPagesDisplayed={0}
          forcePage={page - 1}
        />
      </div>
    </div>
  );
};

export default Pagination;
