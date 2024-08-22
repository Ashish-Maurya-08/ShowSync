import React from "react";
import "./Utils.css";
import { Link } from "react-router-dom";

const MediaContainer = (props) => {
    const data = props.item;

    return (
        <div className="listContent">
        {
            data.poster_path &&
            <Link to={`/${props.type || data.media_type }/${data.id}`}>
            <img src={`https://image.tmdb.org/t/p/w500${data.poster_path}`} alt={data.title} />
            </Link>
        }
        </div>
    );
}

export default MediaContainer;