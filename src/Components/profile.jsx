import userContext from "../context/userData"
import { useContext } from "react";
import { Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Profile = (props) => {

    const data = useContext(userContext);
    const navigate = useNavigate();
    console.log(data.token);

    const api = axios.create({
        baseURL: "https://show-sync-backend.vercel.app/",
        // baseURL: "http://localhost:5000/",

        headers: {
            "Authorization": "Bearer " + data.token
        }  
    })
    if(data.token){   
        api.get('/friends',data).then((res)=>{
            console.log(res);
        })
        .catch((err)=>{
            console.log(err);
        })

        api.get('/list',data).then((res)=>{
            console.log(res);
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    const logout = () => {
        console.log("logout");
        localStorage.removeItem("data");
        props.setToken(null);
        props.setUser(null);
        navigate('/');
    }


    return (
        <div>
            <h1>Profile</h1>
            <Button variant='contained' onClick={logout}>Logout</Button>
        </div>
    );
}

export default Profile;