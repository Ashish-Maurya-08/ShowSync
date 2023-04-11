import axios from "axios";


const api={
    baseURL:"https://api.themoviedb.org/3/",
    key:"e1658c90abf398d981563e797535c57e"
}

export async function getDetail(id,type){

    const res=await axios.get(`${api.baseURL}/${type}/${id}?api_key=${api.key}`)
    return res.data;
}

export async function getTrending(type,duration="week",page=1){

    const res=await axios.get(`${api.baseURL}/trending/${type}/${duration}?page=${page}&api_key=${api.key}`)
    return res.data;
}

export async function getImages(type,id){
    const res=await axios.get(`${api.baseURL}/${type}/${id}/images?api_key=${api.key}`)
    return res.data;
}