import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import GetListMovie from "../services/GetListMovieService";
import GetSearchMovie from "../services/GetSearchMovieService";

export const getAllListMovie = createAsyncThunk(
  "root/getAllListMovie",
  async (parameter) => {
    const [slug, page] = parameter;
    const listAllMovie = await GetListMovie(slug, page);
    return listAllMovie;
  }
);

export const getListSearchMovie = createAsyncThunk(
  "root/getListSearchMovie",
  async (nameMovie, page) => {
    console.log(nameMovie, page);
    const listSearchMovie = await GetSearchMovie(nameMovie, page);
    return listSearchMovie;
  }
);

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
    slugUrlCurrent: localStorage.getItem("slugUrlCurrent"),
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

  extraReducers: (builder) => {
    builder.addCase(getAllListMovie.pending, (state) => {
      state.loadingAdvanced = true;
    });

    builder.addCase(getAllListMovie.rejected, (state) => {
      state.loadingAdvanced = false;
    });

    builder.addCase(getAllListMovie.fulfilled, (state, action) => {
      state.loadingAdvanced = false;
      state.items = action.payload;
    });

    // search movie
    builder.addCase(getListSearchMovie.pending, (state) => {
      state.loadingAdvanced = true;
    });

    builder.addCase(getListSearchMovie.rejected, (state) => {
      state.loadingAdvanced = false;
    });

    builder.addCase(getListSearchMovie.fulfilled, (state, action) => {
      state.loadingAdvanced = false;
      state.seachResult = action.payload;
    });
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
