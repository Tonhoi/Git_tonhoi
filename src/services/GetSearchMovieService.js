import axios from "axios";

const GetSearchMovie = async (value, page) => {
  try {
    const res = await axios.get(
      `https://ophim.cc/_next/data/xh7RZM-AoUeEjC-THHEA3/tim-kiem.json?keyword=${value}&${
        page && `page=${page}`
      }`
    );
    return res?.data?.pageProps;
  } catch (error) {
    console.log(error);
  }
};

export default GetSearchMovie;
