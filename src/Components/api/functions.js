import axios from "axios";


const api={
    baseURL:"https://api.themoviedb.org/3/",
    key:"e1658c90abf398d981563e797535c57e",
    region:"IN",
    language:"hi-IN"
}

async function getDetail(id,type){

    const res=await axios.get(`${api.baseURL}/${type}/${id}?api_key=${api.key}&language=${api.language}`)
    return res.data;
}

async function getTrending(type,duration="week",page=1){

    const res=await axios.get(`${api.baseURL}/trending/${type}/${duration}?page=${page}&api_key=${api.key}`)
    return res.data;
}
async function getPopular(type,page=1){
    const res=await axios.get(`${api.baseURL}/${type}/popular?page=${page}&api_key=${api.key}&region=IN`)
    return res.data;
}

async function getTop(type,page=1){
    const res=await axios.get(`${api.baseURL}/${type}/top_rated?page=${page}&api_key=${api.key}&region=IN`)
    return res.data;
}

async function getUpcoming(page){
    const res=await axios.get(`${api.baseURL}/movie/upcoming?page=${page}&api_key=${api.key}`)
    return res.data;
}
async function getImages(type,id){
    const res=await axios.get(`${api.baseURL}/${type}/${id}/images?api_key=${api.key}`)
    return res.data;
}

async function getSearch(type,query,page=1){
    const res=await axios.get(`${api.baseURL}/search/${type}?query=${query}&page=${page}&api_key=${api.key}`);
    return res.data;
}


module.exports={getDetail,getImages,getPopular,getSearch,getTrending,getTop,getUpcoming}