import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import LayoutContent from "../../../layouts/UserLayouts/components/Content/LayoutContent";
import { setItem, setLoadingAdvanced } from "../../../redux/reducer";
import { Loading } from "../../../components/Loading/LoadingAdvanced";
import GetListMovie from "../../../services/GetListMovieService";
const TheatersMoviePage = () => {
  const dispatch = useDispatch();
  const page = useSelector((prev) => prev.root.pages);
  const loadingAdvanced = useSelector((prev) => prev.root.loadingAdvanced);

  useEffect(() => {
    const fetch = async () => {
      dispatch(setLoadingAdvanced(true));
      const res = await GetListMovie("phim-sap-chieu", page);
      dispatch(setItem(res));
      dispatch(setLoadingAdvanced(false));
    };
    fetch();
  }, [page, dispatch]);

  return (
    <>
      {!loadingAdvanced && <LayoutContent />}
      {loadingAdvanced && <Loading />}
    </>
  );
};

export default TheatersMoviePage;