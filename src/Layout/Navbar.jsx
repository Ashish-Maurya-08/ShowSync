import React, { useContext, useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import userContext from "../context/userData";




const NavBar = (props) => {

  const [menu,setmenu] = useState("hide");

  const data=useContext(userContext);

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
function hideMenu(){
if(menu=="show"){
setmenu("hideAni");
      setTimeout(()=>{
        setmenu("hide");
      },400)
}

}



  return (
    <div className="navContainer">
      <div className="navbar hideMobile" >
      <div style={{visibility:"hidden"}}>
      {data.user}
      </div>
      <div className="mainNav">
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
      <div>
          {data.user?
          <Link to="/profile" className="login">{data.user}</Link>
          :
          <Link to="/login" className="login">Login</Link>}
      </div>
      </div>



      <div className="navbar showMobile">
        <div>
          <Link to="/search"><SearchIcon /></Link>
        </div>
        <div>
          <Link to="/" className="showsync" onClick={hideMenu}>ShowSync</Link>
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
        <div>
        {data.user?
          <Link to="/profile" className="login">{data.user}</Link>
          :
          <Link to="/login" className="login">Login</Link>}
        </div>
      </div>
    </div>
  );
};

export default NavBar;

