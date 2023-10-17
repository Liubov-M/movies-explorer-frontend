import './AboutMe.css'
import studentPhoto from '../../../images/photo.png'
import { Link } from 'react-router-dom';

function AboutMe() {
  return (
    <section className='aboutMe'>
      <h2 className='aboutMe__title section-title'>Студент</h2>
      <div className='aboutMe__container'>
        <div className='aboutMe__content'>
          <h3 className='aboutMe__name'>Виталий</h3>
          <p className='aboutMe__speciality'>Фронтенд-разработчик, 30 лет</p>
          <p className='aboutMe__description'>Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и&nbsp;дочь.
          Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С&#8209;2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке,
          начал заниматься фриланс&#8209;заказами и ушёл с постоянной работы.</p>
          <Link to={'https://github.com/Liubov-M'} className='aboutMe__link' target='_blank'>Github</Link>
        </div>
        <img src={studentPhoto}
          alt='фото студента'
          className='aboutMe__image'></img>
      </div>
    </section>
  );
}

export default AboutMe;
