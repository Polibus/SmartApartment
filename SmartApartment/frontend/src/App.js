import React from 'react';
import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Devices from './components/Devices/Devices'
import UserRegistration from './components/Users/UserRegistration';
import UserLogin from './components/Users/UserLogin';
import AdminPanel from './components/AdminPanel/AdminPanel';
import { decodeToken, isExpired } from 'react-jwt';

let Admin
try {
  const token = localStorage.getItem('token');
  const User = token ? decodeToken(token) : null;
  Admin = User.isAdmin
} catch (error) {
  Admin = false
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/api/login" element={<UserLogin />} />
        <Route path="/api/registration" element={<UserRegistration />} />
        <Route path="/api/devices" element={localStorage.getItem("token") && !isExpired(localStorage.getItem("token")) ? <Devices /> : <Navigate to={"/api/login"} />} />
        <Route path="/api/admin" element={localStorage.getItem("token") && Admin && !isExpired(localStorage.getItem("token")) ? <AdminPanel /> : <Navigate to={"/api/login"} />} />
        <Route path="*" element={<Navigate to="/api/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;