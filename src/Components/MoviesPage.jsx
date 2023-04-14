import React, { Fragment, useEffect, useReducer, useState } from "react";
import MoviesContainer from "./MoviesContainer";
import './Container.css';
import { getTrending, getTop, getUpcoming } from "./api/functions";
import { Button } from "@mui/material";


const MoviesPage = (props) => {

    const [data, setdata] = useState(null);
    const initial = 1;
    const [page, setPage] = useState(1);
    const [isLoading, setLoad] = useState(true);
    let isError = false;

    const main_style={}
    if(props.page==="main"){
        main_style.gridTemplateColumns="1fr 1fr 1fr 1fr"
    }

    useEffect(() => {

        setdata(null);
        setLoad(true);
        let cancel=true;
        console.log(page);
        setTimeout(()=>{
            if(cancel){
                console.log(page);
                getMovies();
            }
        },500)
        return ()=>{
            cancel=false;
        }
    }, [props.page,page])

    useEffect(()=>{
        setPage(1);
    },[props.page])




    const prevPage = () => {
        setPage(page - 1);
    }
    const nextPage = () => {
        setPage(page + 1);
    }


    async function getMovies() {
        if (props.type === "all") {
            await getTrending(props.type, "day", page)
                .then((result) => {
                    setdata(result.results);
                })
        }
        else if (props.type === "movie" && props.page === "movies") {
            await getTop(props.type, page)
                .then((result) => {
                    setdata(result.results);
                })
        }
        else if (props.type === "tv") {
            await getTop(props.type, page)
                .then((result) => {
                    setdata(result.results);
                })
        }

        if (props.page === "upcoming") {
            await getUpcoming(page)
                .then((result) => {
                    setdata(result.results);
                })
        }
        setLoad(false)
    }
    let media = props.type;
    let message = ""

    if (props.type === "all") {
        media = ""
    }
    else if (props.type === "movie" && props.page==="movies") {
        media = " Movies"
    }
    else if (props.type === "tv") {
        media = " Tv Shows"
    }

    if (isLoading) {
        message = "Loading...."
    }
    else if (isError) {
        message = "Error"
    }
    let Tag = "";
    if (props.type === "all") {
        Tag = "Trending Right Now"
    }
    else if (props.type === "tv") {
        Tag = "Top Rated "
    }
    else {
        Tag = "Popular "
    }
    return (
        <Fragment>
            <div className="full_page">
                <h1 style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "5px" }}>
                    {
                        isLoading || isError ?
                            (<>
                                {message}
                            </>) :
                            (props.page === "upcoming") ?
                                (<div>Upcoming Movies</div>) :
                                (
                                    <>
                                        {Tag}
                                        <div style={{ color: "red" }}> {media} </div>
                                    </>
                                )
                    }

                </h1>
                {
                    !data ?
                        (<></>) :
                        (
                            <div className="container" style={main_style}>
                                {
                                    !isLoading && data.map((item) =>
                                    (
                                        <MoviesContainer movie={item} type={props.type} page={props.page} />
                                    )
                                    )}
                            </div>
                        )}
                <div className="navigation">
                    {
                        page == 1 ?
                            (<Button variant="contained" color="error">Previous</Button>) :
                            (<Button variant="contained" onClick={prevPage}>Previous</Button>)
                    }
                    <div>{page}</div>
                    <Button variant="contained" onClick={nextPage}>Next</Button>
                </div>

            </div>
        </Fragment>
    );
};

export default MoviesPage;
