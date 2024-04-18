import React from 'react';
import { Route, Routes, useNavigate } from "react-router-dom"; 
import './App.css'; 
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import ProtectedRouteSign from '../ProtectedRouteSign/ProtectedRouteSign';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import mainApi from '../../utils/MainApi';
import Preloader from '../Preloader/Preloader';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import PageNotFound from '../PageNotFound/PageNotFound';

function App() {

  const [currentUser, setCurrentUser] = React.useState({
    name: "",
    email: "",
  });
  const [loggedIn, setLoggedIn] = React.useState(JSON.parse(localStorage.getItem('loggedIn')));
  const [isLoading, setIsLoading] = React.useState(false);
  const [onRegisterErr, setOnRegisterErr] = React.useState('');
  const [onLoginErr, setOnLoginErr] = React.useState('');
  const [onUpdateUserErr, setOnUpdateUserErr] = React.useState('');
  const navigate = useNavigate();

  React.useEffect(() => {
    if (loggedIn) {
      mainApi.getProfileInformation()
        .then((res) => {
          setCurrentUser(res);
        })
        .catch((err) => {
          console.log(err); 
        });
        setOnUpdateUserErr("");
    }
}, [loggedIn]);

  React.useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      mainApi.getToken(jwt)
        .then((res) => {
            setLoggedIn(true);
            localStorage.setItem('loggedIn', true);
            setCurrentUser(res);
        })
        .catch((err) => {
            console.log(err); 
        });
    }
  }, []);

  function onRegister(name, email, password) {
    setIsLoading(true);
    mainApi.register(name, email, password)
      .then((res) => {
        if (res) {
          onLogin(email, password);
          setOnRegisterErr('');
        }
      })
      .catch((e) => {
        console.log(e);
        if (e === "Ошибка: 409") {
          setOnRegisterErr("Такой email уже существует.");
        } else {
          setOnRegisterErr("При регистрации произошла ошибка.");
        }
      })
      .finally(() => setIsLoading(false));
  }

  function onLogin(email, password) {
    setIsLoading(true);
    mainApi.login(email, password)
      .then((data) => {
          localStorage.setItem("jwt", data.token);
          setLoggedIn(true);
          localStorage.setItem('loggedIn', true);
          navigate("/movies");
      })
      .catch((e) => {
        console.log(e);
        if (e === "Ошибка: 403") {
          setOnLoginErr("Передан некорректный токен.");
        } else if (e === "Ошибка: 400") {
          setOnLoginErr("Токен не передан.");
        } else if (e === "Ошибка: 401") {
          setOnLoginErr("Неправильные почта или пароль.");
        }
      })
      .finally(() => setIsLoading(false));
  }

  function handleUpdateUser(userInfo) {
    mainApi.changeProfileInformation(userInfo)
      .then((res) => {
        setCurrentUser(res);
        setOnUpdateUserErr("Данные профиля успешно изменены.");
      })
      .catch((e) => {
        console.log(e); 
        if (e === "Ошибка: 409") {
          setOnUpdateUserErr("Такой email уже существует.");
        } else {
          setOnUpdateUserErr("При обновлении произошла ошибка.");
        }
      })
  };

  function onSignOut() {
    localStorage.removeItem("jwt");
    localStorage.removeItem("allMovies");
    localStorage.removeItem('moviesReceived');
    localStorage.removeItem('moviesInputSearch');
    localStorage.removeItem('movies');
    localStorage.removeItem('moviesFilter');
    localStorage.removeItem('savedMovies');
    localStorage.removeItem('savedMoviesFilter');
    localStorage.removeItem('savedMoviesInputSearch');
    localStorage.removeItem('loggedIn');
    setLoggedIn(false);
    localStorage.setItem('loggedIn', false);
    setCurrentUser({
      name: "",
      email: "",
    });
    navigate("/");
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="App">
        {isLoading ? (
          <Preloader/>
          ) : (
          <Routes>
            <Route 
              path="/" 
              element={<Main loggedIn={loggedIn} />} 
            />
            <Route path="/movies" element = {
              <ProtectedRoute 
              component={Movies}
              loggedIn={loggedIn}
              />
            } />
            <Route path="/saved-movies" element = {
              <ProtectedRoute 
              component={SavedMovies} 
              loggedIn={loggedIn}
              />
            } />
            <Route path="/profile" element = {
              <ProtectedRoute 
              component={Profile} 
              loggedIn={loggedIn}
              handleUpdateUser={handleUpdateUser}
              onSignOut={onSignOut}
              onUpdateUserErr={onUpdateUserErr}
              />
            } />
            <Route path="/signup" element={
              <ProtectedRouteSign 
              component={Register}
              loggedIn={loggedIn}
              isLoading={isLoading} 
              onRegister={onRegister} 
              onRegisterErr={onRegisterErr}
              />
            } />
            <Route path="/signin" element={
              <ProtectedRouteSign 
              component={Login}
              loggedIn={loggedIn}
              isLoading={isLoading} 
              onLogin={onLogin} 
              onLoginErr={onLoginErr}
              />
            } />
            <Route 
              path="/*" 
              element={<PageNotFound />} 
            />
          </Routes>
        )}
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
