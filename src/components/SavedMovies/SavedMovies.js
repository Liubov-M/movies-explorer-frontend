import './SavedMovies.css';
import MoviesCard from '../Movies/MoviesCard/MoviesCard'
import {savedMovies} from '../../utils/constants'

export default function SavedMoviest() {
  const moviesElements = savedMovies.map(
    (data) => {
      return (<MoviesCard
        key={data.id}
        movie={data}
        />)
    }
  )

  return (
    <div className="saved-movies">
      <ul className="gallery">
        {moviesElements}
      </ul>
    </div>
  )
}
