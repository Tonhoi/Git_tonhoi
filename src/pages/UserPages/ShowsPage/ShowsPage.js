import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import LayoutContent from "../../../layouts/UserLayouts/components/Content/LayoutContent";
import { getAllListMovie } from "../../../redux/reducer";
import { Loading } from "../../../components/Loading/LoadingAdvanced";

const ShowsPage = () => {
  const dispatch = useDispatch();
  const page = useSelector((prev) => prev.root.pages);
  const loadingAdvanced = useSelector((prev) => prev.root.loadingAdvanced);

  useEffect(() => {
    const fetch = async () => {
      try {
        await dispatch(getAllListMovie(["tv-shows", page]));
      } catch (error) {
        console.log("có lỗi xảy ra");
      }
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

export default ShowsPage;
