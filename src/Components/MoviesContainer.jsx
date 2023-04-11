import React, { useState } from "react";
import "./Container.css";
import { Link } from "react-router-dom";


const MoviesContainer = (props) => {
  let title = props.movie.title;
  if(!props.movie.title){
    title=props.movie.name;
  }

    const movie={
        title:title,
        image:`https://image.tmdb.org/t/p/original${props.movie.poster_path}`
    }
  return (

    <div className="movies-container">
    <Link to={`/${props.movie.media_type}/${props.movie.id}`}>
      <img src={movie.image} alt={movie.title} />
    </Link>
    <Link to={`/${props.movie.media_type}/${props.movie.id}`}>
      <div className="text-overlay">
        <div>{movie.title}</div>
      </div>
      </Link>
    </div>
  );
};

export default MoviesContainer;
