export const setSeachResult = (payload) => {
  return {
    type: "searchResult",
    payload,
  };
};
export const setLoadingBasis = (payload) => {
  return {
    type: "loadingBasis",
    payload,
  };
};
export const setLoadingAdvanced = (payload) => {
  return {
    type: "loadingAdvanced",
    payload,
  };
};
export const setItem = (payload) => {
  return {
    type: "items",
    payload,
  };
};
export const setPage = (payload) => {
  return {
    type: "pages",
    payload,
  };
};
export const setSearchValue = (payload) => {
  return {
    type: "searchValue",
    payload,
  };
};
export const setSlugNameMovie = (payload) => {
  return {
    type: "slugNameMovie",
    payload,
  };
};
export const setSortField = (payload) => {
  return {
    type: "sortField",
    payload,
  };
};
export const setDetailNameMovie = (payload) => {
  return {
    type: "detailNameMovie",
    payload,
  };
};
