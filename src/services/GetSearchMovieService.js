import axios from "axios";

const GetSearchMovie = async (value, page) => {
  try {
    const res = await axios.get(
      `https://ophim.cc/_next/data/jMo1r8lC0F6IGwkz0ayh-/tim-kiem.json?keyword=${value}&${
        page && `page=${page}`
      }`
    );
    return res?.data?.pageProps;
  } catch (error) {
    console.log(error);
  }
};

export default GetSearchMovie;
