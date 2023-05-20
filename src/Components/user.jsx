import React, { useEffect,useState } from 'react';
import { getUser } from './api/server';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import List from './List';


const User =(props)=>{
    const id=useParams().id;
    const navigate=useNavigate();
    const [data,setData]=useState(null);

    useEffect(()=>{
    getUser(id).then((res)=>{
        console.log(res);
        if(!res){
            navigate("/");
        }
        if(res.data){
            setData(res.data.lists);
        }
    })
    },[])

    return(
        <div className="profile_page">
        <div className="profile_nav">
            <h1>User</h1>
        </div>
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