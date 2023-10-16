import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import CurrentUserContext from '../contexts/CurrentUserContext';
import ProtectedRoute from './ProtectedRoute';
import './App.css';
import Header from './Header/Header';
import Main from './Main/Main';
import Footer from './Footer/Footer';
import NotFound from './NotFound/NotFound';
import Login from './Login/Login';
import Register from './Register/Register';
import Profile from './Profile/Profile';
import Movies from './Movies/Movies';
import SavedMovies from './SavedMovies/SavedMovies';
import Preloader from './Preloader/Preloader'
import mainApi from '../utils/MainApi'

function App() {
  const navigate = useNavigate()
  const [currentUser, setCurrentUser] = useState({})
  const [moviesList, setMoviesList] = useState([])
  const [isError, setIsError] = useState(false)
  const [responseMessage, setResponseMessage] = useState('')
  const [isEdit, setIsEdit] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (localStorage.jwt) {
      Promise.all([mainApi.getUserInfo(localStorage.jwt), mainApi.getMovies(localStorage.jwt)])
        .then(([dataUser, dataMovies]) => {
          setCurrentUser(dataUser)
          setMoviesList(dataMovies)
          setLoggedIn(true)
          setIsLoading(false)
        })
        .catch((err) => {
          console.error(`Ошибка загрузки данных ${err}`)
          setIsLoading(false)
          localStorage.clear()
        })
    } else {
      setLoggedIn(false)
      setIsLoading(false)
      localStorage.clear()
    }
  }, [loggedIn])

  function onLogin(email, password) {
    mainApi.login(email, password)
      .then((res) => {
        if(res.token)
          localStorage.setItem('jwt', res.token)
          setLoggedIn(true)
          navigate('/movies')
      })
      .catch((err) => {
          setIsError(true)
          setResponseMessage(`Ошибка авторизации ${err}`);
          console.log(`Ошибка авторизации ${err}`)
      })
  }

  function onRegister(username, email, password) {
    mainApi.register(username, email, password)
      .then((res) => {
        if(res) {
          setLoggedIn(false)
          onLogin(email, password)
        }
      })
      .catch((err) => {
        setIsError(true)
        setResponseMessage(`Ошибка регистрации ${err}`);
        console.log(`Ошибка регистрации ${err}`)
      })
  }

  function handleUpdateUser(username, email) {
    mainApi.setUserInfo(username, email, localStorage.jwt)
      .then((res) => {
        setCurrentUser(res);
        setIsEdit(false)
      })
      .catch((err) => {
        console.log(err)
        setIsError(true)
        setResponseMessage(`Ошибка при внесении данных пользователя, ${err}`);
        console.log(`Ошибка при внесении данных пользователя, ${err}`)
      })
  }

  function handleToggleSelectMovie(data) {
    const isAddMovie = moviesList.some(item => data.id === item.movieId);
    const toggleMovie = moviesList.filter((item) => {return item.movieId === data.id})
    if(isAddMovie) {
      handleMovieDelete(toggleMovie[0]._id)
    } else {
      mainApi.addMovie(data, localStorage.jwt)
      .then((res) => {
        setMoviesList([res, ...moviesList])
      })
      .catch((err) => {
        console.log(`Ошибка в блоке выбора фильма, ${err}`)
      })}
  }

  function handleMovieDelete(movieId) {
    mainApi.deleteMovie(movieId, localStorage.jwt)
      .then(() => {
        setMoviesList(moviesList.filter(item => {return item._id !== movieId}));
      })
      .catch((error) => {
        console.log(`Ошибка при удалении фильма, ${error}`)
      })
  }

  return (
    <div className='page'>
      {isLoading ? <Preloader /> :
        <CurrentUserContext.Provider value={currentUser}>
            <Routes>
              <Route path='/signin' element={
                <Login onLogin={onLogin}
                  isError={isError}
                  setIsError={setIsError}
                  responseMessage={responseMessage}
                  setLoggedIn={setLoggedIn}/>
              } />

              <Route path='/signup' element={
                <Register onRegister={onRegister}
                  isError={isError}
                  setIsError={setIsError}
                  responseMessage={responseMessage}
                  setLoggedIn={setLoggedIn}/>
              } />

              <Route path='/' element={
                <>
                  <Header loggedIn={loggedIn}/>
                  <Main />
                  <Footer />
                </>
              } />

              <Route path='/movies' element={<ProtectedRoute
                element={Movies}
                moviesList={moviesList}
                setIsError={setIsError}
                isError={isError}
                addMovie={handleToggleSelectMovie}
                loggedIn={loggedIn}
                />
              }/>

              <Route path='/saved-movies' element={<ProtectedRoute
                element={SavedMovies}
                moviesList={moviesList}
                setIsError={setIsError}
                onDelete={handleMovieDelete}
                loggedIn={loggedIn}
                />
              }/>

              <Route path='/profile' element={<ProtectedRoute
                element={Profile}
                isError={isError}
                setIsError={setIsError}
                responseMessage={responseMessage}
                isEdit={isEdit}
                setIsEdit={setIsEdit}
                loggedIn={loggedIn}
                setLoggedIn={setLoggedIn}
                onUpdateUser={handleUpdateUser}
                />
              }/>

              <Route path='/*' element={
                  <NotFound />
              } />
            </Routes>
        </CurrentUserContext.Provider>
      }
    </div>
  )
}

export default App;
