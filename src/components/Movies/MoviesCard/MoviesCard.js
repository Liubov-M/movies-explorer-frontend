import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import './MoviesCard.css'

export default function MoviesCard({ movie }) {
const [click, setClick] = useState(false)
const { pathname } = useLocation()

function onClick() {
  if (click) {
    setClick(false)
  } else {
    setClick(true)
  }
}
return (
  <li className='gallery__card'>
    <div className='gallery__card-container'>
      <Link to={movie.trailerLink} target='_blank'>
        <img src={movie.image} alt={`фильм ${movie.nameRU}`} className='gallery__image' />
      </Link>
      <div className='gallery__card-description'>
        <div className='gallery__text-container'>
          <p className='gallery__subtitle'>{movie.nameRU}</p>
          <span className='gallery__duration'>1ч 47м</span>
        </div>
        {pathname === '/movies' ?
          <button type='button' className={`gallery__select ${click ? 'gallery__select_active' : ''}`} onClick={onClick}></button>
          :
          <button type='button' className={`gallery__select gallery__select_type_delete`} onClick={onClick}></button>
        }
      </div>
    </div>
  </li>
)
}
