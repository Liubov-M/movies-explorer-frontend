import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { convertDuration } from '../../../utils/utils'
import { MOVIES_URL } from '../../../utils/constants'

import './MoviesCard.css'

export default function MoviesCard({ data, savedMovies, addMovie, onDelete }) {
const [click, setClick] = useState(false)
const { pathname } = useLocation()
const duration = convertDuration(data.duration);

useEffect(() => {
  if (pathname === '/movies')
    setClick(savedMovies.some(item => data.id === item.movieId))
}, [setClick, savedMovies, data.id, pathname])

function onClick() {
  if (savedMovies.some(item => data.id === item.movieId)) {
    setClick(true)
    addMovie(data)
  } else {
    setClick(false)
    addMovie(data)
  }
}
return (
  <li className='gallery__card'>
    <div className='gallery__card-container'>
      <Link to={data.trailerLink} target='_blank'>
        <img src={pathname === '/movies' ? `${MOVIES_URL}${data.image.url}` : data.image} alt={`фильм ${data.nameRU}`} className='gallery__image' />
      </Link>
      <div className='gallery__card-description'>
        <div className='gallery__text-container'>
          <h2 className='gallery__subtitle'>{data.nameRU}</h2>
          <span className='gallery__duration'>{duration}</span>
        </div>
        {pathname === '/movies' ?
          <button type='button' className={`gallery__select ${click ? 'gallery__select_active' : ''}`} onClick={onClick}></button>
          :
          <button type='button' className={`gallery__select gallery__select_type_delete`} onClick={() => onDelete(data._id)}></button>
        }
      </div>
    </div>
  </li>
)
}
