import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded";
import ArrowForwardRounded from "@mui/icons-material/ArrowForwardRounded";
import { IconButton } from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import MediaContainer from "./MediaContainer";
import "./Utils.css";
import { BACKEND_URL } from "./Constants";

const ContentRows = (props) => {

    

    // Variables 
    const [data, setData] = useState([]);
    const [scrollSize, setScrollSize] = useState(0);
    const ScrollRef = useRef(null);
    const apiURL = BACKEND_URL;

    // Changing the scroll size when the window is resized
    useEffect(() => {
        const Current = ScrollRef.current;
        const observer = new ResizeObserver(entries => {
            setScrollSize(entries[0].contentRect.width - 100);
        })
        observer.observe(Current)
        return () => Current && observer.unobserve(Current)
    }, [])


    // Getting the data from the API
    useEffect(() => {
        fetchData();
    }, []);



    // handling the scroll button
    const Scroll = (offset) => {
        if (ScrollRef.current) {
            ScrollRef.current.scrollLeft += offset;
        }
    }

    // fetching the data from the API
    const fetchData = async () => {
        axios.get(`${apiURL}/${props.list?.link}`)
        .then((response) => {
                setData(response.data);
            })
        .catch((error) => {
                console.log(error);
            })
    }
    


    return (
        <div className="content">
            <div className="head">
                <div className="listTitle">{props.list?.title}</div>
                <div className="icons">
                    <IconButton onClick={() => Scroll(-scrollSize)}>
                        <ArrowBackRounded />
                    </IconButton>
                    <IconButton onClick={() => Scroll(scrollSize)}>
                        <ArrowForwardRounded />
                    </IconButton>
                </div>
            </div>
            <div className="list" ref={ScrollRef} >
                { data.results && data.results.map((item) => (
                    <MediaContainer key={item.id} item={item} type={props.list?.type} />
                ))}
            </div>
        </div>
    );
};

export default ContentRows;
