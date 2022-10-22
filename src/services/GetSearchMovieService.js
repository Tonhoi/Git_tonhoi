import axios from "axios";

const GetSearchMovie = async (value, page) => {
  try {
    const res = await axios.post(
      // `https://ophim.cc/_next/data/2uibqhufwNeudgKQPPGsA/tim-kiem.json?keyword=${value}&${
      //   page && `page=${page}`
      // }`,
      `/tim-kiem.json?keyword=${value}&${page && `page=${page}`}`,
      {
        baseURL:
          "https://project-movie-master.herokuapp.com/https://ophim.cc/_next/data/2uibqhufwNeudgKQPPGsA/",
      }
    );
    return res?.data?.pageProps;
  } catch (error) {
    console.log(error);
  }
};

export default GetSearchMovie;
