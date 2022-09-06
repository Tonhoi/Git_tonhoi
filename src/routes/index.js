import { routes } from "../configs";

import { LayoutMovie } from "../layouts/UserLayouts/LayoutMovie";
import { LayoutHeaderFooter } from "../layouts/UserLayouts/LayoutHeaderFooter";

import { HomePage } from "../pages/UserPages/HomePage";
import { ShowsPage } from "../pages/UserPages/ShowsPage";
import { SeriesMoviePage } from "../pages/UserPages/SeriesMoviePage";
import { OddMoviePage } from "../pages/UserPages/OddMoviePage";
import { TheatersMoviePage } from "../pages/UserPages/TheatersMoviePage";
import { CartoonPage } from "../pages/UserPages/CartoonPage";
import { CategoryPage } from "../pages/UserPages/CategoryPage";
import { CountryPage } from "../pages/UserPages/CountryPage";
import { Searchpage } from "../pages/UserPages/SearchPage";
import { DetailMoviePage } from "../pages/UserPages/DetailMoviePage";
import { WatchMoviePage } from "../pages/UserPages/WatchMoviePage";
import { FaqPage } from "../pages/UserPages/FaqPage";
import { Login } from "../pages/UserPages/Login";
import { RegisterPage } from "../pages/UserPages/RegisterPage";
import Browse from "../pages/UserPages/Browse/Browse";

// ----------------------
// import of admin
import { DefaultLayout } from "../layouts/AdminLayouts/DefaultLayout";
import { DashBoardPage } from "../pages/AdminPages/DashBoardPage";
import { ManagerCommentPage } from "../pages/AdminPages/ManagerCommentPage";
import ManagerUserPage from "../pages/AdminPages/ManagerUserPage/ManagerUserPage";
import { ErrorPage } from "../pages/UserPages/ErrorPage";
import { SaveMoviePage } from "../pages/UserPages/SaveMoviePage";
import { SettingPage } from "../pages/UserPages/SettingPage";
import { DetailUserInfoPage } from "../pages/AdminPages/ManagerUserPage/DetailUserInfoPage";
import { UpdateUserInfoPage } from "../pages/AdminPages/ManagerUserPage/UpdateUserInfoPage";
import { FogotPasswordPage } from "../pages/UserPages/FogotPasswordPage";

const priviteRoutes = [
  { path: routes.dashboard, element: DashBoardPage, layout: DefaultLayout },
  {
    path: routes.managerComment,
    element: ManagerCommentPage,
    layout: DefaultLayout,
  },
  { path: routes.managerUser, element: ManagerUserPage, layout: DefaultLayout },

  // CRUD
  {
    path: routes.detailUserInfo,
    element: DetailUserInfoPage,
    layout: DefaultLayout,
  },
  {
    path: routes.UpdateUserInfo,
    element: UpdateUserInfoPage,
    layout: DefaultLayout,
  },
];

const publicRoute = [
  { path: routes.home, element: HomePage },
  { path: routes.shows, element: ShowsPage },
  { path: routes.phimBo, element: SeriesMoviePage },
  { path: routes.phimLe, element: OddMoviePage },
  { path: routes.phimSapChieu, element: TheatersMoviePage },
  { path: routes.phimHoatHinh, element: CartoonPage },
  { path: routes.theLoai, element: CategoryPage },
  { path: routes.quocGia, element: CountryPage },
  { path: routes.setting, element: SettingPage },

  { path: routes.danhSachSearch, element: Searchpage },

  { path: routes.browse, element: Browse },

  { path: routes.faq, element: FaqPage, layout: LayoutHeaderFooter },

  { path: routes.error, element: ErrorPage, layout: LayoutHeaderFooter },

  {
    path: routes.saveMovie,
    element: SaveMoviePage,
    layout: LayoutHeaderFooter,
  },

  { path: routes.detailMovie, element: DetailMoviePage, layout: LayoutMovie },
  { path: routes.watchMovie, element: WatchMoviePage, layout: LayoutMovie },

  // login
  { path: routes.login, element: Login, layout: LayoutHeaderFooter },
  { path: routes.register, element: RegisterPage, layout: LayoutHeaderFooter },
  {
    path: routes.forgotPassword,
    element: FogotPasswordPage,
    layout: LayoutHeaderFooter,
  },
];

export { priviteRoutes, publicRoute };
