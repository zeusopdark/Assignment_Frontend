import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FiLogOut, FiMenu } from "react-icons/fi";
import "../styles/navbar.css";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../redux/reducers/rootSlice";
import axios from "axios";
const url = "https://assignment-backend-zeta.vercel.app";
const Navbar = () => {
  const dispatch = useDispatch();
  const [iconActive, setIconActive] = useState(false);
  const navigate = useNavigate();
  const getCookie = async () => {
    const response = await axios.get(`${url}/api/user/getcookie`);
    console.log(response.token);
    return response.token;
  };
  const data = getCookie();

  const token = data;

  const logoutFunc = async () => {
    await axios.get(`${url}/api/user/logout`, {
      withCredentials: true,
    });
    dispatch(setUserInfo(null));
    navigate("/login");
  };

  return (
    <header>
      <nav className={iconActive ? "nav-active" : ""}>
        <h2 className="nav-logo">
          <NavLink to={"/"}>Attendance</NavLink>
        </h2>
        <ul className="nav-links">
          {token === undefined ? (
            <>
              <li>
                <NavLink className="btn" to={"/"}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink className="btn" to={"/login"}>
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink className="btn" to={"/register"}>
                  Register
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink className="btn" to={"/"}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink style={{ color: "white" }} to={"/records"}>
                  Attendance Record
                </NavLink>
              </li>
              <li>
                <NavLink style={{ color: "white" }} to={"/calendar"}>
                  Mark Attendance
                </NavLink>
              </li>
              <li>
                <span className="btn" onClick={logoutFunc}>
                  <FiLogOut />
                </span>
              </li>
            </>
          )}
        </ul>
      </nav>
      <div className="menu-icons">
        {!iconActive ? (
          <FiMenu
            className="menu-open"
            onClick={() => {
              setIconActive(true);
            }}
          />
        ) : (
          <FiLogOut
            className="menu-close"
            onClick={() => {
              setIconActive(false);
            }}
          />
        )}
      </div>
    </header>
  );
};

export default Navbar;
