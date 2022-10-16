import axios from "axios";

const GetListMovie = async (slugUrlCurrent, sort) => {
  try {
    const res = await axios.get(
      `https://ophim.cc/_next/data/xh7RZM-AoUeEjC-THHEA3/danh-sach/${slugUrlCurrent}.json?${sort}`
    );
    return res.data.pageProps;
  } catch (error) {
    console.log(error);
  }
};

export default GetListMovie;
