import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashBoard from "./Container/DashBoard";
import "antd/dist/antd.css";
import Login from "./Container/Login";
import { AdminRoute, NotLoginAdminRoute } from "./ProtectedRoute";
import "react-loading-skeleton/dist/skeleton.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <AdminRoute>
              <DashBoard />
            </AdminRoute>
          }
        />
        <Route
          path="/login"
          element={
            <NotLoginAdminRoute>
              <Login />
            </NotLoginAdminRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
