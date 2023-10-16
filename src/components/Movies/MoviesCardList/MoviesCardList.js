import { useEffect, useState } from 'react'
import MoviesCard from '../MoviesCard/MoviesCard'
import './MoviesCardList.css'
import {
  DesctopScreen,
  TabletScreen,
  MobileScreen,
  DesctopScreen_cards,
  TabletScreen_cards,
  MobileScreen_cards,
  DesctopScreen_more,
  TabletScreen_more,
  MobileScreen_more,
} from '../../../utils/constants'
import { useLocation } from 'react-router-dom'
import Preloader from '../../Preloader/Preloader'

export default function MoviesCardList({ moviesList, filterMovies, addMovie, netError, isLoading, onDelete, firstEntrance }) {
  const [numberOfItems, setNumberOfItems] = useState('')
  const { pathname } = useLocation()
  const initialMovies = filterMovies.slice(0, numberOfItems)

  function visibleMovieCards() {
    const counter = { initCount: DesctopScreen_cards, moreCount: DesctopScreen_more }
    if (window.innerWidth < DesctopScreen) {
      counter.initCount = DesctopScreen_cards
      counter.moreCount = DesctopScreen_more
    }
    if (window.innerWidth < TabletScreen) {
    counter.initCount = TabletScreen_cards
    counter.moreCount = TabletScreen_more
    }
    if (window.innerWidth < MobileScreen) {
      counter.initCount = MobileScreen_cards
      counter.moreCount = MobileScreen_more
    }
    return counter
  };
  useEffect(() => {
    if (pathname === '/movies') {
      setNumberOfItems(visibleMovieCards().initCount)
      function visibleMovieCardsForResize() {
        if (window.innerWidth >= DesctopScreen) {
          setNumberOfItems(visibleMovieCards().initCount)
        }
        if (window.innerWidth < DesctopScreen) {
          setNumberOfItems(visibleMovieCards().initCount)
        }
        if (window.innerWidth < TabletScreen) {
          setNumberOfItems(visibleMovieCards().initCount)
        }
        if (window.innerWidth < MobileScreen) {
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
