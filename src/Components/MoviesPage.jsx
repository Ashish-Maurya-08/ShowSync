import React, { useEffect, useReducer, useState } from "react";
import MoviesContainer from "./MoviesContainer";
import './Container.css';
import { useQuery } from "react-query";
import { getTrending } from "./api/functions";


const MoviesPage = (props) => {

    const [data,setdata] =useState(null);
    const initial=1;
    const [page,dispatch]=useReducer(reducer,initial,init)



    useEffect(()=>{
        getMovies()
    },[page,props.type])
    useEffect(()=>{
        dispatch("reset")
    },[props.type])


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
    function init(initial){
        return 1;
    }
    async function getMovies(){
        setdata(null);
        await getTrending(props.type,"day",page)
        .then((result)=>{
            setdata(result.results);
            console.log(result.results);
        })
    }
    console.log(data);
    let {isError,isLoading}=useQuery("movies",getMovies)
    let media=props.type;
    let message=""

    if(props.type==="all"){
        media=""
    }
    else if(props.type==="movie"){
        media="Movies"
    }
    else if(props.type==="tv"){
        media="Tv Shows"
    }

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
