import { Link } from 'react-router-dom';
import './AuthNavigation.css'

function AuthNavigation() {
  return (
    <nav>
      <ul className='header__navigation-container'>
        <li>
          <Link to={'/signup'} className='header__register'>Регистрация</Link>
        </li>
        <li>
          <Link to={'/signin'} className='header__login'>Войти</Link>
        </li>
      </ul>
    </nav>
  )
}

export default AuthNavigation;
