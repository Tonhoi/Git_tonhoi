import axios from "axios";

const GetListMovie = async (slugUrlCurrent, sort) => {
  try {
    const res = await axios.get(
      `https://ophim.cc/_next/data/jMo1r8lC0F6IGwkz0ayh-/danh-sach/${slugUrlCurrent}.json?${sort}`
    );
    return res.data.pageProps;
  } catch (error) {
    console.log(error);
  }
};

export default GetListMovie;
