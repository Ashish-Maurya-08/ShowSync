import React, { useState ,useEffect} from "react";
import { Button, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import Select from 'react-select'
import { getSearch } from "./api/functions";
import MoviesContainer from "./MoviesContainer";

const Search = ()=>{

    const [query,setQuery]=useState();
    const [type,setType]=useState("movie");
    const [result,setRes]=useState([]);
    const [page,setPage]=useState(1);

    const handleSearch = (e)=>{
        e.preventDefault();
        console.log("searching");
        getData();
    }

    // useEffect(()=>{
    //     getData();
    // })

    async function getData(){
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
        <Button variant="contained" onClick={(e)=>handleSearch(e)}>Search</Button>
        </form>
        <div>
        {
            result.map((result)=>{
                <div>{result.title}</div>
            })
        }
        </div>
        </div>
        </>
    )
}


export default Search;