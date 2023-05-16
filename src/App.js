import './App.css';
import { useEffect, useState } from 'react';
import Navbar from './Components/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MoviesPage from './Components/MoviesPage';
import DetailPage from './Components/DetailPage';
import Search from "./Components/Search";
import Login from './Auth/Login';
import SignUp from './Auth/Signup';
import { Button } from '@mui/material';


function App() {

  const [token, setToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(JSON.parse(token));
    }
  }, [token])



  return (
    <div className="App">
      <BrowserRouter>
        {/* <Navbar /> */}
        <Routes>
          <Route path='/' element={<MoviesPage type="all" page="main" />} />
          <Route path='/movies' element={<MoviesPage type="movie" page="movies" />} />
          <Route path='/tvshows' element={<MoviesPage type="tv" page="tvshows" />} />
          <Route path='/upcoming' element={<MoviesPage page="upcoming" type="movie" />} />
          <Route path="/search" element={<Search />} />
          <Route path='/movie/:id' element={<DetailPage type="movie" />} />
          <Route path='/tv/:id' element={<DetailPage type="tv" />} />
          <Route path='/login' element={<Login setToken={setToken} token={token}/>} />
          <Route path='/signup' element={<SignUp token={token} />} />
        </Routes>
      </BrowserRouter>
      {token ? 
      <Button variant='contained' onClick={() => { localStorage.removeItem("token"); setToken(null) }}>Logout</Button>
      : null
      }
    </div>
  );
}

export default App;
