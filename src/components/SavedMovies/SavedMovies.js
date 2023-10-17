import './SavedMovies.css';
import Header from '../Header/Header'
import SearchForm from '../Movies/SearchForm/SearchForm'
import Footer from '../Footer/Footer'
import { useCallback, useEffect, useState } from 'react';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';

export default function SavedMovies({ moviesList, setIsError, onDelete, isError }) {
  const [filterMovies, setFilterMovies] = useState(moviesList)
  const [searchMovie, setSearchMovie] = useState('')
  const [shortMovie, setShortMovie] = useState(false)
  const [firstEntrance, setFirstEntrance] = useState(true)

  const sortingMovies = useCallback((userSearch, shortMovie, movies) => {
    setSearchMovie(userSearch)
    setFilterMovies(movies.filter((movie) => {
      const searchRequest = movie.nameRU.toLowerCase().includes(userSearch.toLowerCase())
      return shortMovie ? (searchRequest && movie.duration <= 40) : searchRequest
    }))
  }, [])

  function searchMovies(userSearch) {
    setFirstEntrance(false)
    sortingMovies(userSearch, shortMovie, moviesList)
  }

  useEffect(() => {
    if (moviesList.length === 0) {
      setFirstEntrance(true)
    } else {
      setFirstEntrance(false)
    }
    sortingMovies(searchMovie, shortMovie, moviesList)
  }, [moviesList, sortingMovies, shortMovie, searchMovie])

  function changeShort() {
    if (shortMovie) {
      setShortMovie(false)
      setFirstEntrance(false)
      sortingMovies(searchMovie, false, moviesList)
    } else {
      setShortMovie(true)
      setFirstEntrance(false)
      sortingMovies(searchMovie, true, moviesList)
    }
  }

  return (
    <>
      <Header />
      <SearchForm
        moviesList={moviesList}
        changeShort={changeShort}
        searchMovies={searchMovies}
        searchMovie={searchMovie}
        shortMovie={shortMovie}
        firstEntrance={firstEntrance}
        setIsError={setIsError}
        isError={isError}
      />
      <main className='content'>
        <MoviesCardList
        filterMovies={filterMovies}
        firstEntrance={firstEntrance}
        onDelete={onDelete}
      />
      </main>
      <Footer />
    </>

  )
}
