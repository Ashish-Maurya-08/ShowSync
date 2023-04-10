import React, { useEffect, useReducer, useState } from "react";
import MoviesContainer from "./MoviesContainer";
import './Container.css';
import axios from "axios";
import { useQuery } from "react-query";
import { ClipLoader } from "react-spinners";


const MoviesPage = (props) => {

    const [data,setdata] =useState(null);

    const [api,setapi]=useState({
        base:"https://api.themoviedb.org/3/",
        list:"trending",
        duration:"week",
        key:"e1658c90abf398d981563e797535c57e"
    })


    const initial=1;
    function reducer(page,operation){
        switch(operation){
            case "add":
                return page+1;
            case "sub":
                return page-1;
            case "reset":
                return init(initial);
            default:
                return page;
        }
    }

    const [page,dispatch]=useReducer(reducer,initial,init)

    function init(initial,page){
        return 1;
    }

    console.log(`${api.base}${props.type}/${api.duration}?page=${page}&api_key=${api.key}`);
    
    async function getMovies(){
        setdata(null);
        const res=await axios.get(`${api.base}${api.list}/${props.type}/${api.duration}?page=${page}&api_key=${api.key}`);
        setdata(res.data.results);    
    }
    console.log(data);

    useEffect(()=>{
        getMovies()
    },[page,props.type])
    useEffect(()=>{
        dispatch("reset")
    },[props.type])


    let media=props.type;
    if(props.type==="all"){
        media=""
    }
    else if(props.type==="movie"){
        media="Movies"
    }
    else if(props.type==="tv"){
        media="Tv Shows"
    }

    let {temp,error,isError,isLoading}=useQuery("movies",getMovies)

    let message=""

    if(isLoading){
        message="Loading...."
    }
    else if(isError){
        message="Error"
    }

  return (
    <>
    <div className="full_page">
    <h1 style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"5px"}}>
    {
        isLoading || isError?   
        (<>
          {message}  
        </>):(
            <>
            Trending 
    <div style={{color:"red"}}> {media} </div>
     Right Now
            </>
        )
    }
    
     </h1>
    {
        !data?
        (<>
            <>

            </>
        </>):
    (
    <div className="container">
    {
       !isLoading && data.map((item) =>
    (     
        <MoviesContainer movie={item}/>
    )
    )}
    </div>
    )}
    <div className="navigation">
    {
        page==1?
        (<button disabled="disabled" >Previous</button>):
        (<button onClick={()=>{dispatch("sub")}}>Previous</button>)
    }
        <div>{page}</div>
        <button onClick={()=>{dispatch("add")}}>Next</button>
    </div>

    </div>
    </>
  );
};

export default MoviesPage;
