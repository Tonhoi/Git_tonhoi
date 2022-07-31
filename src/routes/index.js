import { Home } from "../pages/Home";
import { Shows } from "../pages/Shows";
import { SeriesMovie } from "../pages/SeriesMovie";
import { OddMovie } from "../pages/OddMovie";
import { TheatersMovie } from "../pages/TheatersMovie";
import { Cartoon } from "../pages/Cartoon";
import { Category } from "../pages/Category";
import { Country } from "../pages/Country";
import { routes } from "../configs";
import { Searchpage } from "../pages/SearchPage";
import DetailMovie from "../pages/DetailMovie/DetailMovie";
import LayoutMovie from "../layouts/LayoutMovie";

const priviteRoutes = {};

const publicRoute = [
  { path: routes.home, element: Home },
  { path: routes.shows, element: Shows },
  { path: routes.phimBo, element: SeriesMovie },
  { path: routes.phimLe, element: OddMovie },
  { path: routes.phimSapChieu, element: TheatersMovie },
  { path: routes.phimHoatHinh, element: Cartoon },
  { path: routes.theLoai, element: Category },
  { path: routes.quocGia, element: Country },
  { path: routes.danhSachSearch, element: Searchpage },
  { path: routes.detailMovie, element: DetailMovie, layout: LayoutMovie },
];

export { priviteRoutes, publicRoute };
