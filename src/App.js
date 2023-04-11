import './App.css';
import Navbar from './Components/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MoviesPage from './Components/MoviesPage';
import DetailPage from './Components/DetailPage';

function App() {

  return (
    <div className="App">
    <BrowserRouter>
    <Navbar/>
      <Routes>
      <Route path='/' element={<MoviesPage type="all" page="main"/>}/>
        <Route path='/movies' element={<MoviesPage type="movie" page="popular_movies"/>}/>
        <Route path='/tvshows' element={<MoviesPage type="tv" page="trending_tvshows"/>}/>
        <Route path='/upcoming' element={<MoviesPage page="upcoming" type="movie"/>}/>
        <Route path='/movie/:id' element={<DetailPage type="movie"/>}/>
        <Route path='/tv/:id' element={<DetailPage type="tv"/>}/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
