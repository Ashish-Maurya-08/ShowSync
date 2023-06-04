import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button,TextField } from "@mui/material"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import './Form.css';
import Loader from "../Layout/Loader";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
 
 

const Login=(props)=>{
  var navigate=useNavigate();

  const [isLoading, setLoad] = useState(false);
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
    setLoad(true);
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
          setLoad(false)
          alert("Login Successful")
          navigate("/");
        }
      })
      .catch((err)=>{
        console.log(err);
        setLoad(false)
        if(err.response.data.message){
          alert(err.response.data.message);
    
        }
        else{
          alert("Something went wrong");
        }
      })
    }
    else{
      setLoad(false)
      alert("Please enter a valid email address");
    }
  
  }

  return( 
    <>
    <div className="home">
    <ChevronLeftIcon/>
      <Link to='/'><h3>Home</h3></Link>
    </div>
    <div className="main">
    {isLoading ? <Loader/> :
    <div className="form">
    <h1 className="heading">Welcome Back!</h1>
      <form>
        <TextField type="text" label="Email" name="username" required="true" onChange={(e)=>handleChange(e)}/>
        <TextField type="password" label="Password" name="password" required onChange={(e)=>handleChange(e)}/>
        <Button className="button" variant="contained"  type="submit" onClick={handleLogin}>Login</Button>
        <div className="link">New User ? <Link to='/signup'>SignUp</Link></div>
      </form>
    </div>
    }
    </div>
    </>
  )
}
export default Login;