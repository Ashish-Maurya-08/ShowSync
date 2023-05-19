import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MoviesPage from './Components/MoviesPage';
import DetailPage from './Components/DetailPage';
import Search from "./Components/Search";
import Login from './Auth/Login';
import SignUp from './Auth/Signup';
import { Button } from '@mui/material';
import userContext from './context/userData';
import Profile from './Components/profile';
import User from './Components/user';


function App() {

  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

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
          <Route path='/movie/:id' element={<DetailPage type="movie" />} />
          <Route path='/tv/:id' element={<DetailPage type="tv" />} />
          <Route path='/person/:id' element={<DetailPage type="person" />} />
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
