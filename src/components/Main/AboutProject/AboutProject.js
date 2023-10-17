import './AboutProject.css'

function AboutProject() {
  return (
    <section id={'aboutProject'}className='aboutProject'>
      <h2 className='aboutProject-title section-title'>О проекте</h2>
      <ul className='aboutProject-info'>
        <li className='aboutProject-item'>
          <h3 className='aboutProject-item__title'>Дипломный проект включал 5 этапов</h3>
          <p className='aboutProject-item__description section-text'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </li>
        <li className='aboutProject-item'>
          <h3 className='aboutProject-item__title'>На выполнение диплома ушло 5 недель</h3>
          <p className='aboutProject-item__description section-text'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </li>
      </ul>
      <div className='aboutProject__deadlines'>
        <p className='aboutProject__back'>1 неделя</p>
        <p className='aboutProject__front'>4 недели</p>
        <span className='aboutProject__text'>Back-end</span>
        <span className='aboutProject__text'>Front-end</span>
      </div>
    </section>
  );
}

export default AboutProject;
