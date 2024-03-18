import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import logDoc from "./logDoc.png";

function Register() {
  const [formDetails, setFormDetails] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const inputChange = (e) => {
    const { name, value } = e.target;
    return setFormDetails({
      ...formDetails,
      [name]: value,
    });
  };

  const formSubmit = async (e) => {
    try {
      e.preventDefault();

      const { name, email, password } = formDetails;
      if (!name || !email || !password) {
        return toast.error("Input field should not be empty");
      } else if (name.length < 3) {
        return toast.error("First name must be at least 3 characters long");
      } else if (password.length < 5) {
        return toast.error("Password must be at least 5 characters long");
      }
      const config = { headers: { "Content-Type": "application/json" } };

      await toast.promise(
        axios.post(
          `https://assignment-backend-two.vercel.app/user/register`,
          {
            name,
            email,
            password,
          },
          config
        ),
        {
          pending: "Registering user...",
          success: "User registered successfully",
          error: "Unable to register user",
          loading: "Registering user...",
        }
      );
      return navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        className=""
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          height: "100vh",
          margin: "0",
        }}
      >
        <section className="register-section flex-center">
          <div className="mainLoS2">
            <img src={logDoc} alt="" />
          </div>
          <div className="mainLoS">
            <h2 className="" style={{ fontSize: "2rem", marginTop: "2rem" }}>
              Sign Up
            </h2>
            <form onSubmit={formSubmit} className="register-form">
              <input
                type="text"
                name="name"
                className="form-input"
                placeholder="Enter your name"
                value={formDetails.name}
                onChange={inputChange}
              />
              <input
                type="email"
                name="email"
                className="form-input"
                placeholder="Enter your email"
                value={formDetails.email}
                onChange={inputChange}
              />
              <input
                type="password"
                name="password"
                className="form-input"
                placeholder="Enter your password"
                value={formDetails.password}
                onChange={inputChange}
              />
              <button className="buttonLogin" type="submit">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                  />
                </svg>

                <div className="text">Submit</div>
              </button>
            </form>
            <p style={{ marginBottom: "1rem" }}>
              Already a user?{" "}
              <NavLink className="login-link" to={"/login"}>
                Log in
              </NavLink>
            </p>
          </div>
        </section>
      </div>
    </>
  );
}

export default Register;
