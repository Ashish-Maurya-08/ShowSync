import React from "react";
import Layout from "../../Layout/Layout";
import "./Home.css";
import ContentRows from "../../Utils/ContentRows";
import homeList from "../../Utils/homepage.json";

const Home = () => {

    

    return (
        <Layout>
            <div className="home-page">
            {
                homeList && Object.keys(homeList).map((item, index) => {
                    return (
                            <ContentRows list={homeList[item]} />
                    );
                })
            }
            </div>
        </Layout>
    );
};

export default Home;
