import { useCallback, useEffect, useState } from 'react'
import moviesApi from '../../utils/MoviesApi'
import MoviesCardList from './MoviesCardList/MoviesCardList'
import Header from '../Header/Header'
import SearchForm from './SearchForm/SearchForm'
import Footer from '../Footer/Footer'
import { SHORT_MOVIE_DURATION } from '../../utils/constants'


export default function Movies({ setIsError, moviesList, addMovie, isError }) {
  const [allMovies, setAllMovies] = useState([])
  const [filterMovies, setFilterMovies] = useState([])
  const [searchMovie, setSearchMovie] = useState('')
  const [shortMovie, setShortMovie] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [netError, setNetError] = useState(false)
  const [firstEntrance, setFirstEntrance] = useState(true)

  const sortingMovies = useCallback((userSearch, shortMovie, movies) => {
    localStorage.setItem('movie', JSON.stringify(userSearch))
    localStorage.setItem('shortmovie', JSON.stringify(shortMovie))
    localStorage.setItem('allmovies', JSON.stringify(movies))
    setSearchMovie(userSearch)
    setFilterMovies(movies.filter((movie) => {
      const searchRequest = movie.nameRU.toLowerCase().includes(userSearch.toLowerCase())
      return shortMovie ? (searchRequest && movie.duration <= SHORT_MOVIE_DURATION) : searchRequest
    }))
  }, [])

  function searchMovies(userSearch) {
    if (allMovies.length === 0) {
      setIsLoading(true)
      moviesApi.getMovies()
        .then((res) => {
          setAllMovies(res)
          setShortMovie(false)
          setNetError(false)
          setFirstEntrance(false)
          sortingMovies(userSearch, shortMovie, allMovies)
        })
        .catch(err => {
          setNetError(true)
          console.error(`При поске фильмов произошла ошибка ${err}`)
        })
        .finally(() => setIsLoading(false))
    } else {
      sortingMovies(userSearch, shortMovie, allMovies)
    }
  }

  useEffect(() => {
    if (localStorage.movie && localStorage.shortmovie && localStorage.allmovies) {
      const userSearch = JSON.parse(localStorage.movie)
      const shortMovie = JSON.parse(localStorage.shortmovie)
      const movies = JSON.parse(localStorage.allmovies)
      setNetError(false)
      setFirstEntrance(false)
      setSearchMovie(userSearch)
      setShortMovie(shortMovie)
      setAllMovies(movies)
      sortingMovies(userSearch, shortMovie, movies)
    }
  }, [sortingMovies])

  function changeShort() {
    if (shortMovie) {
      setShortMovie(false)
      sortingMovies(searchMovie, false, allMovies)
    } else {
      setShortMovie(true)
      sortingMovies(searchMovie, true, allMovies)
    }
  }

  return (
    <>
      <Header />
      <SearchForm
        searchMovies={searchMovies}
        changeShort={changeShort}
        moviesList={moviesList}
        setIsError={setIsError}
        isError={isError}
        searchMovie={searchMovie}
        shortMovie={shortMovie}
        firstEntrance={firstEntrance}
        />
      <main className='content'>
          <MoviesCardList
            filterMovies={filterMovies}
            moviesList={moviesList}
            addMovie={addMovie}
            firstEntrance={firstEntrance}
            netError={netError}
            isLoading={isLoading}
          />
      </main>
      <Footer />
    </>

  )
}
