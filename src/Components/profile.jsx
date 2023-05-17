import userContext from "../context/userData"
import { useContext,useState } from "react";
import { Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getFriends,getList } from "./api/server";
const Profile = (props) => {

    const data = useContext(userContext);
    const navigate = useNavigate();
    // const [lists,setLists]=useState(null);

    
        // api.get('/friends',{userId:data.userId}).then((res)=>{
        //     console.log(res);
        //     console.log(data);
        // })
        // .catch((err)=>{
        //     console.log(err);
        // })
        
        // getFriends(data.userId).then((res)=>{
        //     console.log(res);
        // })
    if(data){
        getList(data.userId).then((res)=>{
            console.log(res.lists);
            // setLists(res.lists)
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