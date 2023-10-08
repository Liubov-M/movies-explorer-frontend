import './SearchForm.css';
import FilterCheckbox from './FilterCheckbox/FilterCheckbox';

export default function SearchForm({ handleChange, handleSubmit }) {
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
              onChange={handleChange}/>
            <button type='submit' className='searchForm__submit'></button>
          </div>
          <div className='searchForm__switch'>
            <FilterCheckbox />
            <p className='searchForm-text'>Короткометражки</p>
          </div>
        </form>
      </div>
    </section>
  )
}
