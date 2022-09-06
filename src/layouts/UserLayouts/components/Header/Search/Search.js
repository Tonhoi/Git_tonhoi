import React, { memo, useEffect, useRef, useState } from "react";
import axios from "axios";
import HeadlessTippy from "@tippyjs/react/headless";
import { Scrollbars } from "react-custom-scrollbars";
import classNames from "classnames/bind";
import { useSpring, motion } from "framer-motion";
import "tippy.js/dist/tippy.css";

import styles from "./Search.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { CloseIcon, SearchIcon } from "../../../../../components/Icons";
import UseDebounce from "../../../../../hooks/UseDebounce";
import { MovieItem } from "../../../../../components/MovieItem";
import { Loading } from "../../../../../components/Loading/LoadingBasis";
import {
  setLoadingBasis,
  setSeachResult,
  setSearchValue,
} from "../../../../../redux/reducer";
import Button from "../../../../../components/Button";
import GetSearchMovie from "../../../../../services/GetSearchMovieService";

const cx = classNames.bind(styles);
const Search = () => {
  const classNameRef = useRef();
  // redux
  const dispatch = useDispatch();
  const state = useSelector((prev) => prev.root);
  const search = useSelector((prev) => prev.root.search);

  // state local
  const [checkBlur, setCheckBlur] = useState(true);
  const searchValue = useSelector((prev) => prev.root.searchValue);
  const { debounce: value } = UseDebounce(searchValue, 800);

  // handle animation tippy headless
  const springConfig = { damping: 15, stiffness: 300 };
  const initialScale = 0.5;
  const opacity = useSpring(0, springConfig);
  const scale = useSpring(initialScale, springConfig);

  function onMount() {
    scale.set(1);
    opacity.set(1);
  }

  function onHide({ unmount }) {
    const cleanup = scale.onChange((value) => {
      if (value <= initialScale) {
        cleanup();
        unmount();
      }
    });

    scale.set(initialScale);
    opacity.set(0);
  }

  // handls call api and logic other
  useEffect(() => {
    const fetch = async () => {
      try {
        if (!value.trim()) {
          dispatch(setSeachResult([]));
          return;
        }
        dispatch(setLoadingBasis(true));
        const res = await GetSearchMovie(value);
        dispatch(setSeachResult(res?.data?.items));
        dispatch(setLoadingBasis(false));
      } catch (error) {
        console.log("có lỗi xảy ra");
      }
    };
    fetch();
  }, [value, dispatch]);

  const handleClose = () => {
    dispatch(setSeachResult([]));
    dispatch(setSearchValue(""));
  };

  const handleClick = (e) => {
    dispatch(setSearchValue(""));
  };

  return (
    <>
      <div className={cx("search-on-pc")}>
        <HeadlessTippy
          placement="bottom-end"
          interactive
          visible={checkBlur && state?.seachResult?.length > 0}
          ref={classNameRef}
          render={(attrs) => (
            <div className={cx("search-result")} tabIndex="-1" {...attrs}>
              <>
                <h3 className={cx("heading")}>Danh sách tìm kiếm</h3>
                <Scrollbars style={{ height: "300px" }} autoHide>
                  {state?.seachResult.length > 0 &&
                    state?.seachResult.map((searchResult) => {
                      return (
                        <MovieItem
                          item={searchResult}
                          key={searchResult._id}
                          onClick={handleClick}
                        />
                      );
                    })}
                </Scrollbars>
                <HeadlessTippy
                  render={(attrs) => (
                    <motion.div
                      className={cx("box")}
                      style={{ scale, opacity }}
                      {...attrs}
                    >
                      Xem tất cả các kết quả của từ khóa " {searchValue} "
                    </motion.div>
                  )}
                  animation={true}
                  onMount={onMount}
                  onHide={onHide}
                >
                  <div className={cx("footer-wrapper")}>
                    <Button
                      to={`/tim-kiem/${searchValue}`}
                      className={cx("footer")}
                      onClick={(e) => dispatch(setSearchValue(""))}
                    >
                      Xem tất cả các kết quả của từ khóa " {searchValue} "
                    </Button>
                  </div>
                </HeadlessTippy>
              </>
            </div>
          )}
          onClickOutside={() => {
            setCheckBlur(false);
          }}
        >
          <div className={cx("wrapper-search")}>
            <input
              type="text"
              placeholder="Tìm kiếm phim"
              className={cx("search-input")}
              value={searchValue}
              onChange={(e) => dispatch(setSearchValue(e.target.value))}
              onFocus={(e) => setCheckBlur(true)}
            />
            <div className={cx("wrapper-icon-search")}>
              <SearchIcon className={cx("icon-search")} />
            </div>
            {state?.loadingBasis && <Loading />}
            {!state.loadingBasis && state?.seachResult.length > 0 && (
              <div className={cx("wrapper-icon-close")} onClick={handleClose}>
                <CloseIcon className={cx("icon-close")} />
              </div>
            )}
          </div>
        </HeadlessTippy>
      </div>
    </>
  );
};

export default memo(Search);
