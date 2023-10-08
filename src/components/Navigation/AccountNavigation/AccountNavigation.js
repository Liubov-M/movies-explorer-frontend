import { Link, useLocation } from "react-router-dom";
import './AccountNavigation.css'

function AccountNavigation({ onOpen, isOpen, onClick }) {
  const { pathname } = useLocation()

  function clickLink() {
    onOpen(false)
  }

  return (
    <nav className={`header__navigation ${isOpen ? 'header__navigation_opened' : ''}`}>
    <ul className='header__navigation-container header__navigation-burger'>
      <li className='header__link-container'>
        <Link
          to={'/'}
          className={`header__link ${pathname === '/' ? 'header__link_active' : ''}`}
          onClick={clickLink}
        >Главная</Link>
      </li>
      <li className='header__link-container'>
        <Link
          to={'/movies'}
          className={`header__link ${pathname === '/movies' ? 'header__link_active' : ''}`}
          onClick={clickLink}
        >Фильмы</Link>
      </li>
      <li className='header__link-container'>
        <Link
          to={'/saved-movies'}
          className={`header__link ${pathname === '/saved-movies' ? 'header__link_active' : ''}`}
          onClick={clickLink}
        >Сохранённые фильмы</Link>
      </li>
      <li className='header__link-container'>
        <Link
          to={'/profile'}
          className={`header__link header__account-link ${pathname === '/profile' ? 'header__link_active' : ''}`}
          onClick={clickLink}
        >Аккаунт <div className={`header__account ${pathname === '/' ? 'header__account_promo' : 'header__account_all'}`}></div></Link>
      </li>
    </ul>
    <button type='button' className='header__burger-close' onClick={onClick}></button>
  </nav>
  );
}

export default AccountNavigation;
