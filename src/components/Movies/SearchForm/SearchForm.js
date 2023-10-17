import './SearchForm.css';
import FilterCheckbox from './FilterCheckbox/FilterCheckbox';
import { useFormValidation } from '../../../utils/useFormValidation'
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function SearchForm({ searchMovies, changeShort, searchMovie, shortMovie, setIsError, isError, moviesList, firstEntrance }) {
  const { values, handleChange, resetForm } = useFormValidation()
  const { pathname } = useLocation()

  useEffect(() => {
    if ((pathname === '/saved-movies' && moviesList.length === 0)) {
      resetForm({ search: '' })
    } else {
      resetForm({ search: searchMovie })
    }
    setIsError(false)
  }, [pathname, moviesList, resetForm, searchMovie, setIsError])

  function handleSubmit (evt) {
    evt.preventDefault();
    if (evt.target.search.value) {
      searchMovies(evt.target.search.value)
      setIsError(false)
    } else {
      setIsError(true)
    }
  }

  function onChange(evt) {
    handleChange(evt)
    setIsError(false)
  }

  return (
    <section className='searchForm'>
      <div className='searchForm__container'>
        <form className='searchForm__form' onSubmit={handleSubmit} noValidate>
          <div className='searchForm__wrapper'>
            <input
              className='searchForm__input'
              name='search'
              type='text'
              placeholder='Фильм'
              required
              value={values.search || ''}
              onChange={onChange}/>
            <button type='submit' className='searchForm__submit'></button>
          </div>
          <span className={`searchForm__error ${isError && 'searchForm__error_active'}`}>{'Нужно ввести ключевое слово'}</span>
          <div className='searchForm__switch'>
            <FilterCheckbox changeShort={changeShort} shortMovie={shortMovie} firstEntrance={firstEntrance}/>
            <p className='searchForm-text'>Короткометражки</p>
          </div>
        </form>
      </div>
    </section>
  )
}
