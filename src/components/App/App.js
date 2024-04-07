import React from 'react';
import { Route, Routes } from "react-router-dom"; 
import './App.css'; 
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import PageNotFound from '../PageNotFound/PageNotFound';

function App() {

  const [loggedIn] = React.useState(true);

  return (
    <div className="page">
      <div className="App">
        <Routes>
          <Route path="/" element={<Main isLogged={loggedIn}/>} />
          <Route path="/movies" element={<Movies isLogged={loggedIn}/>} />
          <Route path="/saved-movies" element={<SavedMovies isLogged={loggedIn}/>} />
          <Route path="/signup" element={<Register />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
