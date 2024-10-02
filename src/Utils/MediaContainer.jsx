import React, { useRef, useState } from "react";
import "./Utils.css";
import { Link } from "react-router-dom";
import NotFound from "../Images/notFound.png";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const MediaContainer = (props) => {

    //  Variables
    const data = props.item;
    const poster = data.poster_path;
    const animate = useRef(null);


    // Animating using gsap 
    const { contextSafe } = useGSAP({scope: animate});
    const tween = gsap.to(animate.current, {
        scale: 1.1,
        duration: 0.3,
        ease: "power2.out",
    });
    tween.pause();
    
    const hoverIn = contextSafe(() => {
        tween.play();
    });

    const hoverOut = contextSafe(() => {
        tween.reverse();
    });



    return (
        <div className="listContent" ref={animate} onMouseEnter={hoverIn} onMouseLeave={hoverOut}>

            <Link to={`/${props.type || data.media_type}/${data.id}`}>
                {
                    poster ?
                        <img src={`https://image.tmdb.org/t/p/w500${data.poster_path}`} alt={data.title} loading="lazy" className="poster-image" />
                        :
                        <div className="no-poster">
                            <img src={NotFound} alt="No Poster" className="blur-image poster-image " />
                            <div className="poster-name">
                                {data.title || data.name}
                            </div>
                        </div>
                }
            </Link>
        </div>
    );
}

export default MediaContainer;