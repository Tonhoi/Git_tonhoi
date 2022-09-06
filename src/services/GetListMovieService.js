import axios from "axios";

const GetListMovie = async (slug, page, category = "danh-sach") => {
  try {
    const res = await axios.get(
      `https://ophim.cc/_next/data/jMo1r8lC0F6IGwkz0ayh-/${category}/${slug}.json?page=${page}&slug=${slug}`
    );
    return res.data.pageProps;
  } catch (error) {
    console.log(error);
  }
};

export default GetListMovie;
