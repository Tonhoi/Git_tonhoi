import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import LayoutContent from "../../../layouts/UserLayouts/components/Content/LayoutContent";
import { setItem, setLoadingAdvanced } from "../../../redux/reducer";
import { Loading } from "../../../components/Loading/LoadingAdvanced";
import GetListMovie from "../../../services/GetListMovieService";

const CountryPage = () => {
  const dispatch = useDispatch();
  const page = useSelector((prev) => prev.root.pages);
  const loadingAdvanced = useSelector((prev) => prev.root.loadingAdvanced);
  let { quocgia } = useParams();

  useEffect(() => {
    const fetch = async () => {
      dispatch(setLoadingAdvanced(true));
      const res = await GetListMovie(`${quocgia}`, page, "quoc-gia");
      dispatch(setItem(res));
      dispatch(setLoadingAdvanced(false));
    };
    fetch();
  }, [page, dispatch, quocgia]);

  return (
    <>
      {!loadingAdvanced && <LayoutContent />}
      {loadingAdvanced && <Loading />}
    </>
  );
};

export default CountryPage;
