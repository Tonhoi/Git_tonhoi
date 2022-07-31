import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import LayoutContent from "../../layouts/components/Content/LayoutContent";
import { setItem, setLoadingAdvanced } from "../../redux/action";
import { Loading } from "../../components/Loading/LoadingAdvanced";
import GetListMovie from "../../services/GetListMovieService";

const Shows = () => {
  const dispatch = useDispatch();
  const page = useSelector((prev) => prev.pages);
  const loadingAdvanced = useSelector((prev) => prev.loadingAdvanced);

  useEffect(() => {
    const fetch = async () => {
      dispatch(setLoadingAdvanced(true));
      const res = await GetListMovie("tv-shows", page);
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

export default Shows;
