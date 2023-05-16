import userContext from "../context/userData"
import { useContext } from "react";
import axios from "axios";
const Profile = () => {

    const data = useContext(userContext);
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

      


    return (
        <div>
            <h1>Profile</h1>
        </div>
    );
}

export default Profile;