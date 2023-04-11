import React, { useEffect, useReducer, useState } from "react";
import MoviesContainer from "./MoviesContainer";
import './Container.css';
import { useQuery } from "react-query";
import { getTrending,getPopular } from "./api/functions";


const MoviesPage = (props) => {

    const [data,setdata] =useState(null);
    const initial=1;
    const [page,dispatch]=useReducer(reducer,initial,init)


    useEffect(()=>{
        dispatch("reset")
    },[props.type])

    useEffect(()=>{
        getMovies()
    },[page,props.type])


    function reducer(page,operation){
        switch(operation){
            case "add":
                return page+1;
            case "sub":
                return page-1;
            case "reset":
                return 1;
            default:
                return page;
        }
    }
    function init(initial){
        return 1;
    }
    async function getMovies(){
        setdata(null);
        if(props.type ==="all"){

            await getTrending(props.type,"day",page)
            .then((result)=>{
                setdata(result.results);
                console.log(result.results);
            })
        }
        else{
            await getPopular(props.type,page)
            .then((result)=>{
                setdata(result.results);
                console.log(result.results);
            })
        }
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
    let Tag="";
    if(props.type==="all"){
        Tag="Trending"
    }
    else{
        Tag="Popular"
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
            {Tag} 
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
        <MoviesContainer movie={item} type={props.type}/>
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
