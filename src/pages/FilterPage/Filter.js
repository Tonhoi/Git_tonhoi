import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LayoutContent from "../../layouts/components/Content/LayoutContent";
import { setItem, setLoadingAdvanced } from "../../redux/action";
import { Loading } from "../../components/Loading/LoadingAdvanced";
import axios from "axios";

const Filter = () => {
  const dispatch = useDispatch();
  const page = useSelector((prev) => prev.pages);
  const loadingAdvanced = useSelector((prev) => prev.loadingAdvanced);
  let { quocgia } = useParams();
  useEffect(() => {
    const fetch = async () => {
      dispatch(setLoadingAdvanced(true));
      const res = await axios.get(
        `https://ophim.cc/_next/data/PmHNrWJW8IjPBQzY5I9eJ/danh-sach/phim-bo.json?slug=phim-bo&sort_field=_id&category=tinh-cam&country=han-quoc&year=2022`
      );
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

export default Filter;
