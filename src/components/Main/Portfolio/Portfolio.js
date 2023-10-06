import './Portfolio.css'

function Portfolio() {
  return (
    <section className='portfolio'>
      <h2 className='portfolio-title'>Портфолио</h2>
      <nav className='portfolio__nav'>
        <ul className='portfolio__lists'>
          <li className='portfolio__list'>
            <a className='portfolio__link' href='https://github.com/Liubov-M/how-to-learn.git' target='_blank' rel='noreferrer'>
              <p className='portfolio__subtitle'>Статичный сайт</p>
              <span className='portfolio__button'></span>
            </a>
          </li>
          <li className='portfolio__list'>
            <a className='portfolio__link' href='https://liubov-m.github.io/russian-travel/' target='_blank' rel='noreferrer'>
              <p className='portfolio__subtitle'>Адаптивный сайт</p>
              <span className='portfolio__button'></span>
            </a>
          </li>
          <li className='portfolio__list'>
            <a className='portfolio__link portfolio__link_nth-type' href='https://github.com/Liubov-M/react-mesto-auth.git' target='_blank' rel='noreferrer'>
              <p className='portfolio__subtitle'>Одностраничное приложение</p>
              <span className='portfolio__button'></span>
            </a>
          </li>
        </ul>
      </nav>
    </section>
  );
}

export default Portfolio;
