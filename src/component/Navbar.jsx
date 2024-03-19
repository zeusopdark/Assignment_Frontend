import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FiLogOut, FiMenu } from "react-icons/fi";
import "../styles/navbar.css";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../redux/reducers/rootSlice";

// const url = "http://localhost:8000";
const url = "https://assignment-backend-zeta.vercel.app";

const Navbar = () => {
  const dispatch = useDispatch();
  const [iconActive, setIconActive] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logoutFunc = async () => {
    localStorage.removeItem("token");
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
          {!token ? (
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
