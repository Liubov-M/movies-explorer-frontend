import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Header/Header';
import Main from './Main/Main';
import Footer from './Footer/Footer';
import NotFound from './NotFound/NotFound';
import Login from './Login/Login';
import Register from './Register/Register';
import Profile from './Profile/Profile';
import Movies from './Movies/Movies'
import SavedMovies from './SavedMovies/SavedMovies'
import SearchForm from './Movies/SearchForm/SearchForm'

function App() {
  const [loggedIn, setLoggedIn] = useState(false)

  return (
    <div className='page'>
      <Routes>
        <Route path='/signin' element={
          <Login setLoggedIn={setLoggedIn}/>
        } />

        <Route path='/signup' element={
          <Register setLoggedIn={setLoggedIn}/>
        } />

        <Route path='/' element={
          <>
            <Header loggedIn={loggedIn}/>
            <Main />
            <Footer />
          </>
        } />

        <Route path='/movies' element={
          <>
            <Header />
            <SearchForm />
            <Movies />
            <Footer />
          </>
        } />

        <Route path='/saved-movies' element={
          <>
            <Header />
            <SearchForm />
            <SavedMovies />
            <Footer />
          </>
        } />

        <Route path='/profile' element={
          <>
            <Header />
            <Profile setLoggedIn={setLoggedIn}/>
          </>
        } />

        <Route path='*' element={
            <NotFound />
        } />
      </Routes>
    </div>
  )
}

export default App;
