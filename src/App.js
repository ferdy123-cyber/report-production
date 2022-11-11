import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from "./Container/Admin";
import "antd/dist/antd.css";
import LoginAdmin from "./Container/LoginAdmin";
import Home from "./Container/Home";
import { AdminRoute, NotLoginAdminRoute } from "./ProtectedRoute";

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
