import axios from "axios";

const GetListMovie = async (slugUrlCurrent, sort) => {
  try {
    const res = await axios.post(
      // `https://ophim.cc/_next/data/2uibqhufwNeudgKQPPGsA/danh-sach/${slugUrlCurrent}.json?${sort}`,
      `/danh-sach/${slugUrlCurrent}.json?${sort}`,
      {
        baseURL:
          "https://project-movie-master.herokuapp.com/https://ophim.cc/_next/data/2uibqhufwNeudgKQPPGsA/",
      }
    );
    return res.data.pageProps;
  } catch (error) {
    console.log(error);
  }
};

export default GetListMovie;
