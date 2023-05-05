import React, { useState ,useEffect} from "react";
import SearchIcon from '@mui/icons-material/Search';
import Select from 'react-select'
import { getSearch } from "./api/functions";
import MoviesContainer from "./MoviesContainer";
import { Button } from "@mui/material";

const Search = ()=>{

    const [query,setQuery]=useState();
    const [type,setType]=useState("movie");
    const [result,setRes]=useState();
    const [page,setPage]=useState(1);

    const prevPage = () => {
        setPage(page - 1);
    }
    const nextPage = () => {
        setPage(page + 1);
    }
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
    },[type,query,page])

    useEffect(()=>{
        if(query && type){
            getData();
        }
    },[type,page])

    useEffect(()=>{
        setPage(1);
    },[type,query])

    async function getData(){
        setRes(null);
        await getSearch(type,query,page)
        .then(res=>{
            if(res.results.length > 0){
                setRes(res.results);
            }
        })

    }

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
        <div className="showLarge">
        <SearchIcon fontSize="large"/>
        </div>
        <div className="showMid">
        <SearchIcon fontSize="medium"/>
        </div>
        <div className="showSmall">
        <SearchIcon fontSize="small"/>
        </div>
        <input className="searchInput" placeholder="Search" onChange={(e)=>handleQuery(e)}/>
        </form>
        </div>
        <div className="container">
        {
            result && result.map((result)=>(
                <MoviesContainer movie={result} type={result.media_type}/>
            ))
        }
        </div>

        { result && query ?
        <div className="navigation">
                {
                    page === 1 ?
                    (<Button variant="contained" color="error">Previous</Button>) :
                    (<Button variant="contained" onClick={prevPage}>Previous</Button>)
                }
                    <div style={{color:"white"}}>{page}</div>
                    <Button variant="contained" onClick={nextPage}>Next</Button>
        </div>:<></>
        }
        </>
    )
}


export default Search;