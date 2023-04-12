import axios from "axios";
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import './main.css'
import {getDetail} from "./api/functions"
import FavoriteIcon from '@mui/icons-material/Favorite';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';


const DetailPage=(props)=>{
    const {id}=useParams()
    console.log(id);

    const [detail,setDetail]=useState([]);

    const api={
        image:"https://image.tmdb.org/t/p/original/"
    }

    console.log(props.type);

    async function getDetails(){
        await getDetail(id,props.type)
        .then(result =>{
            setDetail(result)
        })
    } 

    useEffect(()=>{
        getDetails();
    },[props.type])


    console.log(detail);
    let title=detail.title;
    if(!title){
        title=detail.name;
    }

    const genre=detail.genres;
    const budget=detail.budget/1000000;

    return(
        <div>
        <div className='head-pic'>
        <img 
        src={`${api.image}${detail.backdrop_path}`} alt="Loading" >   
        </img>
        <div className="overlay-data">

        <h1>{title}</h1>
            <div className='mid-top-ul'>
            {/* <div style={{width:"40%"}}></div> */}


                <li>
                <span className="bold" style={{display:"flex",alignItems:"center",gap:"4px"}}>
                {
                    detail.vote_average>5?
                <FavoriteIcon style={{color:"red",fontSize:"19px"}} />
                :
                <HeartBrokenIcon style={{color:"grey",fontSize:"19px"}} />

                }
                 {Math.round(detail.vote_average*10)}%</span>
                <span className="dull">{detail.vote_count} votes</span>
                </li>
                <li>
                <span className="bold">{detail.popularity}</span>
                <span className="dull">popularity</span>
                </li>
                <li>
                <span className="bold" style={{fontVariant:"small-caps"}}>{detail.original_language}</span>
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
        src={`${api.image}${detail.poster_path}`} alt="">
        </img>
        <div className="tagline">{detail.tagline}</div>
        </div>
        <div className='mid-right'>
            
            <div className='display'>
            <div>
            <ul className='mid-bot-ul'>
            {
                props.type === "tv"?
                (<>
                <li>
                <span className="bold">First Air Date:</span>
                <span className="dull">{detail.first_air_date}</span>
                </li>
                <li>
                <span className="bold">Runtime:</span>
                {detail.episode_run_time!=0?
                (<span className="dull">{detail.episode_run_time} min/ep</span>):
                detail.last_episode_to_air?
                (<span className="dull">{detail.last_episode_to_air.runtime} min/ep</span>):(<></>)
                }
                </li>
                <li>
                <span className="bold">Episodes:</span>
                <span className="dull">{detail.number_of_episodes}</span>
                </li>
                </>
                ):
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
                {detail.budget?
                (
                    <li>
                    <span className="bold">Budget:</span>
                    <span className="dull">${budget}M</span>
                    </li>
                ):<></>}
                {
                    detail.genres?
                <li>
                <span className="bold">Genre:</span>
                <span className="dull">{genre[0].name}</span>
                </li>:<></>
                }
            </ul>
            <div style={{fontFamily:"Montserrat",color:"white",lineHeight:"30px"}}>
            {detail.overview}
            </div>
            </div>
            <div className="options">
                <button id='hist'>ADD TO FAVOURITES</button>
                <button id='coll'>ADD TO MY LIST</button>
                <button id='watc'>ADD TO WATCHLIST</button>
                <button id='comm'>ADD COMMENT</button>
            </div>
            </div>
            </div>
            </div>
        </div>
    )
}

export default DetailPage;