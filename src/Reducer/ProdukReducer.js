const initialstate = {
  detailProduk: null,
  fetching: false,
};

const ProdukReducer = (state = initialstate, action) => {
  if (action.type === "CHANGE_FETCHING") {
    return {
      ...state,
      fetching: action.value,
    };
  }
  if (action.type === "GET_DETAIL_PRODUK") {
    return {
      ...state,
      detailProduk: action.value,
    };
  }
  return state;
};

export default ProdukReducer;
