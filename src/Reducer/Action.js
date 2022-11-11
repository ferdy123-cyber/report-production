import { message } from "antd";
import axios from "axios";

export const BASE_URL = "http://localhost/jamtangankuid-server";

const err_handle = (err) => {
  // console.log(err);
  if (err.response.data.message) {
    message.error(err.response.data.message);
  } else if (err.message) {
    message.error(err.message);
  } else {
    message.error("Terjadi masalah server");
  }
};

export const getListAdmin = (data) => (dispatch) => {
  dispatch({ type: "CHANGE_FETCHING_ADMIN_REDUCER", value: true });
  axios
    .get(`${BASE_URL}/api/user?role_id=1`)
    .then((resp) => {
      dispatch({ type: "GET_LIST_ADMIN", value: resp.data.data });
      dispatch({ type: "CHANGE_FETCHING_ADMIN_REDUCER", value: false });
    })
    .catch((err) => {
      err_handle(err);
      dispatch({ type: "CHANGE_FETCHING_ADMIN_REDUCER", value: false });
    });
};

export const deleteListAdmin = (data) => (dispatch) => {
  dispatch({ type: "CHANGE_FETCHING_ADMIN_REDUCER", value: true });
  axios
    .delete(`${BASE_URL}/api/user/${data}`)
    .then((resp) => {
      dispatch(getListAdmin());
      dispatch({ type: "CHANGE_FETCHING_ADMIN_REDUCER", value: false });
      message.success("Berhasil hapus admin");
    })
    .catch((err) => {
      err_handle(err);
      dispatch({ type: "CHANGE_FETCHING_ADMIN_REDUCER", value: false });
    });
};

export const addListAdmin = (data) => (dispatch) => {
  dispatch({ type: "CHANGE_FETCHING_ADMIN_REDUCER", value: true });
  axios
    .post(`${BASE_URL}/api/registrasi/`, data)
    .then((resp) => {
      dispatch(getListAdmin());
      dispatch({ type: "CHANGE_FETCHING_ADMIN_REDUCER", value: false });
      message.success("Berhasil tambah admin");
    })
    .catch((err) => {
      err_handle(err);
      dispatch({ type: "CHANGE_FETCHING_ADMIN_REDUCER", value: false });
    });
};

export const editListAdmin = (data) => (dispatch) => {
  dispatch({ type: "CHANGE_FETCHING_ADMIN_REDUCER", value: true });
  axios
    .put(`${BASE_URL}/api/user/${data.id}`, data)
    .then((resp) => {
      dispatch(getListAdmin());
      dispatch({ type: "CHANGE_FETCHING_ADMIN_REDUCER", value: false });
      message.success("Berhasil edit admin");
    })
    .catch((err) => {
      err_handle(err);
      dispatch({ type: "CHANGE_FETCHING_ADMIN_REDUCER", value: false });
    });
};

export const login = (data) => (dispatch) => {
  console.log(data);
  dispatch({ type: "CHANGE_FETCHING_ADMIN_REDUCER", value: true });
  axios
    .post(`${BASE_URL}/api/login`, data)
    .then((resp) => {
      localStorage.setItem("user_credent", JSON.stringify(resp.data.data));
      dispatch({ type: "CHANGE_FETCHING_ADMIN_REDUCER", value: false });
      message.success(resp.data.message);
      window.location.reload(false);
    })
    .catch((err) => {
      err_handle(err);
      dispatch({ type: "CHANGE_FETCHING_ADMIN_REDUCER", value: false });
    });
};

export const getListProduk = (data) => (dispatch) => {
  dispatch({ type: "CHANGE_FETCHING_ADMIN_REDUCER", value: true });
  axios
    .get(`${BASE_URL}/api/produk`, data)
    .then((resp) => {
      dispatch({ type: "GET_LIST_PRODUK", value: resp.data.data });
      dispatch({ type: "CHANGE_FETCHING_ADMIN_REDUCER", value: false });
    })
    .catch((err) => {
      err_handle(err);
      dispatch({ type: "CHANGE_FETCHING_ADMIN_REDUCER", value: false });
    });
};

export const addListProduk = (data) => (dispatch) => {
  const formdata = new FormData();
  formdata.append("name", data.name);
  formdata.append("price", data.price);
  formdata.append("description", data.description);
  formdata.append("image", data.image.file);
  dispatch({ type: "CHANGE_FETCHING_ADMIN_REDUCER", value: true });
  axios
    .post(`${BASE_URL}/api/produk`, formdata, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((resp) => {
      dispatch(getListProduk());
      dispatch({ type: "CHANGE_FETCHING_ADMIN_REDUCER", value: false });
      message.success("Berhasil tambah produk");
    })
    .catch((err) => {
      err_handle(err);
      dispatch({ type: "CHANGE_FETCHING_ADMIN_REDUCER", value: false });
    });
};

export const deleteListProduk = (data) => (dispatch) => {
  console.log(data);
  dispatch({ type: "CHANGE_FETCHING_ADMIN_REDUCER", value: true });
  axios
    .delete(`${BASE_URL}/api/produk/${data}`)
    .then((resp) => {
      dispatch(getListProduk());
      dispatch({ type: "CHANGE_FETCHING_ADMIN_REDUCER", value: false });
      message.success("Berhasil hapus produk");
    })
    .catch((err) => {
      err_handle(err);
      dispatch({ type: "CHANGE_FETCHING_ADMIN_REDUCER", value: false });
    });
};

export const editListProduk = (data) => (dispatch) => {
  console.log(data);
  dispatch({ type: "CHANGE_FETCHING_ADMIN_REDUCER", value: true });
  axios
    .put(`${BASE_URL}/api/produk/${data.id}`, data)
    .then((resp) => {
      dispatch(getListProduk());
      dispatch({ type: "CHANGE_FETCHING_ADMIN_REDUCER", value: false });
      message.success("Berhasil edit produk");
    })
    .catch((err) => {
      err_handle(err);
      dispatch({ type: "CHANGE_FETCHING_ADMIN_REDUCER", value: false });
    });
};
