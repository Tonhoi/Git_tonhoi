import React, { useEffect, useState } from "react";
import axios from "axios";
import classNames from "classnames/bind";
import HeadlessTippy from "@tippyjs/react/headless";

import styles from "./Search.module.scss";
import { SearchIcon } from "../../../../components/Icons/Icons";
import UseDebounce from "../../../../hooks/UseDebounce";
import MovieItem from "../../../../components/MovieItem";
import Wrapper from "../../../../components/Popper/Wrapper";

const cx = classNames.bind(styles);
const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  const [seachResult, setSearchResult] = useState([]);
  const [checkBlur, setCheckBlur] = useState(true);
  const { debounce: value } = UseDebounce(searchValue, 800);
  useEffect(() => {
    const fetch = async () => {
      if (!value.trim()) {
        return;
      }
      const res = await axios.get(
        `https://ophim.tv/_next/data/m5wySfMXDukfAvbiXTiQO/tim-kiem.json?keyword=${value}`
      );
      setSearchResult(res?.data?.pageProps?.data?.items);
      console.log(res?.data?.pageProps?.data?.items);
    };
    fetch();
  }, [value]);

  // console.log(seachResult)
  return (
    <div>
      <HeadlessTippy
        placement="bottom-end"
        interactive
        visible={checkBlur && seachResult.length > 0}
        render={(attrs) => (
          <div className={cx("search-result")} tabIndex="-1" {...attrs}>
            {/* <Wrapper> */}
            <h3 className={cx("Accounts")}>Danh sách tìm kiếm</h3>
            {seachResult.map((searchResult) => {
              return <MovieItem item={searchResult} key={searchResult._id} />;
            })}
            {/* </Wrapper> */}
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
            onChange={(e) => setSearchValue(e.target.value)}
            onFocus={(e) => setCheckBlur(true)}
          />
          <SearchIcon className={cx("icon-search")} />
        </div>
      </HeadlessTippy>
    </div>
  );
};

export default Search;
