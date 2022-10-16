import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import { Loading } from "../../../components/Loading/LoadingAdvanced";
import { setItem, setLoadingAdvanced } from "../../../redux/reducer";
import LayoutContent from "../../../layouts/UserLayouts/components/Content/LayoutContent";
import GetListMovie from "../../../services/GetListFilterMovieService";

const Browse = () => {
  const sort = useSelector((prev) => prev.root.saveSort);
  const slugUrlCurrent = useSelector((prev) => prev.root.slugUrlCurrent);

  const dispatch = useDispatch();
  const page = useSelector((prev) => prev.root.pages);
  const loadingAdvanced = useSelector((prev) => prev.root.loadingAdvanced);

  const { pathname } = useLocation();

  const slug = pathname.slice(8, pathname.length);
  useEffect(() => {
    const fetch = async () => {
      dispatch(setLoadingAdvanced(true));
      const res = await GetListMovie(slugUrlCurrent, slug);
      res?.data?.items?.length > 0 && slugUrlCurrent !== "tv-show" ? (
        dispatch(setItem(res))
      ) : (
        <>
          {dispatch(setItem(res))}
          {toast("Rất tiếc, không có phim bạn muốn tìm kiếm !!")}
        </>
      );

      dispatch(setLoadingAdvanced(false));
    };
    fetch();
  }, [page, dispatch, slug, slugUrlCurrent]);

  return (
    <>
      <ToastContainer />
      {!loadingAdvanced && <LayoutContent />}
      {loadingAdvanced && <Loading />}
    </>
  );
};

export default Browse;
