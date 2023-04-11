import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";




const NavBar = () => {

  function handleScroll(e) {
    console.log("Scroll");
  }

  window.addEventListener("navContainer",handleScroll)

  return (
    <div className="navContainer">
      <div className="navbar">
        <div>
          <Link to="/search" className="search hover">Search</Link>
        </div>
        <div>
          <Link to="/movies" className="movies hover">Movies</Link>
        </div>
        <div>
          <Link to="/" className="showsync">ShowSync</Link>
        </div>
        <div>
          <Link to="/tvshows" className="shows hover">Shows</Link>
        </div>
        <div>
          <Link to="/upcoming" className="upcoming hover">Upcoming</Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;

