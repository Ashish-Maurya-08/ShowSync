import React, {useRef, useState} from "react";
import "./Utils.css";
import { Link } from "react-router-dom";
import NotFound from "../Images/notFound.png";

const MediaContainer = (props) => {
    const data = props.item;
    const poster = data.poster_path;
    const glow = useRef(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        const rect = glow.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      };
    

    return (
        <div className="listContent" ref={glow} onMouseMove={handleMouseMove} style={{
            '--mouse-x': `${mousePosition.x}px`,
            '--mouse-y': `${mousePosition.y}px`,
          }}>
        
            <Link to={`/${props.type || data.media_type }/${data.id}`}>
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