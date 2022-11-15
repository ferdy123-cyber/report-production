import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from "./Container/Admin";
import "antd/dist/antd.css";
import LoginAdmin from "./Container/LoginAdmin";
import Home from "./Container/Home";
import {
  AdminRoute,
  LoginMemberRoute,
  NotLoginAdminRoute,
} from "./ProtectedRoute";
import Search from "./Container/Search";
import "react-loading-skeleton/dist/skeleton.css";
import DetailProduk from "./Container/DetailProduk";
import Cart from "./Container/Cart";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <Admin />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/login"
          element={
            <NotLoginAdminRoute>
              <LoginAdmin />
            </NotLoginAdminRoute>
          }
        />
        <Route path="/" element={<Home />} />
        <Route path="/q/:key" element={<Search />} />
        <Route path="/detail/:id" element={<DetailProduk />} />
        <Route
          path="/cart/:id"
          element={
            <LoginMemberRoute>
              <Cart />
            </LoginMemberRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
