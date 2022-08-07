import React, { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { setItem, setLoadingAdvanced } from "../../redux/reducer";
import LayoutContent from "../../layouts/components/Content/LayoutContent";
import { Loading } from "../../components/Loading/LoadingAdvanced";

const Searchpage = () => {
  const dispatch = useDispatch();
  const page = useSelector((prev) => prev.root.pages);
  const loadingAdvanced = useSelector((prev) => prev.root.loadingAdvanced);

  let { nameMovie } = useParams();
  useEffect(() => {
    const fetch = async () => {
      dispatch(setLoadingAdvanced(true));
      const res = await axios.get(
        `https://ophim.cc/_next/data/PmHNrWJW8IjPBQzY5I9eJ/tim-kiem.json?keyword=${nameMovie}&page=${page}`
      );
      dispatch(setItem(res.data.pageProps));
      dispatch(setLoadingAdvanced(false));
    };
    fetch();
  }, [page, dispatch, nameMovie]);

  return (
    <>
      {!loadingAdvanced && <LayoutContent />}
      {loadingAdvanced && <Loading />}
    </>
  );
};

export default Searchpage;
