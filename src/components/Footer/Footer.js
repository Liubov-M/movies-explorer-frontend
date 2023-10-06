import { Link } from 'react-router-dom';
import './Footer.css'

function Footer() {
  return (
    <footer className='footer'>
      <p className='footer__subtitle'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className='footer-container'>
        <p className='footer-copyright'>&copy; 2023</p>
        <nav className='footer-menu'>
          <ul className='footer-links'>
            <li className='footer-link'><Link to={'https://practicum.yandex.ru'} className='footer-link__text' target='_blank'>Яндекс.Практикум</Link></li>
            <li className='footer-link'><Link to={'https://github.com/Liubov-M'} className='footer-link__text' target='_blank'>Github</Link></li>
          </ul>
        </nav>
      </div>
    </footer>
  )
}

export default Footer;
