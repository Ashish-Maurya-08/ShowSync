import axios from "axios";
// import { useContext } from "react";
// import userData from "../../Contexts/userData";

const userData = localStorage.getItem("data");
let userId, token;
if(userData){
    const { userId, token, } = JSON.parse(userData);
}

const api = axios.create({
    // baseURL:"http://localhost:5000/",
    baseURL: "https://show-sync-backend.vercel.app/",
    headers: {
        "authorization": `Bearer ${token}`
    }
})

export async function getList(id){
    const payload={
        userId:id
    }
    const res=await api.post(`/list`,payload)
    return res.data;
}

// export async function getFriends(){
//     const payload={
//         userId:userId
//     }
//     const res=await api.post(`/friends`,payload)
//     return res.data;
// }

export async function addtoList(type, id) {
    const payload={
        userId:userId,
        type:type,
        movieId:id
    }
    const res=await api.post(`/list/add`,payload)
    return res;
}



