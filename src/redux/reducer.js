const initialState = {
  items: [],
  seachResult: [],
  sortField: [],
  detailNameMovie: [],

  loadingBasis: false,
  loadingAdvanced: false,

  searchValue: "",
  slugNameMovie: "",

  pages: 1,
};
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "searchResult":
      return {
        ...state,
        seachResult: action.payload,
      };
    case "loadingBasis":
      return {
        ...state,
        loadingBasis: action.payload,
      };
    case "loadingAdvanced":
      return {
        ...state,
        loadingAdvanced: action.payload,
      };
    case "items":
      return {
        ...state,
        items: action.payload,
      };
    case "detailNameMovie":
      return {
        ...state,
        detailNameMovie: action.payload,
      };
    case "pages":
      return {
        ...state,
        pages: action.payload,
      };
    case "searchValue":
      return {
        ...state,
        searchValue: action.payload,
      };
    case "slugNameMovie":
      return {
        ...state,
        slugNameMovie: action.payload,
      };
    case "sortField":
      const field = [...state.sortField];
      if (field.length >= 5) {
        field.splice(0, 5);
      }
      return {
        ...state,
        sortField: [...field, action.payload],
      };

    default:
      return state;
  }
};

export default rootReducer;
