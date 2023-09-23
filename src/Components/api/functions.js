import axios from "axios";


const api={
    baseURL:"https://api.themoviedb.org/3/",
    key:"e1658c90abf398d981563e797535c57e",
    region:"IN",
    language:"hi-IN"
}

async function getDetail(id,type){

    const res=await axios.get(`${api.baseURL}/${type}/${id}?api_key=${api.key}`)
    return res.data;
}

async function getTrending(type,duration="week",page=1){

    const res=await axios.get(`${api.baseURL}/trending/${type}/${duration}?page=${page}&api_key=${api.key}&region=IN`)
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

async function getSearch(query,page=1){
    const res=await axios.get(`${api.baseURL}/search/multi?query=${query}&page=${page}&api_key=${api.key}&region=IN`);
    return res.data;
}

async function getRecommendations(type,id){
    const res=await axios.get(`${api.baseURL}/${type}/${id}/recommendations?api_key=${api.key}&region=IN`);
    return res.data;
}

async function getSimilar(type,id){
    const res=await axios.get(`${api.baseURL}/${type}/${id}/similar?api_key=${api.key}&region=IN`);
    return res.data;
}

async function getCast(type,id){
    const res=await axios.get(`${api.baseURL}/${type}/${id}/credits?api_key=${api.key}&region=IN`);
    return res.data;
}

async function getReviews(type,id){
    const res=await axios.get(`${api.baseURL}/${type}/${id}/reviews?api_key=${api.key}&region=IN`);
    return res.data;
}

async function getVideos(type,id){
    const res=await axios.get(`${api.baseURL}/${type}/${id}/videos?api_key=${api.key}&region=`);
    return res.data;
}

async function getProviders(type,id){
    const res=await axios.get(`${api.baseURL}/${type}/${id}/watch/providers?api_key=${api.key}&region=IN`);
    return res.data;
}

async function getPerson(id){
    const res=await axios.get(`${api.baseURL}/person/${id}?api_key=${api.key}&region=IN`);
    return res.data;
}

async function getCredits(id){
    const res=await axios.get(`${api.baseURL}/person/${id}/combined_credits?api_key=${api.key}`);
    return res.data;
}

async function getExternalIDs(type,id){
    const res=await axios.get(`${api.baseURL}/${type}/${id}/external_ids?api_key=${api.key}`);
    return res.data;
}


export{getDetail,getImages,getPopular,getSearch,getTrending,getTop,getUpcoming,getRecommendations,getSimilar,getCast,getReviews,getVideos,getProviders,getPerson,getCredits,getExternalIDs}
