import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Header.css';
import AuthNavigation from '../Navigation/AuthNavigation/AuthNavigation';
import AccountNavigation from '../Navigation/AccountNavigation/AccountNavigation';

export default function Header({ loggedIn }) {
  const { pathname } = useLocation()
  const [isOpen, setIsOpen] = useState(false)

  function handelClick() {
    if (isOpen) {
      setIsOpen(false)
    } else {
      setIsOpen(true)
    }
  }

  useEffect(() => {
    function closeBurgerForResize() {
      if (document.documentElement.clientWidth > '767') {
        setIsOpen(false)
        window.removeEventListener('resize', closeBurgerForResize)
      }
    }
    if (isOpen) {
      window.addEventListener('resize', closeBurgerForResize)
      return () => window.removeEventListener('resize', closeBurgerForResize)
    }
  }, [isOpen])

  return (
    <header className={`header ${pathname === '/' ? 'header_theme_promo' : 'header_theme_main'}`}>
      <div>
        <Link to={'/'} className="header__link-logo"></Link>
      </div>
      {pathname === '/' && !loggedIn ?
        <AuthNavigation />
        :
        <>
        <AccountNavigation onOpen={setIsOpen} isOpen={isOpen} onClick={handelClick}/>
          <button type='button' className='header__burger' onClick={handelClick}></button>
        </>
      }
    </header>
  )
}
