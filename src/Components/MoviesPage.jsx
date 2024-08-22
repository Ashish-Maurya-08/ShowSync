import React, { useEffect, useState } from "react";
// import './Container.css';
import Layout from "../Layout/Layout";
import Loader from "../Layout/Loader";

import Arrowleft from "../icons/left-arrow.png"
import Arrowright from "../icons/arrow-right.png"


const MoviesPage = (props) => {

    const [data, setdata] = useState(null);
    const [page, setPage] = useState(1);
    const [isLoading, setLoad] = useState(true);


    return (
        <Layout>
            <div className="full_page" id="scroll">
                <div className="content">
                    <div className="popular">
                        <div className="head">
                            <div className="listTitle">Popular</div>
                            <div className="icons">
                                <img src={Arrowleft} alt="" />
                                <img src={Arrowright} alt="" />
                            </div>
                        </div>
                        <div className="list"></div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default MoviesPage;
