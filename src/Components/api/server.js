import axios from "axios";
// import { useContext } from "react";
// import userData from "../../Contexts/userData";
import { useNavigate } from "react-router-dom";

const userData = localStorage.getItem("data");
let userId, token;
if(userData){
    ({ userId, token} = JSON.parse(userData));
}

function updateToken(){
    const userData = localStorage.getItem("data");
    if(userData){
        ({ userId, token} = JSON.parse(userData));
    }
    api=axios.create({
        baseURL:"http://localhost:5000/",
        // baseURL: "https://show-sync-backend.vercel.app/",
        headers: {
            "authorization": `Bearer ${token}`
        }
    })
}


let api = axios.create({
    baseURL:"http://localhost:5000/",
    // baseURL: "https://show-sync-backend.vercel.app/",
    headers: {
        "authorization": `Bearer ${token}`
    }
})

export async function GetList(id){
    updateToken();
    if(!token){
        alert("Please Login");
        return false;
    }
    const payload={
        userId:id
    }
    const res=await api.post(`/list`,payload)
    return res.data;
}

export async function getUser(id){
    const res=await api.post(`/list/user`,{userId:id})
    console.log(res);
}

// export async function getFriends(){
//     const payload={
//         userId:userId
//     }
//     const res=await api.post(`/friends`,payload)
//     return res.data;
// }

export async function AddtoList(type, id) {
    updateToken();
    if(!token){
        alert("Please Login");
        return false;
    }
    const payload={
        userId:userId,
        type:type,
        movieId:id
    }
    const res=await api.post(`/list/add`,payload)
    return res;
}



export async function verifyUser(){
    updateToken();
    if(!token){
        return false;
    }
    try{
        const res=await api.post(`/auth/verify`)
        return res;
    }
    catch(err){
        console.log(err);
        return false;
    }
} 