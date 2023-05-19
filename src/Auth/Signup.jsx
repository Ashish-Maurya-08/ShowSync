import { TextField,Button } from "@mui/material";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import React from "react";
import './Form.css';

const SignUp=(props)=>{

  var navigate=useNavigate();
  useEffect(() => {
  if(props.token){
    navigate('/');
  }
}, [props.token])
  const api = axios.create({
    baseURL: "https://show-sync-backend.vercel.app/",
    // baseURL: "http://localhost:5000/",
    Headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        // "Authorization": "Bearer " + sessionStorage.getItem("token")
    }
})
  const [data,setdata] =useState({
    username:"",
    email:"",
    password:""
  })

  const handleChange =(e)=>{
    setdata({
      ...data,
        [e.target.name]:e.target.value
    })
  }

  const handleSignup=(e)=>{
    const regex= new RegExp("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$");
    e.preventDefault();
    if(regex.test(data.email)){
      const d={
        name:data.username,
        email:data.email,
        password:data.password
      }
      api.post('/auth/register',d).then((res)=>{
        if(res.status===200){
          alert("Account created successfully");
          navigate('/login');
        }
      })
      .catch((err)=>{
        alert(err);
      }
      )
    }
    else{
      alert("Please enter a valid email address");
    }
  }


  return(
    <div className="main">
    <div className="form">
      <form>
        <TextField required type="text" label="Username" name="username" onChange={(e)=>{handleChange(e)}}/>
        <TextField required type="text" label="Email" name="email" onChange={(e)=>{handleChange(e)}}/>
        <TextField required type="password" label="Password" name="password" onChange={(e)=>{handleChange(e)}}/>
        <Button className="button" variant="contained" type="submit" onClick={(e)=>{handleSignup(e)}}>SignUp</Button>
        <div className="link">Already have account ? <Link to='/login'>Login</Link></div>
      </form>
    </div>
    </div>
  )
}
export default SignUp;