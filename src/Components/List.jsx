import {getDetail} from './api/functions'
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './profile.css'
import { Link } from 'react-router-dom';
import { removeFromList,setWatched } from './api/server';

function List(props) {

  const [detail, setDetail] = useState([]);
  const type=props.id.mediaType;
  const id=props.id.mediaId;
  const navigate=useNavigate();

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
        if (!res) {
          localStorage.removeItem("data");
          props.setToken(null);
          alert("Session expired, Please login to continue");
          navigate('/login')
        }
        if (res === 201) {
          props.setUpdate(!props.update);
        }
      }) 
  }
  async function watched() {
    await setWatched(id,type)
      .then((res) => {
        if (!res) {
          localStorage.removeItem("data");
          props.setToken(null);
          alert("Session expired, Please login to continue");
          navigate('/login')
        }
        if (res === 201) {
          props.setUpdate(!props.update);
        }
      })
  }

  return (
    <div className='list_items'>
      <div className='imageContainer'>
        <Link to={`/${type}/${id}`}><img src={`https://image.tmdb.org/t/p/w500${detail.poster_path}`} alt={detail.title} /></Link>
      </div>
      <div className='title'>{detail.name || detail.title}</div>
      {
        props.page==='user' ? <></>:
      <div className='buttons'>
        <button className='showHover' onClick={removeList}>Remove</button>
        {
          props.type==='planned' ? <button className='showHover' style={{backgroundColor:"lightgreen"}} onClick={watched}>Watched</button> : <></>
        }
      </div>
      }
    </div>
  );
}

export default List;