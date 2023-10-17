import { useEffect, useState } from 'react'
import MoviesCard from '../MoviesCard/MoviesCard'
import './MoviesCardList.css'
import {
  DESCTOPSCREEN,
  TABLETSCREEN,
  MOBILESCREEN,
  DESCTOPSCREEN_CARDS,
  TABLETSCREEN_CARDS,
  MOBILESCREEN_CARDS,
  DESCTOPSCREEN_MORE,
  TABLETSCREEN_MORE,
  MOBILESCREEN_MORE
} from '../../../utils/constants'
import { useLocation } from 'react-router-dom'
import Preloader from '../../Preloader/Preloader'

export default function MoviesCardList({ moviesList, filterMovies, addMovie, netError, isLoading, onDelete, firstEntrance }) {
  const [numberOfItems, setNumberOfItems] = useState('')
  const { pathname } = useLocation()
  const initialMovies = filterMovies.slice(0, numberOfItems)

  function visibleMovieCards() {
    const counter = { initCount: DESCTOPSCREEN_CARDS, moreCount: DESCTOPSCREEN_MORE }
    if (window.innerWidth < DESCTOPSCREEN) {
      counter.initCount = DESCTOPSCREEN_CARDS
      counter.moreCount = DESCTOPSCREEN_MORE
    }
    if (window.innerWidth < TABLETSCREEN) {
    counter.initCount = TABLETSCREEN_CARDS
    counter.moreCount = TABLETSCREEN_MORE
    }
    if (window.innerWidth < MOBILESCREEN) {
      counter.initCount = MOBILESCREEN_CARDS
      counter.moreCount = MOBILESCREEN_MORE
    }
    return counter
  };
  useEffect(() => {
    if (pathname === '/movies') {
      setNumberOfItems(visibleMovieCards().initCount)
      function visibleMovieCardsForResize() {
        if (window.innerWidth >= DESCTOPSCREEN) {
          setNumberOfItems(visibleMovieCards().initCount)
        }
        if (window.innerWidth < DESCTOPSCREEN) {
          setNumberOfItems(visibleMovieCards().initCount)
        }
        if (window.innerWidth < TABLETSCREEN) {
          setNumberOfItems(visibleMovieCards().initCount)
        }
        if (window.innerWidth < MOBILESCREEN) {
          setNumberOfItems(visibleMovieCards().initCount)
        }
      }
      window.addEventListener('resize', visibleMovieCardsForResize)
      return () => window.removeEventListener('resize', visibleMovieCardsForResize)
    }
  }, [pathname])

  function handleClick() {
    setNumberOfItems(numberOfItems + visibleMovieCards().moreCount)
  }

  return (
    <section className='moviesCardList'>
      <ul className={`gallery ${!firstEntrance ? 'gallery_main' : 'gallery_message'}`}>
        {isLoading ? <Preloader /> :
          (pathname === '/movies' && initialMovies.length !== 0) ?
            initialMovies.map(data => {
              return (
                <MoviesCard
                  key={data.id}
                  data={data}
                  addMovie={addMovie}
                  savedMovies={moviesList}
                />
              )
            }) : filterMovies.length !== 0 ?
              filterMovies.map(data => {
                return (
                  <MoviesCard
                    key={data._id}
                    onDelete={onDelete}
                    data={data}
                  />
                )
              }) : !firstEntrance ?
                <span className='gallery__search'>Ничего не найдено</span>
                : netError ?
                <span className='gallery__search'>Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз
                </span>
                :
                <span className='gallery__search'></span>
        }
      </ul>
      <div className='show-more'>
      {pathname === '/movies' && <button type='button' onClick={handleClick} className={`button-show-more ${numberOfItems >= filterMovies.length && 'button-show-more_hidden'}`}>Еще</button>}
     </div>
  </section>
    )
}
