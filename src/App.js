import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MoviesPage from './Components/MoviesPage';
import DetailPage from './Components/DetailPage';
import Search from "./Components/Search";
import Login from './Auth/Login';
import SignUp from './Auth/Signup';
import userContext from './context/userData';
import Profile from './Components/profile';
import User from './Components/user';
import { verifyUser } from './Components/api/server';
import Person from './Components/Person';


function App() {
  
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [userId, setUserId] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);

    const verify = async () => {
      try{
        const res = await verifyUser();
        if(res){
          // console.log(res);
        }
        else{
          localStorage.removeItem("data");
        }
      }
      catch(err){
        console.log(err);
      }

    }
  useEffect(() => {
    verify();
  }, [token])
  verify();


  useEffect( () => {
    const getToken = () => {
      const tokenRes =  localStorage.getItem("data");
      if (tokenRes) {
        const parsedToken = JSON.parse(tokenRes);
        setToken(parsedToken.token);
        setUser(parsedToken.name);
        setUserId(parsedToken.userId);
        setLoggedIn(true);
      }
    }
    getToken();
  }, [token])

  useEffect(() => {
    if (token) {
      setLoggedIn(true);
    }
    else{
      setLoggedIn(false);
    }
  }, [token])
  


  

  

  return (
    <userContext.Provider value={{user:user,token:token,userId:userId}}>
    <div className="App">
      <BrowserRouter>
        {/* <Navbar /> */}
        <Routes>
          <Route path='/' element={<MoviesPage type="all" page="main"/>} />
          <Route path='/movies' element={<MoviesPage type="movie" page="movies"/>} />
          <Route path='/tvshows' element={<MoviesPage type="tv" page="tvshows" />} />
          <Route path='/upcoming' element={<MoviesPage page="upcoming" type="movie" />} />
          <Route path="/search" element={<Search />} />
          <Route path='/movie/:id' element={<DetailPage type="movie"  setToken={setToken}/>} />
          <Route path='/tv/:id' element={<DetailPage type="tv" setToken={setToken}/>} />
          <Route path='/person/:id' element={<Person/>} />
          <Route path='/user/:id' element={<User />} />
          <Route path='/login' element={<Login setToken={setToken} token={token} loggedIn={loggedIn}/>}  />
          <Route path='/signup' element={<SignUp token={token} />} />
          <Route path='/profile' element={<Profile setToken={setToken} setUser={setUser} loggedIn={loggedIn}/>}/>
        </Routes>
      </BrowserRouter>
    </div>
    </userContext.Provider>
  );
}

export default App;
