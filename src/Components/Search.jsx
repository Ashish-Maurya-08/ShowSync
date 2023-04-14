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
            console.log(page);
            setTimeout(()=>{
                if(cancel){
                    console.log(page);
                    getData();
                }
            },700)
            return ()=>{
                cancel=false;
            }
        }
    },[type,query,page])

    useEffect(()=>{
        setPage(1);
    },[type,query])
    console.log(page);

    async function getData(){
        setRes(null);
        console.log(query,page);
        await getSearch(type,query,page)
        .then(res=>{
            setRes(res.results);
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

        { result ?
        <div className="navigation">

                {
                    page == 1 ?
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