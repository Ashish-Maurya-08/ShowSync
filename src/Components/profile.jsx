import userContext from "../context/userData"
import { useContext, useEffect, useState } from "react";
import { Button } from "@mui/material";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GetList } from "./api/server";
import List from "./List";
import './profile.css'
import Loader from "../Layout/Loader";
import Layout from "../Layout/Layout";


const Profile = (props) => {

    // variables

    const data = useContext(userContext);
    const navigate = useNavigate();
    const [lists, setLists] = useState(null);
    const [update, setUpdate] = useState(false);
    const [hasList, setHasList] = useState(true);
    const [isLoading,setLoad]=useState(false);
    // const [friends, setFriends] = useState(null);

    // get lists
    async function getLists() {
        if (data) {
            console.log(data);
            await GetList(data.userId).then((res) => {
                if (!res) {
                    localStorage.removeItem("data");
                    props.setToken(null);
                    alert("Session expired, Please login to continue");
                    navigate('/login')
                }
                if (res.lists) {
                    setLists(res.lists)
                    setHasList(true);
                }
                else {
                    console.log("no lists");
                    setHasList(false);
                }
            })
            .catch((err) => {
                console.log(err);
            })
        }
        setLoad(false);
    }



    useEffect(() => {
        setLoad(true);
        getLists();
    }, [update, data])

    useEffect(() => {
        setLists(null);
    }, [update])

    // logout

    const logout = () => {
        console.log("logout");
        localStorage.removeItem("data");
        props.setToken(null);
        props.setUser(null);
        navigate('/');
    }

    // function showFriends() {
    //     getFriends().then((res) => {
    //         console.log(res);
    //     })
    // }




    return (
        <Layout>
        <div className="profile_page">
            <div className="profile_nav">
                <h1>Welcome, {data.user}</h1>
                <div >
                    {/* <Button variant='contained' color="success" onClick={showFriends} style={{ margin: "0 2rem" }}>Friends</Button> */}
                    <Button variant='contained' onClick={logout}>Logout</Button>
                </div>
            </div>
            {
                lists ? Object.keys(lists).map((key) => {
                    if (lists[key].length === 0) {
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
                                    lists[key].map((list) => (
                                        <List id={list} type={key} update={update} setUpdate={setUpdate} />
                                    ))
                                }
                            </div>
                        </>
                    )
                }

                )
                :
                isLoading?<Loader/>:
                <h3>
                 No List Found
                </h3>


            }
        </div>
        </Layout>
    );
}

export default Profile;