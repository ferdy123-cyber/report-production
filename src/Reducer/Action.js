import { message } from "antd";
import axios from "axios";
import _ from "lodash";

export const BASE_URL = "http://localhost:3000";

const err_handle = (err) => {
  console.log(err);
  if (err.response.data.message) {
    message.error(err.response.data.message);
  } else if (err.message) {
    message.error(err.message);
  } else {
    message.error("Terjadi masalah server");
  }
};

export const login = (data) => (dispatch) => {
  dispatch({ type: "CHANGE_FETCHING_AUTH", value: true });
  axios
    .post(`${BASE_URL}/auth/login`, data)
    .then((resp) => {
      localStorage.setItem("user_credent", JSON.stringify(resp.data.data));
      dispatch({ type: "CHANGE_FETCHING_AUTH", value: false });
      message.success(resp.data.message);
      window.location.reload(false);
    })
    .catch((err) => {
      err_handle(err);
      dispatch({ type: "CHANGE_FETCHING_AUTH", value: false });
    });
};

export const register = (data) => (dispatch) => {
  dispatch({ type: "CHANGE_FETCHING_AUTH", value: true });
  axios
    .post(`${BASE_URL}/auth/register`, data)
    .then((resp) => {
      dispatch({ type: "CHANGE_FETCHING_AUTH", value: false });
      message.success(resp.data.message);
    })
    .catch((err) => {
      err_handle(err);
      dispatch({ type: "CHANGE_FETCHING_AUTH", value: false });
    });
};

export const getMasterBarang = (data) => (dispatch) => {
  dispatch({ type: "CHANGE_FETCHING_GET", value: true });
  axios
    .get(`${BASE_URL}/mBarang/get`, { params: data })
    .then((resp) => {
      dispatch({ type: "CHANGE_M_BARANG", value: resp.data });
      dispatch({ type: "CHANGE_FETCHING_GET", value: false });
    })
    .catch((err) => {
      err_handle(err);
      dispatch({ type: "CHANGE_FETCHING_GET", value: false });
    });
};

export const deleteMasterBarang = (id) => (dispatch) => {
  dispatch({ type: "CHANGE_FETCHING_GET", value: true });
  axios
    .delete(`${BASE_URL}/mBarang/delete/${id}`)
    .then((resp) => {
      dispatch({ type: "REFRESH" });
      dispatch({ type: "CHANGE_FETCHING_GET", value: false });
      message.success(resp.data.message);
    })
    .catch((err) => {
      err_handle(err);
      dispatch({ type: "CHANGE_FETCHING_GET", value: false });
    });
};

export const createMasterBarang = (data) => (dispatch) => {
  dispatch({ type: "CHANGE_FETCHING_ADD", value: true });
  axios
    .post(`${BASE_URL}/mBarang/create`, data)
    .then((resp) => {
      dispatch({ type: "REFRESH" });
      dispatch({ type: "CHANGE_FETCHING_ADD", value: false });
      message.success(resp.data.message);
    })
    .catch((err) => {
      err_handle(err);
      dispatch({ type: "CHANGE_FETCHING_ADD", value: false });
    });
};

export const getMasterDefect = (data) => (dispatch) => {
  dispatch({ type: "CHANGE_FETCHING_GET", value: true });
  axios
    .get(`${BASE_URL}/mDefect/get`, { params: data })
    .then((resp) => {
      dispatch({ type: "CHANGE_M_DEFECT", value: resp.data });
      dispatch({ type: "CHANGE_FETCHING_GET", value: false });
    })
    .catch((err) => {
      err_handle(err);
      dispatch({ type: "CHANGE_FETCHING_GET", value: false });
    });
};

export const deleteMasterDefect = (id) => (dispatch) => {
  dispatch({ type: "CHANGE_FETCHING_GET", value: true });
  axios
    .delete(`${BASE_URL}/mDefect/delete/${id}`)
    .then((resp) => {
      dispatch({ type: "REFRESH" });
      dispatch({ type: "CHANGE_FETCHING_GET", value: false });
      message.success(resp.data.message);
    })
    .catch((err) => {
      err_handle(err);
      dispatch({ type: "CHANGE_FETCHING_GET", value: false });
    });
};

export const createMasterDefect = (data) => (dispatch) => {
  dispatch({ type: "CHANGE_FETCHING_ADD", value: true });
  axios
    .post(`${BASE_URL}/mDefect/create`, data)
    .then((resp) => {
      dispatch({ type: "REFRESH" });
      dispatch({ type: "CHANGE_FETCHING_ADD", value: false });
      message.success(resp.data.message);
    })
    .catch((err) => {
      err_handle(err);
      dispatch({ type: "CHANGE_FETCHING_ADD", value: false });
    });
};

