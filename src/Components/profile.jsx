import userContext from "../context/userData"
import { useContext,useEffect,useState } from "react";
import { Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getFriends,GetList } from "./api/server";


const Profile = (props) => {

    const data = useContext(userContext);
    const navigate = useNavigate();
    const [lists,setLists]=useState(null);


    useEffect(() => {
        if (!props.loggedIn) {
            navigate('/login')
        }
    }, [props.loggedIn])

    if(data && !lists){
        GetList(data.userId).then((res)=>{
            if(!res){
                navigate('/login')
            }
            if(res.lists){ 
                setLists(res.lists)
                console.log(res.lists);
            }
            else{
                console.log("no lists");
            }
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