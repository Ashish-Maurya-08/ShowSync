import './profile.css'
import { Link } from 'react-router-dom';

function List(props) {
    const title=props.title;
    const poster=props.poster;
    const type=props.type;
    const id=props.id;

    if(!poster){
        return(
            <></>
        )
    }
  return (
    <div className='smallList'>
      <div className='imageContainer'>
        <Link to={`/${type}/${id}`}><img src={`https://image.tmdb.org/t/p/w500${poster}`} alt={title} /></Link>
      </div>
      <div className='title'>{title}</div>
      {
        props.char && <div style={{fontStyle:"oblique"}}>{props.char}</div>
      }
    </div>
  );
}

export default List;