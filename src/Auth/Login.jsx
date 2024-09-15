import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Form.css";
import Loader from "../Layout/Loader";
import GlassMorph from "../Utils/GlassMorph";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LockIcon from '@mui/icons-material/Lock';


import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Login = (props) => {

  gsap.registerPlugin(useGSAP);
  const container = useRef();

  useGSAP(() => {

  }, { scope: container })



  var navigate = useNavigate();
  const [isLoading, setLoad] = useState(false);
  useEffect(() => {
    if (props.token) {
      navigate("/");
    }
  }, [props.token]);

  const api = axios.create({
    baseURL: "https://show-sync-backend.vercel.app/",
  });

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = (e) => {
    setLoad(true);
    const regex = new RegExp("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$");
    e.preventDefault();
    if (regex.test(userData.username)) {
      const d = {
        email: userData.username,
        password: userData.password,
      };
      api
        .post("/auth/login", d)
        .then((res) => {
          if (res.status === 200) {
            localStorage.setItem("data", JSON.stringify(res.data));
            props.setToken(res.data.token);
            setLoad(false);
            alert("Login Successful");
            navigate("/");
          }
        })
        .catch((err) => {
          console.log(err);
          setLoad(false);
          if (err.response.data.message) {
            alert(err.response.data.message);
          } else {
            alert("Something went wrong");
          }
        });
    } else {
      setLoad(false);
      alert("Please enter a valid email address");
    }
  };

  return (
    <div className="login_page">
      <div className="home">
        <Link to="/" className="backButton">
          <ArrowBackIcon className="backArrow" />
          <h3>Home</h3>
        </Link>
      </div>

      <div className="main">
        {isLoading ? (
          <Loader />
        ) : (
          <div className="glass-container">
            <GlassMorph>
              <div className="form-container">
                <form className="form">
                  <div className="heading">Welcome Back !</div>
                  <div className="gap-1">
                    <div className="width-100">
                      <input type="text" name="username" label="email" required onChange={(e) => handleChange(e)} className="input-field" placeholder="Email" />
                      <AlternateEmailIcon className="input-icon" />
                    </div>
                    <div className="width-100">
                      <input type="password" name="password" label="password" required onChange={(e) => handleChange(e)} className="input-field" placeholder="Password" />
                      <LockIcon className="input-icon" />
                    </div>
                  </div>
                  <div className="gap-1">
                    <button
                      className="button"
                      variant="contained"
                      type="submit"
                      onClick={handleLogin}
                    >
                      Login
                    </button>
                    <div className="link">
                      New User ? <Link to="/signup">SignUp</Link>
                    </div>
                  </div>
                </form>
              </div>
            </GlassMorph>
          </div>
        )}
      </div>
    </div>
  );
};
export default Login;
