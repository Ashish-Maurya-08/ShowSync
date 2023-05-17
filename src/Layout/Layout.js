import NavBar from "./Navbar";
const Layout = (props) => {
    return (
        <div>
        <NavBar/>
        <main className="Content">{props.children}</main>
        </div>
    );
}

export default Layout;