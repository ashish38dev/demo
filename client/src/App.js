import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/Dashboard";
import ProtectedPage from "./components/ProtectedPage";
import Loader from "./components/Loader";
import { useSelector } from "react-redux";
import AddEmployee from "./pages/AddEmployee";

const App = () => {
  const loading = useSelector((state) => state.loading.loading);

  return (
    <div>
      {loading ? <Loader /> : <></>}
      <div>
        <Toaster position="top-center" reverseOrder={false} />
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route element={<ProtectedPage />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/addemployee" element={<AddEmployee />} />
            </Route>
          </Routes>
        </Router>
      </div>
    </div>
  );
};

export default App;
