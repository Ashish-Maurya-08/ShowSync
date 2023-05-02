import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';




const NavBar = () => {

  const [menu,setmenu] = useState("hide");

  function toggleMenu() {
    if(menu==="hide"){
      setmenu("show");
    }
    else{
      setmenu("hideAni");
      setTimeout(()=>{
        setmenu("hide");
      },400)
    }
  }
  console.log(menu);

  return (
    <div className="navContainer">
      <div className="navbar hideMobile">
        <div>
          <Link to="/search" className="hover">Search</Link>
        </div>
        <div>
          <Link to="/movies" className="movies hover">Movies</Link>
        </div>
        <div>
          <Link to="/" className="showsync">ShowSync</Link>
        </div>
        <div>
          <Link to="/tvshows" className="hover">Shows</Link>
        </div>
        <div>
          <Link to="/upcoming" className="hover">Upcoming</Link>
        </div>
      </div>



      <div className="navbar showMobile">
        <div>
          <Link to="/search"><SearchIcon /></Link>
        </div>
        <div>
          <Link to="/" className="showsync">ShowSync</Link>
        </div>
        <div style={{ color: "white " }} onClick={toggleMenu}>
          <MenuIcon color="white"/>
        </div>
      </div>
      <div className={`dropMenu ${menu}`}>
        <div>
          <Link to="/movies" className="movies" onClick={toggleMenu}>Movies</Link>
        </div>
        <div>
          <Link to="/tvshows" onClick={toggleMenu}>Shows</Link>
        </div>
        <div>
          <Link to="/upcoming" onClick={toggleMenu}>Upcoming</Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;

