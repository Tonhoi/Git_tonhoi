import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { setItem, setLoadingAdvanced } from "../../../redux/reducer";
import LayoutContent from "../../../layouts/UserLayouts/components/Content/LayoutContent";
import { Loading } from "../../../components/Loading/LoadingAdvanced";
import GetSearchMovie from "../../../services/GetSearchMovieService";

const Searchpage = () => {
  const dispatch = useDispatch();
  const page = useSelector((prev) => prev.root.pages);
  const loadingAdvanced = useSelector((prev) => prev.root.loadingAdvanced);
  let { nameMovie } = useParams();
  useEffect(() => {
    const fetch = async () => {
      dispatch(setLoadingAdvanced(true));
      const res = await GetSearchMovie(nameMovie, page);
      dispatch(setItem(res));
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
