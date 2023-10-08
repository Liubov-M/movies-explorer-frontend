import { useNavigate } from 'react-router-dom'
import './NotFound.css'

export default function NotFound() {
  const navigate = useNavigate()
  return (
    <main className='page__auth'>
      <section className='notFound'>
        <div className='notFound__container'>
          <h1 className='notFound__title'>404</h1>
          <p className='notFound__subtitle'>Страница не найдена</p>
          <button type='button' onClick={() => navigate(-1)} className='notFound__text'>Назад</button>
        </div>
      </section>
    </main>
  )
}
