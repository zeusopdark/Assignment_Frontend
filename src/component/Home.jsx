import React from "react";
import "../styles/home.css";
import landing from "./landingpage.png";
import { FaUser, FaCalendarAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";
const Home = () => {
  return (
    <section id="hero">
      <div className="hero-content">
        <div className="hero-text">
          <h1>Mark Your Attendance Please...</h1>
          <p>Experience the future of records with our platform....</p>

          <div className="hero-text-btns">
            <li>
              <NavLink to={"/calendar"}>
                <i className="fa-solid fa-magnifying-glass">
                  <FaUser size={15} />
                </i>{" "}
                Mark Attendance
              </NavLink>
            </li>
            <li>
              <NavLink to={"/records"}>
                <i className="fa-solid fa-check">
                  <FaCalendarAlt size={15} />
                </i>{" "}
                Attendance Record
              </NavLink>
            </li>
          </div>
        </div>

        <div className="hero-img">
          <img alt="" src={landing} />
        </div>
      </div>
    </section>
  );
};

export default Home;
