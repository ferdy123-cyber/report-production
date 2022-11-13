import { message } from "antd";
import axios from "axios";

export const BASE_URL = "http://192.168.50.92/jamtangankuid_server";

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
    .get(`${BASE_URL}/api/produk`, { params: data })
    .then((resp) => {
      dispatch({ type: "GET_LIST_PRODUK", value: resp.data });
      console.log("produk", { ...data, length: resp.data.data.length });
      dispatch({ type: "CHANGE_FETCHING_ADMIN_REDUCER", value: false });
    })
    .catch((err) => {
      err_handle(err);
      dispatch({ type: "CHANGE_FETCHING_ADMIN_REDUCER", value: false });
    });
};

export const getListProdukByTerlaris = (data) => (dispatch) => {
  dispatch({ type: "CHANGE_FETCHING_ADMIN_REDUCER", value: true });
  axios
    .get(`${BASE_URL}/api/produk/sort_terlaris`, { params: data })
    .then((resp) => {
      dispatch({ type: "GET_LIST_PRODUK", value: resp.data });
      console.log("produk", { ...data, length: resp.data.data.length });
      dispatch({ type: "CHANGE_FETCHING_ADMIN_REDUCER", value: false });
    })
    .catch((err) => {
      err_handle(err);
      dispatch({ type: "CHANGE_FETCHING_ADMIN_REDUCER", value: false });
    });
};

