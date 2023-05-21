import React, { useEffect,useState } from 'react';
import { getDetail, getUser } from './api/server';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import List from './List';


const User =(props)=>{
    const id=useParams().id;
    const navigate=useNavigate();
    const [data,setData]=useState(null);
    const [user,setUser]=useState(null);
    const [hasList, setHasList] = useState(true);

    useEffect(()=>{
    getUser(id).then((res)=>{
        console.log(res);
        if(!res){

            navigate("/");
        }
        if(res.data){
            setData(res.data.lists);
        }
        else{
            setHasList(false);
        }
    })
    getDetail(id).then((res)=>{
        if(res){
            setUser(res);
        }
        else{
            navigate("/");
        }
    })
    },[])

    return(
        <div className="profile_page">
        <div className="profile_nav">
        {
            user ?
            <h1>{user.name}</h1>
            :
            <h1>User</h1>
        }
        </div>
        {
                !hasList ? <h2 className="empty">List is Empty</h2> : <></>
            }
        {
            data && Object.keys(data).map((key) => {
                if (data[key].length === 0) {
                    return (
                        <div className="empty">
                        </div>
                    )
                }
                return (
                    <>
                        <div className="tag">{key}</div>
                        <div className="listContainer">
                            {
                                data[key].map((list) => (
                                    <List id={list} type={key} page="user"/>
                                ))
                            }
                        </div>
                    </>
                )
            }

            )

        }
    </div>
    )

}

export default User;