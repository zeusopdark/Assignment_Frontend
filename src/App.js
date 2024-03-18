import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from './component/Register'
import Login from './component/Login'
import Home from './component/Home';
import Calender from "./component/Calender"
import AttendancceRecord from "./component/AttendancceRecord"
import Navbar from './component/Navbar';
import PrivateRoute from "./component/ProtectedRoute"
const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<PrivateRoute />}>
          <Route path="/records" element={<AttendancceRecord />} />
          <Route path="/calendar" element={<Calender />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App