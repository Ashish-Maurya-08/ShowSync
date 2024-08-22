import NavBar from "./Navbar";
const Layout = (props) => {
    return (
        <div style={{color:"white"}}>
        <NavBar/>
        <main className="Children">{props.children}</main>
        </div>
    );
}

export default Layout;