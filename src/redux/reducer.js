import { createSlice } from "@reduxjs/toolkit";

const rootReducer = createSlice({
  name: "root",
  initialState: {
    items: [],
    seachResult: [],
    sortField: [],
    detailNameMovie: [],

    loadingBasis: false,
    loadingAdvanced: false,

    searchValue: "",
    slugNameMovie: "",

    pages: 1,
    thumnail: "",

    // login, logout
    userinfo: [],
    userDisplayName: "",

    // custom display

    display: "column",

    // theme

    theme: JSON.parse(localStorage.getItem("theme")),
    // getTheme:
    saveSort: [],
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

    setSaveSort: (state, actions) => {
      return {
        ...state,
        saveSort: [...state.saveSort, actions.payload],
      };
    },
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
} = rootReducer.actions;

export default rootReducer.reducer;
