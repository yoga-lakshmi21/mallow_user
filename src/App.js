import React from "react";
import {
  Route,
  Routes,
  HashRouter
} from "react-router-dom";
import Login from "./pages/Login";
import User from './pages/User';
import ProtectedRoute from "./routes/ProtectedRoute";

const AppLayout = () => {

  return (
    <Routes>
      <Route path="/user" element={<ProtectedRoute><User /></ProtectedRoute>} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Login />} />
    </Routes>
  );
};

const App = () => (
  <HashRouter>
    <AppLayout />
  </HashRouter>
);

export default App;
