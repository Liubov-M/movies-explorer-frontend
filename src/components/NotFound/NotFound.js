import { useNavigate } from 'react-router-dom'
import './NotFound.css'

export default function NotFound() {
  const navigate = useNavigate()
  return (
    <section className='notFound'>
      <div className='notFound__container'>
        <h2 className='notFound__title'>404</h2>
        <p className='notFound__subtitle'>Страница не найдена</p>
        <button type='button' onClick={() => navigate(-1)} className='notFound__text'>Назад</button>
      </div>
    </section>
  )
}
