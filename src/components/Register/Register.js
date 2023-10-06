import { Link, useNavigate } from 'react-router-dom';
import './Register.css'
import AuthorizationHeading from '../AuthorizationHeading/AuthorizationHeading';
import AuthorizationButton from '../AuthorizationButton/AuthorizationButton';
import { useFormValidation } from '../../utils/useFormValidation';

export default function Register({ setLoggedIn }) {
  const { values, errors, isValid, isInputValid, handleChange } = useFormValidation()
  const navigate = useNavigate()

  function handleSubmit(evt) {
    evt.preventDefault();
    navigate('/sign-in')
    setLoggedIn(true)
  }

  return (
    <div className='authorization'>
      <AuthorizationHeading>Добро пожаловать!</AuthorizationHeading>
      <form className='authorization__form'
        onSubmit={handleSubmit}
        >
        <span className='authorization__placeholder'>Имя</span>
        <input
          className={`authorization__input ${isInputValid.userName === undefined || isInputValid.userName ? '' : 'authorization__input_error'}`}
          type='text'
          name='userName'
          placeholder='name'
          minLength={2}
          maxLength={200}
          required
          value={values.userName || ''}
          onChange={handleChange}
        />
        <span className={`authorization__error ${isInputValid ? 'authorization__error_visible' : ''}`}>{errors.userName}</span>
        <span className='authorization__placeholder'>E-mail</span>
        <input
          className={`authorization__input ${isInputValid.email === undefined || isInputValid.email ? '' : 'authorization__input_error'}`}
          type='email'
          name='email'
          placeholder='email'
          minLength={2}
          maxLength={200}
          required
          value={values.email || ''}
          onChange={handleChange}
        />
        <span className={`authorization__error ${isInputValid ? 'authorization__error_visible' : ''}`}>{errors.email}</span>
        <span className='authorization__placeholder'>Пароль</span>
        <input
          className={`authorization__input ${isInputValid.password === undefined || isInputValid.password ? '' : 'authorization__input_error'}`}
          type='password'
          name='password'
          placeholder='password'
          minLength={2}
          maxLength={200}
          required
          value={values.password || ''}
          onChange={handleChange}
        />
        <span className={`authorization__error ${isInputValid ? 'authorization__error_visible' : ''}`}>{errors.password}</span>
        <AuthorizationButton onClick={handleSubmit} isValid={isValid}>Зарегистрироваться</AuthorizationButton>
        <p className='authorization__text'>Уже зарегистрированы? <Link to='/signin' className='authorization__link'>Войти</Link></p>
      </form>
    </div>
  )
}