export const addListProduk = (data) => (dispatch) => {
  const formdata = new FormData();
  formdata.append("name", data.data.name);
  formdata.append("price", data.data.price);
  formdata.append("stok", data.data.stok);
  formdata.append("description", data.data.description);
  formdata.append("image", data.data.image.file);
  dispatch({ type: "CHANGE_FETCHING_ADMIN_REDUCER", value: true });
  axios
    .post(`${BASE_URL}/api/produk`, formdata, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((resp) => {
      dispatch(getListProduk(data.param));
      dispatch({ type: "CHANGE_FETCHING_ADMIN_REDUCER", value: false });
      message.success("Berhasil tambah produk");
    })
    .catch((err) => {
      err_handle(err);
      dispatch({ type: "CHANGE_FETCHING_ADMIN_REDUCER", value: false });
    });
};

export const deleteListProduk = (data) => (dispatch) => {
  dispatch({ type: "CHANGE_FETCHING_ADMIN_REDUCER", value: true });
  axios
    .delete(`${BASE_URL}/api/produk/${data.data}`)
    .then((resp) => {
      dispatch(getListProduk(data.param));
      dispatch({ type: "CHANGE_FETCHING_ADMIN_REDUCER", value: false });
      message.success("Berhasil hapus produk");
    })
    .catch((err) => {
      err_handle(err);
      dispatch({ type: "CHANGE_FETCHING_ADMIN_REDUCER", value: false });
    });
};

export const editListProduk = (data) => (dispatch) => {
  dispatch({ type: "CHANGE_FETCHING_ADMIN_REDUCER", value: true });
  axios
    .put(`${BASE_URL}/api/produk/${data.data.id}`, data.data)
    .then((resp) => {
      dispatch(getListProduk(data.param));
      dispatch({ type: "CHANGE_FETCHING_ADMIN_REDUCER", value: false });
      message.success("Berhasil edit produk");
    })
    .catch((err) => {
      err_handle(err);
      dispatch({ type: "CHANGE_FETCHING_ADMIN_REDUCER", value: false });
    });
};

export const getListPoster = (data) => (dispatch) => {
  dispatch({ type: "CHANGE_FETCHING_ADMIN_REDUCER", value: true });
  axios
    .get(`${BASE_URL}/api/poster`, { params: data })
    .then((resp) => {
      dispatch({ type: "GET_LIST_POSTER", value: resp.data });
      console.log("poster", { ...data, length: resp.data.data.length });
      dispatch({ type: "CHANGE_FETCHING_ADMIN_REDUCER", value: false });
    })
    .catch((err) => {
      err_handle(err);
      dispatch({ type: "CHANGE_FETCHING_ADMIN_REDUCER", value: false });
    });
};

export const addListPoster = (data) => (dispatch) => {
  const formdata = new FormData();
  formdata.append("image", data.image);
  dispatch({ type: "CHANGE_FETCHING_ADMIN_REDUCER", value: true });
  axios
    .post(`${BASE_URL}/api/poster`, formdata, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((resp) => {
      dispatch(getListPoster(data.param));
      dispatch({ type: "CHANGE_FETCHING_ADMIN_REDUCER", value: false });
      message.success("Berhasil tambah poster");
    })
    .catch((err) => {
      err_handle(err);
      dispatch({ type: "CHANGE_FETCHING_ADMIN_REDUCER", value: false });
    });
};

export const deleteListPoster = (data) => (dispatch) => {
  dispatch({ type: "CHANGE_FETCHING_ADMIN_REDUCER", value: true });
  axios
    .delete(`${BASE_URL}/api/poster/${data.data}`)
    .then((resp) => {
      dispatch(getListPoster(data.param));
      dispatch({ type: "CHANGE_FETCHING_ADMIN_REDUCER", value: false });
      message.success("Berhasil hapus poster");
    })
    .catch((err) => {
      err_handle(err);
      dispatch({ type: "CHANGE_FETCHING_ADMIN_REDUCER", value: false });
    });
};

export const getListProdukPromo = (data) => (dispatch) => {
  dispatch({ type: "CHANGE_FETCHING_ADMIN_REDUCER", value: true });
  axios
    .get(`${BASE_URL}/api/produk/promo`, { params: data })
    .then((resp) => {
      dispatch({ type: "GET_LIST_PRODUK_PROMO", value: resp.data });
      console.log("promo", { ...data, length: resp.data.data.length });
      dispatch({ type: "CHANGE_FETCHING_ADMIN_REDUCER", value: false });
    })
    .catch((err) => {
      err_handle(err);
      dispatch({ type: "CHANGE_FETCHING_ADMIN_REDUCER", value: false });
    });
};

export const changeListPromo = (data) => (dispatch) => {
  dispatch({ type: "CHANGE_FETCHING_ADMIN_REDUCER", value: true });
  axios
    .put(`${BASE_URL}/api/produk/${data.id}`, data.data)
    .then((resp) => {
      dispatch(getListProdukPromo(data.param));
      dispatch({ type: "CHANGE_FETCHING_ADMIN_REDUCER", value: false });
      message.success("Berhasil edit promo");
    })
    .catch((err) => {
      err_handle(err);
      dispatch({ type: "CHANGE_FETCHING_ADMIN_REDUCER", value: false });
    });
};

export const getListProdukRekomended = (data) => (dispatch) => {
  dispatch({ type: "CHANGE_FETCHING_ADMIN_REDUCER", value: true });
  axios
    .get(`${BASE_URL}/api/produk/rekomended`, { params: data })
    .then((resp) => {
      dispatch({ type: "GET_LIST_PRODUK_REKOMENDED", value: resp.data });
      console.log("rekomendasi", { ...data, length: resp.data.data.length });
      dispatch({ type: "CHANGE_FETCHING_ADMIN_REDUCER", value: false });
    })
    .catch((err) => {
      err_handle(err);
      dispatch({ type: "CHANGE_FETCHING_ADMIN_REDUCER", value: false });
    });
};

export const changeListRekomendasi = (data) => (dispatch) => {
  dispatch({ type: "CHANGE_FETCHING_ADMIN_REDUCER", value: true });
  axios
    .put(`${BASE_URL}/api/produk/${data.id}`, data.data)
    .then((resp) => {
      dispatch(getListProdukRekomended(data.param));
      dispatch({ type: "CHANGE_FETCHING_ADMIN_REDUCER", value: false });
      message.success("Berhasil edit rekomendasi");
    })
    .catch((err) => {
      err_handle(err);
      dispatch({ type: "CHANGE_FETCHING_ADMIN_REDUCER", value: false });
    });
};
