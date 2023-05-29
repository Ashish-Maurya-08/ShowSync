import React, { useState, useEffect } from "react";
import SearchIcon from '@mui/icons-material/Search';
import { getSearch } from "./api/functions";
import MoviesContainer from "./MoviesContainer";
import { Button } from "@mui/material";
import Layout from "../Layout/Layout";
import Loader from "../Layout/Loader";
const Search = () => {

    const [query, setQuery] = useState();
    const [result, setRes] = useState();
    const [page, setPage] = useState(1);
    const [isLoading, setLoad] = useState(false);

    const prevPage = () => {
        setPage(page - 1);
    }
    const nextPage = () => {
        setPage(page + 1);
    }
    useEffect(() => {
        if (query) {
            let cancel = true;
            setTimeout(() => {
                if (cancel) {
                    getData();
                }
            }, 700)
            return () => {
                cancel = false;
            }
        }
    }, [query, page])

    useEffect(() => {
        if (query) {
            getData();
        }
    }, [ page])

    useEffect(() => {
        setPage(1);
    }, [query])

    async function getData() {
        setRes(null);
        await getSearch(query, page)
            .then(res => {
                if (res.results.length > 0) {
                    setRes(res.results);
                }
                setLoad(false);
            })

    }

    const handleQuery = (e) => {
        setQuery(e.target.value);
        if(e.target.value.length===0)
        {
            setRes(null);
            setLoad(false);
        }
        else{
            setLoad(true);
        }
    }


    return (
        <Layout>
            <div className="search_page">
                <form className="search" onSubmit={(e)=>{e.preventDefault()}}>
                    <div className="showLarge">
                        <SearchIcon fontSize="large" />
                    </div>
                    <div className="showMid">
                        <SearchIcon fontSize="medium" />
                    </div>
                    <div className="showSmall">
                        <SearchIcon fontSize="small" />
                    </div>
                    <input className="searchInput" placeholder="Search" onChange={(e) => handleQuery(e)} />
                </form>
            </div>
            <div className="container">
                {
                    result && result.map((result) => (
                        <MoviesContainer movie={result} type={result.media_type} />
                    ))
                }
            </div>
            {
                isLoading ? <Loader /> : <></>
            }

            {result && query ?
                <div className="navigation">
                    {
                        page === 1 ?
                            (<Button variant="contained" color="error">Previous</Button>) :
                            (<Button variant="contained" onClick={prevPage}>Previous</Button>)
                    }
                    <div style={{ color: "white" }}>{page}</div>
                    <Button variant="contained" onClick={nextPage}>Next</Button>
                </div> : <></>
            }
        </Layout>
    )
}


export default Search;