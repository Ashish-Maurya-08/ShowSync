import React from 'react';
import { getUser } from './api/server';
import { useParams } from 'react-router-dom';


const User =(props)=>{
    const id=useParams().id;

    getUser(id).then((res)=>{
        console.log(res);
    })

    return(
        <div>
            <h1>User</h1>
        </div>
    )

}

export default User;