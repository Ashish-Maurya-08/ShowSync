import axios from "axios";


const api={
    baseURL:"https://api.themoviedb.org/3/",
    key:"e1658c90abf398d981563e797535c57e"
}

export default async function getDetail(id){

    const res=await axios.get(`${api.baseURL}/movie/${id}?api_key=${api.key}`)
    return res.data;
}
