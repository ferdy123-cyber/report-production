const initialstate = {
  user: null,
  fetchingAuth: false,
  mBarang: null,
  mDefect: null,
  reportOk: null,
  reportNg: null,
  reportExcel: null,
  fetchingGet: false,
  fetchingDelete: false,
  fetchingAdd: false,
  fetchingExport: false,
  refreshdata: null,
};

const AuthReducer = (state = initialstate, action) => {
  if (action.type === "CHANGE_FETCHING_AUTH") {
    return {
      ...state,
      fetchingAuth: action.value,
    };
  }
  if (action.type === "REFRESH") {
    return {
      ...state,
      refreshdata: String(Date.now()),
    };
  }
  if (action.type === "CHANGE_FETCHING_GET") {
    return {
      ...state,
      fetchingGet: action.value,
    };
  }
  if (action.type === "CHANGE_FETCHING_ADD") {
    return {
      ...state,
      fetchingAdd: action.value,
    };
  }
  if (action.type === "CHANGE_M_BARANG") {
    return {
      ...state,
      mBarang: action.value,
    };
  }
  if (action.type === "CHANGE_M_DEFECT") {
    return {
      ...state,
      mDefect: action.value,
    };
  }
  if (action.type === "CHANGE_REPORT_OK") {
    return {
      ...state,
      reportOk: action.value,
    };
  }
  if (action.type === "CHANGE_REPORT_NG") {
    return {
      ...state,
      reportNg: action.value,
    };
  }
  if (action.type === "CHANGE_REPORT_EXCEL") {
    return {
      ...state,
      reportExcel: action.value,
    };
  }
  if (action.type === "CHANGE_FETCHING_EXPORT_EXCEL") {
    return {
      ...state,
      fetchingExport: action.value,
    };
  }
  return state;
};

export default AuthReducer;
