import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { getListSearchMovie, setItem } from "../../../redux/reducer";
import LayoutContent from "../../../layouts/UserLayouts/components/Content/LayoutContent";
import { Loading } from "../../../components/Loading/LoadingAdvanced";

const Searchpage = () => {
  const dispatch = useDispatch();
  const page = useSelector((prev) => prev.root.pages);
  const loadingAdvanced = useSelector((prev) => prev.root.loadingAdvanced);
  let { nameMovie } = useParams();
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await dispatch(getListSearchMovie(nameMovie, page));
        dispatch(setItem(res.payload));
      } catch (error) {
        console.log("có lỗi xảy ra");
      }
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
