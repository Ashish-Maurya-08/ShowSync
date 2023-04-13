import React, { useState ,useEffect} from "react";
import SearchIcon from '@mui/icons-material/Search';
import Select from 'react-select'
import { getSearch } from "./api/functions";
import MoviesContainer from "./MoviesContainer";

const Search = ()=>{

    const [query,setQuery]=useState();
    const [type,setType]=useState("movie");
    const [result,setRes]=useState();
    const [page,setPage]=useState(1);

    useEffect(()=>{
        if(query && type){
            let cancel=true;
            setTimeout(()=>{
                if(cancel){
                    getData();
                }
            },700)
            return ()=>{
                cancel=false;
            }
        }
    },[type,query])

    async function getData(){
        setRes(null);
        await getSearch(type,query,page)
        .then(res=>{
            setRes(res.results);
        })

    }
    console.log(result);

    const handleQuery = (e)=>{
        setQuery(e.target.value);
    }
    
    const handleType = (e)=>{
        setType(e.value);
    }

    const options = [
        { value: 'movie', label: 'Movie' },
        { value: 'tv', label: 'Tv Show' }
      ];

    return(
        <>
        <div className="search_page">
        <form className="search">
        <SearchIcon style={{color:"white",fontSize:"2rem"}}/>
        <input className="searchInput" placeholder="Search" onChange={(e)=>handleQuery(e)}/>
        <Select defaultValue={options[0]} options={options} onChange={(e)=>handleType(e)}/>
        </form>
        </div>
        <div className="container">
        {
            result && result.map((result)=>(
                <MoviesContainer movie={result} type={type}/>
            ))
        }
        </div>
        </>
    )
}


export default Search;