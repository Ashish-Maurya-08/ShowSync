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
      <Route path='/' element={<MoviesPage type="all"/>}/>
        <Route path='/movies' element={<MoviesPage type="movie"/>}/>
        <Route path='/tvshows' element={<MoviesPage type="tv"/>}/>
        <Route path='/movie/:id' element={<DetailPage type="movie"/>}/>
        <Route path='/tv/:id' element={<DetailPage type="tv"/>}/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
