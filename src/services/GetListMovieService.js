import axios from "axios";

const GetListMovie = async (slug, page, category = "danh-sach") => {
  try {
    const res = await axios.get(
      `https://ophim.cc/_next/data/xh7RZM-AoUeEjC-THHEA3/${category}/${slug}.json`,
      {
        params: {
          page,
          slug,
        },
      }
    );

    return res.data.pageProps;
  } catch (error) {
    console.log(error);
  }
};

export default GetListMovie;
