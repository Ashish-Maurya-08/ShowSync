import React, { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import './main.css'
import { getDetail, getCast, getRecommendations, getSimilar, getProviders } from "./api/functions"
import FavoriteIcon from '@mui/icons-material/Favorite';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import notFound from "../notFound.png";
import Layout from "../Layout/Layout";
import { AddtoList } from "../Components/api/server"
import List from "./ListContainer";
import Loader from '../Layout/Loader'
import { getExternalIDs } from "./api/functions";

const DetailPage = (props) => {
    const { id } = useParams()
    const navigate = useNavigate();
    const [detail, setDetail] = useState();
    const [external, setExternal] = useState();

    async function getExternal() {
        await getExternalIDs(props.type, id)
            .then(result => {
                setExternal(result)
            })
    }

    const [source, setSource] = useState();

    function Loadvideo(){

        if (props.type == 'movie') {
            setSource(`https://vidsrc.to/embed/movie/${id}`)
        }
    
        else if (props.type=='tv'){
            if (external){
                console.log(external,source);
                const imdb_id=external.imdb_id;
                setSource(`https://vidsrc.to/embed/tv/${imdb_id}`)
            }
        }

    }

    console.log(source);

    useEffect(() => {  
        Loadvideo();
    }, [external])

   



    const [cast, setCast] = useState();
    const [recommendations, setRecommendations] = useState();
    const [similar, setSimilar] = useState();
    const [provider, setProvider] = useState();




    const api = {
        backdrop: "https://image.tmdb.org/t/p/original/",
        poster: "https://image.tmdb.org/t/p/w500/"
    }

    async function GetSimilar() {
        await getSimilar(props.type, id)
            .then(result => {
                setSimilar(result.results)
            })
    }

    async function GetRecommendations() {
        await getRecommendations(props.type, id)
            .then(result => {
                setRecommendations(result.results)
            })
    }

    async function GetCast() {
        await getCast(props.type, id)
            .then(result => {
                setCast(result.cast)
            })
    }

    async function GetProvider() {
        await getProviders(props.type, id)
            .then(result => {
                if (result.results.IN) {
                    setProvider(result.results.IN.flatrate)
                }
            })
    }


    async function getDetails() {
        await getDetail(id, props.type)
            .then(result => {
                setDetail(result)
            })
    }

    useEffect(() => {
        GetSimilar();
        GetRecommendations();
        GetCast();
        GetProvider();
        getExternal();
    }, [detail])

    useEffect(() => {
        setDetail();
        setCast();
        setRecommendations();
        setSimilar();
        setProvider();

        getDetails();
    }, [props.type, id])




    const add = async (type) => {
        const id = detail.id;
        const mtype = props.type;
        await AddtoList(type, id, mtype).then((res) => {
            if (!res) {
                localStorage.removeItem("data");
                props.setToken(null);
                alert("Please login to add to list");
                navigate('/login')
            }
            if (res === 201) {
                alert("Added to list");
            }
        })
    }


    return (
        <Layout>
            {
                detail ?
                    <>
                        <div className='head-pic'>
                            <img
                                className="desktop" src={`${api.backdrop}${detail.backdrop_path}`} alt="Loading" >
                            </img>
                            <img
                                className="mobile" src={`${api.poster}${detail.poster_path}`} alt="Loading" >
                            </img>
                            <div className="overlay-data">

                                <h1>{detail.title || detail.name}</h1>
                                <div className='mid-top-ul'>
                                    {/* <div style={{width:"40%"}}></div> */}
                                    <li>
                                        <span className="bold" style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                                            {
                                                detail.vote_average > 5 ?
                                                    <FavoriteIcon style={{ color: "red", fontSize: "19px" }} />
                                                    :
                                                    <HeartBrokenIcon style={{ color: "grey", fontSize: "19px" }} />
                                            }
                                            {Math.round(detail.vote_average * 10)}%</span>
                                        <span className="dull">{detail.vote_count} votes</span>
                                    </li>
                                    <li>
                                        <span className="bold">{detail.popularity}</span>
                                        <span className="dull">popularity</span>
                                    </li>
                                    <li>
                                        <span className="bold" style={{ fontVariant: "small-caps" }}>{detail.original_language}</span>
                                        <span className="dull">language</span>
                                    </li>
                                    <li>
                                        <span className="bold">{detail.status}</span>
                                        <span className="dull">status</span>
                                    </li>
                                </div>

                            </div>
                        </div>
                        <div className='mid'>
                            <div className='mid-left'>
                                <img
                                    src={detail.poster_path ? (`${api.poster}${detail.poster_path}`) : (notFound)} alt="">
                                </img>
                                <div className="tagline">{detail.tagline}</div>




                            </div>
                            <div className='mid-right'>

                                <div className='display'>
                                    <div className="data-overview">
                                        <ul className='mid-bot-ul'>
                                            {
                                                props.type === "tv" ?
                                                    (<>
                                                        <li>
                                                            <span className="bold">First Air Date:</span>
                                                            <span className="dull">{detail.first_air_date}</span>
                                                        </li>
                                                        <li>
                                                            <span className="bold">Runtime:</span>
                                                            {detail.episode_run_time && detail.episode_run_time.length !== 0 ?
                                                                (<span className="dull">{detail.episode_run_time[0]} min/ep</span>) :
                                                                detail.last_episode_to_air ?
                                                                    (<span className="dull">{detail.last_episode_to_air.runtime} min/ep</span>) : (<></>)
                                                            }
                                                        </li>
                                                        <li>
                                                            <span className="bold">Episodes:</span>
                                                            <span className="dull">{detail.number_of_episodes}</span>
                                                        </li>
                                                    </>
                                                    ) :
                                                    <>
                                                        <li>
                                                            <span className="bold">Release Date:</span>
                                                            <span className="dull">{detail.release_date}</span>
                                                        </li>
                                                        <li>
                                                            <span className="bold">Runtime:</span>
                                                            <span className="dull">{detail.runtime}min</span>
                                                        </li>
                                                    </>
                                            }
                                            {detail.budget ?
                                                (
                                                    <li>
                                                        <span className="bold">Budget:</span>
                                                        <span className="dull">${detail.budget / 1000000}M</span>
                                                    </li>
                                                ) : <></>}
                                            {
                                                detail.genres && detail.genres.length > 0 ?
                                                    <li>
                                                        <span className="bold">Genre:</span>
                                                        <span className="dull">{detail.genres[0].name}</span>
                                                    </li> : <></>
                                            }
                                        </ul>
                                        <div>
                                            {detail.overview}
                                        </div>
                                    </div>
                                    <div className="options">
                                        <div className="posterOp">
                                            <img
                                                src={detail.poster_path ? (`${api.poster}${detail.poster_path}`) : (notFound)} alt="">
                                            </img>
                                            <div className="tagline">{detail.tagline}</div>
                                        </div>
                                        <div className="operation">
                                            {

                                            }
                                            <button name="favorites" id='hist' onClick={(e) => { add(e.target.name, detail.id) }}>ADD TO FAVOURITES</button>
                                            <button name="completed" id='coll' onClick={(e) => { add(e.target.name, detail.id) }}>ALREADY WATCHED ?</button>
                                            <button name="planned" id='watc' onClick={(e) => { add(e.target.name, detail.id) }}>ADD TO WATCHLIST</button>
                                            {
                                                provider && <div style={{ paddingTop: "1rem", fontWeight: "bold" }}>Watch On</div>
                                            }
                                            <div className="provider">
                                                {
                                                    provider && provider.map((item) => {
                                                        return (
                                                            <img src={`https://image.tmdb.org/t/p/original/${item.logo_path}`} alt="" />
                                                        )
                                                    }
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                            <h2>Watch Now</h2>
                            
                            <div className="vid">
                            <iframe id="vidsrc"
                                src={source}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                title="vidsrc"
                                />
                            </div>

                        
                        <div className="other_info">

                            <div className='recommend'>
                                {
                                    recommendations && recommendations.length > 0 &&
                                    <h1 className="tag">Recommended</h1>
                                }
                                <div className="listContainer">
                                    {
                                        recommendations && recommendations.map((item) => {
                                            return (
                                                <List key={item.id} id={item.id} type={props.type} title={item.title || item.name} poster={item.poster_path} />
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <div className='cast'>
                                {cast && cast.length > 0 &&
                                    <h1 className="tag">Cast</h1>
                                }
                                <div className="listContainer">
                                    {cast && cast.map((item) => {
                                        return (
                                            <List key={item.id} id={item.id} type="person" title={item.title || item.name} poster={item.profile_path} char={item.character} />
                                        )
                                    })
                                    }
                                </div>
                            </div>

                            <div className='similar'>
                                {
                                    similar && similar.length > 0 &&
                                    <h1 className="tag">Similar {props.type === "tv" ? "TV Shows" : "Movies"}</h1>
                                }
                                <div className="listContainer">
                                    {
                                        similar && similar.map((item) => {
                                            return (
                                                <List key={item.id} id={item.id} type={props.type} title={item.title || item.name} poster={item.poster_path} />
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </>
                    :
                    <Loader />
            }
        </Layout>
    )
}

export default DetailPage;