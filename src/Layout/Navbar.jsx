import React, { useContext, useState , useRef } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import userContext from "../context/userData";

const NavBar = (props) => {

  const data = useContext(userContext);

  const cardRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };


  return (
    <div className="navSpace">
    <div className="navContainer" ref={cardRef}
      onMouseMove={handleMouseMove}
      style={{
        '--mouse-x': `${mousePosition.x}px`,
        '--mouse-y': `${mousePosition.y}px`,
      }}>
      <div className="navbar">
        <div className="hover"><Link to="/search">Browse</Link></div>
        <div className="logo_placeholder"></div>
        {
          data.user ? <div className="hover"><Link to="/profile">{data.user}</Link></div> :
          <div className="hover"><Link to="/login">Login</Link></div>
        }
      </div>
      <div className="main_logo"><Link to="/">ShowSync</Link></div>
    </div>
    </div>
  );
};

export default NavBar;
