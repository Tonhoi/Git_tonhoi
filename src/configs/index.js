export const routes = {
  home: "/",
  shows: "/shows",
  phimBo: "/phim-bo",
  phimLe: "/phim-le",
  phimSapChieu: "/phim-sap-chieu",
  phimHoatHinh: "/phim-hoat-hinh",
  setting: "/setting",
  // login
  login: "/login",
  register: "/register",
  forgotPassword: "/forgotPassword",

  searchOnTabletMobile: "/search",
  faq: "/faq",
  saveMovie: "/saveMovie",

  theLoai: "/the-loai/:theloai",
  quocGia: "/quoc-gia/:quocgia",
  danhSachSearch: "/tim-kiem/:nameMovie",
  detailMovie: "/phim/:nameMovie",
  watchMovie: "/watch/:nameMovie/:episode",
  // filter
  browse: "/browse/:filter",

  // error page
  error: "*",

  // ---------------------------

  // route of admin

  dashboard: "/admin/dashboard",
  managerComment: "/admin/ManagerComment",

  // manager user
  managerUser: "/admin/ManagerUserPage",

  // CRUD
  detailUserInfo: "/admin/ManagerUserPage/:uid",
  UpdateUserInfo: "/admin/UpdateUserPage/:uid",
};
