import axios from "axios";

const text = () => {
  let headers = new Headers();

  headers.append("Access-Control-Allow-Origin", "http://localhost:3000/");
  const instance = axios.create({
    baseURL: "https://ophim.cc/_next/data/2uibqhufwNeudgKQPPGsA/",
    headers: headers,
  });
  return instance;
};

const GetListMovie = async (slug, page, category = "danh-sach") => {
  try {
    const res = await axios.get(
      // `https://ophim.cc/_next/data/2uibqhufwNeudgKQPPGsA/${category}/${slug}.json`,
      `/${category}/${slug}.json`,
      {
        params: {
          page,
          slug,
        },

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
