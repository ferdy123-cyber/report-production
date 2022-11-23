const initialstate = {
  listAdmin: [],
  listProduk: null,
  listProdukPromo: null,
  listProdukRekomended: null,
  listPoster: null,
  history: [],
  fetching: false,
  fetching2: false,
};

const AdminReducer = (state = initialstate, action) => {
  if (action.type === "CHANGE_FETCHING_ADMIN_REDUCER") {
    return {
      ...state,
      fetching: action.value,
    };
  }
  if (action.type === "CHANGE_FETCHING2_ADMIN_REDUCER") {
    return {
      ...state,
      fetching2: action.value,
    };
  }
  if (action.type === "GET_LIST_ADMIN") {
    return {
      ...state,
      listAdmin: action.value,
    };
  }
  if (action.type === "GET_LIST_PRODUK") {
    return {
      ...state,
      listProduk: action.value,
    };
  }
  if (action.type === "GET_LIST_POSTER") {
    return {
      ...state,
      listPoster: action.value,
    };
  }
  if (action.type === "GET_LIST_PRODUK_PROMO") {
    return {
      ...state,
      listProdukPromo: action.value,
    };
  }
  if (action.type === "GET_LIST_PRODUK_REKOMENDED") {
    return {
      ...state,
      listProdukRekomended: action.value,
    };
  }
  if (action.type === "GET_HISTORY") {
    return {
      ...state,
      history: action.value,
    };
  }
  return state;
};

export default AdminReducer;
