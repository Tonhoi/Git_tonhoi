import Home from "../pages/Home";
import Shows from "../pages/Shows";
import SeriesMovie from "../pages/SeriesMovie";
import OddMovie from "../pages/OddMovie";
import TheatersMovie from "../pages/TheatersMovie";
import Cartoon from "../pages/Cartoon";
import Category from "../pages/Category";
import Country from "../pages/Country";

const priviteRoutes = {};

const publicRoute = [
  { path: "/", element: Home },
  { path: "/shows", element: Shows },
  { path: "/phim-bo", element: SeriesMovie },
  { path: "/phim-le", element: OddMovie },
  { path: "/phim-sap-chieu", element: TheatersMovie },
  { path: "/phim-hoat-hinh", element: Cartoon },
  { path: "/the-loai", element: Category },
  { path: "/quoc-gia", element: Country },
];

export { priviteRoutes, publicRoute };
