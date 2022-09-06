import { createSlice } from "@reduxjs/toolkit";

const rootReducer = createSlice({
  name: "root",
  initialState: {
    // initial of admin
    items: [],
    seachResult: [],
    sortField: [],
    detailNameMovie: [],
    // bình luận
    posts: [],

    // login, logout
    userinfo: [],
    // getTheme:
    saveSort: [],
    authenticatorUser: [],

    // search value
    searchValue: "",
    slugNameMovie: "",
    thumnail: "",
    userDisplayName: "",
    // custom display
    slugUrlCurrent: "",
    display: "column",

    // theme
    theme: JSON.parse(localStorage.getItem("theme")),

    pages: 1,

    loadingBasis: false,
    loadingAdvanced: false,
    // -------------------------------------

    // initial of admin

    toggleSideBarAdmin: false,
  },
  reducers: {
    setSeachResult: (state, actions) => ({
      ...state,
      seachResult: actions.payload,
    }),
    setLoadingBasis: (state, actions) => ({
      ...state,
      loadingBasis: actions.payload,
    }),
    setLoadingAdvanced: (state, actions) => ({
      ...state,
      loadingAdvanced: actions.payload,
    }),
    setItem: (state, actions) => ({
      ...state,
      items: actions.payload,
    }),
    setDetailNameMovie: (state, actions) => ({
      ...state,
      detailNameMovie: actions.payload,
    }),
    setPage: (state, actions) => ({
      ...state,
      pages: actions.payload,
    }),
    setSearchValue: (state, actions) => ({
      ...state,
      searchValue: actions.payload,
    }),
    setSlugNameMovie: (state, actions) => ({
      ...state,
      slugNameMovie: actions.payload,
    }),
    setSortField: (state, actions) => ({
      ...state,
      sortField: actions.payload,
    }),
    setThumnail: (state, actions) => ({
      ...state,
      thumnail: actions.payload,
    }),

    // handle login, logout
    setUserInfo: (state, actions) => ({
      ...state,
      userinfo: actions.payload,
    }),
    setUserDisplayName: (state, actions) => ({
      ...state,
      userDisplayName: actions.payload,
    }),

    setDisplay: (state, actions) => ({
      ...state,
      display: actions.payload,
    }),

    setTheme: (state, actions) => ({
      ...state,
      theme: actions.payload,
    }),
    setSlugUrlCurrent: (state, actions) => ({
      ...state,
      slugUrlCurrent: actions.payload,
    }),
    setSaveSort: (state, actions) => ({
      ...state,
      saveSort: actions.payload,
    }),
    setAuthenticatorUser: (state, actions) => ({
      ...state,
      authenticatorUser: actions.payload,
    }),

    setPosts: (state, actions) => ({
      ...state,
      posts: actions.payload,
    }),

    // --------------------------------------
    // handle reducer of admin

    setToggleSideBarAdmin: (state, actions) => ({
      ...state,
      toggleSideBarAdmin: actions.payload,
    }),
  },
});
export const {
  setSeachResult,
  setLoadingBasis,
  setLoadingAdvanced,
  setItem,
  setDetailNameMovie,
  setPage,
  setSearchValue,
  setSlugNameMovie,
  setSortField,
  setThumnail,
  setUserInfo,
  setUserDisplayName,
  setDisplay,
  setTheme,
  setSaveSort,
  setSlugUrlCurrent,
  setAuthenticatorUser,

  setPosts,

  // ------------------------------
  // action of admin
  setToggleSideBarAdmin,
} = rootReducer.actions;

export default rootReducer.reducer;