// barang_ok
export const getProdOk = (data) => (dispatch) => {
  dispatch({ type: "CHANGE_FETCHING_GET", value: true });
  axios
    .get(`${BASE_URL}/reportOk/get`, { params: data })
    .then((resp) => {
      dispatch({ type: "CHANGE_REPORT_OK", value: resp.data });
      dispatch({ type: "CHANGE_FETCHING_GET", value: false });
    })
    .catch((err) => {
      err_handle(err);
      dispatch({ type: "CHANGE_FETCHING_GET", value: false });
    });
};

export const deleteProdOk = (id) => (dispatch) => {
  dispatch({ type: "CHANGE_FETCHING_GET", value: true });
  axios
    .delete(`${BASE_URL}/reportOk/delete/${id}`)
    .then((resp) => {
      dispatch({ type: "REFRESH" });
      dispatch({ type: "CHANGE_FETCHING_GET", value: false });
      message.success(resp.data.message);
    })
    .catch((err) => {
      err_handle(err);
      dispatch({ type: "CHANGE_FETCHING_GET", value: false });
    });
};

export const createProdOk = (data) => (dispatch) => {
  dispatch({ type: "CHANGE_FETCHING_ADD", value: true });
  axios
    .post(`${BASE_URL}/reportOk/create`, data)
    .then((resp) => {
      dispatch({ type: "REFRESH" });
      dispatch({ type: "CHANGE_FETCHING_ADD", value: false });
      message.success(resp.data.message);
    })
    .catch((err) => {
      err_handle(err);
      dispatch({ type: "CHANGE_FETCHING_ADD", value: false });
    });
};

// barang ng
export const getProdNg = (data) => (dispatch) => {
  dispatch({ type: "CHANGE_FETCHING_GET", value: true });
  axios
    .get(`${BASE_URL}/reportNg/get`, { params: data })
    .then((resp) => {
      dispatch({ type: "CHANGE_REPORT_NG", value: resp.data });
      dispatch({ type: "CHANGE_FETCHING_GET", value: false });
    })
    .catch((err) => {
      err_handle(err);
      dispatch({ type: "CHANGE_FETCHING_GET", value: false });
    });
};

export const deleteProdNg = (id) => (dispatch) => {
  dispatch({ type: "CHANGE_FETCHING_GET", value: true });
  axios
    .delete(`${BASE_URL}/reportNg/delete/${id}`)
    .then((resp) => {
      dispatch({ type: "REFRESH" });
      dispatch({ type: "CHANGE_FETCHING_GET", value: false });
      message.success(resp.data.message);
    })
    .catch((err) => {
      err_handle(err);
      dispatch({ type: "CHANGE_FETCHING_GET", value: false });
    });
};

export const createProdNg = (data) => (dispatch) => {
  dispatch({ type: "CHANGE_FETCHING_ADD", value: true });
  axios
    .post(`${BASE_URL}/reportNg/create`, data)
    .then((resp) => {
      dispatch({ type: "REFRESH" });
      dispatch({ type: "CHANGE_FETCHING_ADD", value: false });
      message.success(resp.data.message);
    })
    .catch((err) => {
      err_handle(err);
      dispatch({ type: "CHANGE_FETCHING_ADD", value: false });
    });
};

// report excel

export const getReportExcel = (data) => (dispatch) => {
  dispatch({ type: "CHANGE_FETCHING_GET", value: true });
  axios
    .get(`${BASE_URL}/reportExcel/get`, { params: data })
    .then((resp) => {
      dispatch({ type: "CHANGE_REPORT_EXCEL", value: resp.data });
      dispatch({ type: "CHANGE_FETCHING_GET", value: false });
    })
    .catch((err) => {
      err_handle(err);
      dispatch({ type: "CHANGE_FETCHING_GET", value: false });
    });
};

export const exportExcel = (data) => (dispatch) => {
  dispatch({ type: "CHANGE_FETCHING_EXPORT_EXCEL", value: true });
  axios
    .get(`${BASE_URL}/reportExcel/exportExcel`, { params: data })
    .then((resp) => {
      // dispatch({ type: "CHANGE_REPORT_EXCEL", value: resp.data });
      dispatch({ type: "CHANGE_FETCHING_EXPORT_EXCEL", value: false });
    })
    .catch((err) => {
      err_handle(err);
      dispatch({ type: "CHANGE_FETCHING_EXPORT_EXCEL", value: false });
    });
};
