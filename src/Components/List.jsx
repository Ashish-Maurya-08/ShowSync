import {getDetail} from './api/functions'
import { useState,useEffect } from 'react';
import MoviesContainer from './MoviesContainer';
import './profile.css'
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { removeFromList } from './api/server';

function List(props) {

  const [detail, setDetail] = useState([]);
  const [update, setUpdate] = useState(false);
  const type=props.id.mediaType;
  const id=props.id.mediaId;

  async function getDetails() {
    await getDetail(props.id.mediaId, props.id.mediaType)
      .then(result => {
        setDetail(result)
      })
  }
  
  useEffect(() => {
    getDetails();
  }, [])
 

  async function removeList() {
    await removeFromList(props.type,id,type)
      .then((res) => {
        if (res === 201) {
          props.setUpdate(!props.update);
        }
      }) 
  }

  return (
    <div className='list_items'>
      {/* <MoviesContainer movie={detail} type={props.id.mediaType} /> */}
      <div className='imageContainer'>
        <Link to={`/${type}/${id}`}><img src={`https://image.tmdb.org/t/p/w500${detail.poster_path}`} alt={detail.title} /></Link>
      </div>
      <div className='title'>{detail.name || detail.title}</div>
      {
        props.page==='user' ? <></>:
      <div>
        <button className='showHover' onClick={removeList}>Remove</button>
      </div>
      }
    </div>
  );
}

export default List;