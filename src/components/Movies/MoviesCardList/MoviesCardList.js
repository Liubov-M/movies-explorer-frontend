import { useState } from 'react'
import MoviesCard from '../MoviesCard/MoviesCard'
import {initialMovies} from '../../../utils/constants'
import './MoviesCardList.css'

export default function MoviesCardList() {
  const [showMore, setShowMore] = useState(false)
  const numberOfItems = showMore ? initialMovies.length : 8

  const moviesElements = initialMovies.slice(0, numberOfItems).map(
    (data) => {
      return (<MoviesCard
        key={data.id}
        movie={data}
        />)
    }
  )

  function handleClick() {
    setShowMore(true)
  }

  return (
    <div className='moviesCardList'>
      <ul className='gallery'>
        {moviesElements}
      </ul>
      <div className='show-more'>
        <button type='button' onClick={handleClick} className='button-show-more'>Еще</button>
      </div>
    </div>
  )
}
