
import "./Container.css";
import { Link } from "react-router-dom";


const MoviesContainer = (props) => {
  let title = props.movie.title;
  if(!props.movie.title){
    title=props.movie.name;
  }
  let path=props.movie.poster_path;
  if(props.page==="main"){
    path=props.movie.backdrop_path;
  }
  const movie={
      title:title,
      image:`https://image.tmdb.org/t/p/w500${path}`
  }

  let type=props.type;
  if(props.type==="all"){
    type=props.movie.media_type;
  }
  return (
    <div className="movies-container">
    <Link to={`/${type}/${props.movie.id}`}>
      <img  src={movie.image} alt={movie.title} />
    </Link>
    <Link to={`/${type}/${props.movie.id}`}>
      <div className="text-overlay">
        <div>{movie.title}</div>
      </div>
      </Link>
    </div>
  );
};

export default MoviesContainer;
