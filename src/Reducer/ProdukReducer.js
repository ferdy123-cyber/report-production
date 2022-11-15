const initialstate = {
  detailProduk: null,
  listCart: null,
  fetching: false,
  fetching2: false,
};

const ProdukReducer = (state = initialstate, action) => {
  if (action.type === "CHANGE_FETCHING") {
    return {
      ...state,
      fetching: action.value,
    };
  }
  if (action.type === "CHANGE_FETCHING2") {
    return {
      ...state,
      fetching2: action.value,
    };
  }
  if (action.type === "GET_DETAIL_PRODUK") {
    return {
      ...state,
      detailProduk: action.value,
    };
  }
  if (action.type === "GET_LIST_CART") {
    return {
      ...state,
      listCart: action.value,
    };
  }
  return state;
};

export default ProdukReducer;
