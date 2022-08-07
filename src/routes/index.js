import { routes } from "../configs";

import LayoutMovie from "../layouts/LayoutMovie";
import LayoutHeaderFooter from "../layouts/LayoutHeaderFooter";

import { HomePage } from "../pages/HomePage";
import { ShowsPage } from "../pages/ShowsPage";
import { SeriesMoviePage } from "../pages/SeriesMoviePage";
import { OddMoviePage } from "../pages/OddMoviePage";
import { TheatersMoviePage } from "../pages/TheatersMoviePage";
import { CartoonPage } from "../pages/CartoonPage";
import { CategoryPage } from "../pages/CategoryPage";
import { CountryPage } from "../pages/CountryPage";
import { Searchpage } from "../pages/SearchPage";
import { DetailMoviePage } from "../pages/DetailMoviePage";
import { WatchMoviePage } from "../pages/WatchMoviePage";
import { faqPage } from "../pages/faqPage";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";

const priviteRoutes = [];

const publicRoute = [
  { path: routes.home, element: HomePage },
  { path: routes.shows, element: ShowsPage },
  { path: routes.phimBo, element: SeriesMoviePage },
  { path: routes.phimLe, element: OddMoviePage },
  { path: routes.phimSapChieu, element: TheatersMoviePage },
  { path: routes.phimHoatHinh, element: CartoonPage },
  { path: routes.theLoai, element: CategoryPage },
  { path: routes.quocGia, element: CountryPage },
  { path: routes.danhSachSearch, element: Searchpage },

  { path: routes.faq, element: faqPage, layout: LayoutHeaderFooter },

  { path: routes.detailMovie, element: DetailMoviePage, layout: LayoutMovie },
  { path: routes.watchMovie, element: WatchMoviePage, layout: LayoutMovie },

  // login
  { path: routes.login, element: Login, layout: LayoutHeaderFooter },
  { path: routes.register, element: Register, layout: LayoutHeaderFooter },
];

export { priviteRoutes, publicRoute };
