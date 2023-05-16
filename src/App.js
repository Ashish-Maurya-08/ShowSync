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
import Proflie from './Components/profile';


function App() {

  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect( () => {
    const getToken = async () => {
      const tokenRes = await localStorage.getItem("data");
      if (tokenRes) {
        const parsedToken = JSON.parse(tokenRes);
        setToken(parsedToken.token);
        setUser(parsedToken.name);
      }
    }
    getToken();
  }, [token])

  

  return (
    <userContext.Provider value={{user:user,token:token}}>
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
          <Route path='/login' element={<Login setToken={setToken} token={token}/>} />
          <Route path='/signup' element={<SignUp token={token} />} />
          <Route path='/profile' element={<Proflie/>}/>
        </Routes>
      </BrowserRouter>
      {token ? 
      <Button variant='contained' onClick={() => { localStorage.removeItem("data"); setToken(null);setUser(null) }}>Logout</Button>
      : null
      }
    </div>
    </userContext.Provider>
  );
}

export default App;
