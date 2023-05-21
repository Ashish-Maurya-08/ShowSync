import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button,TextField } from "@mui/material"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import './Form.css';
 
 

const Login=(props)=>{
  var navigate=useNavigate();

  // const [isLoading, setLoad] = useState(false);
  useEffect(() => {
  if(props.token){
    navigate('/');
  }
}, [props.token])

  const api = axios.create({
    baseURL: "https://show-sync-backend.vercel.app/"
})

    const [userData, setUserData] = useState({
        email: "",
        password: ""
    });


  const handleChange =(e)=>{
    setUserData({
      ...userData,
        [e.target.name]:e.target.value
    })
  }

  const handleLogin=(e)=>{
    const regex= new RegExp("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$");
    e.preventDefault();
    if(regex.test(userData.username)){
      const d={
        email:userData.username,
        password:userData.password
      }
      api.post('/auth/login',d).then((res)=>{
        if(res.status===200){
          localStorage.setItem("data", JSON.stringify(res.data));
          props.setToken(res.data.token);
          alert("Login Successful")
          navigate("/");
        }
      })
      .catch((err)=>{
        console.log(err);
        alert(err.response.data.message);
      })
    }
    else{
      alert("Please enter a valid email address");
    }
  }

  return(
    <div className="main">
    <div className="form">
    <h1 className="heading" style={{color:"grey"}}>Welcome Back!</h1>
      <form>
        <TextField type="text" label="Email" name="username" required="true" onChange={(e)=>handleChange(e)}/>
        <TextField type="password" label="Password" name="password" required onChange={(e)=>handleChange(e)}/>
        <Button className="button" variant="contained"  type="submit" onClick={handleLogin}>Login</Button>
        <div className="link">New User ? <Link to='/signup'>SignUp</Link></div>
      </form>
    </div>
    </div>
  )
}
export default Login;