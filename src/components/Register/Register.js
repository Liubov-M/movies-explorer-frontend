import { Link } from 'react-router-dom';
import './Register.css'
import AuthorizationHeading from '../AuthorizationHeading/AuthorizationHeading';
import AuthorizationButton from '../AuthorizationButton/AuthorizationButton';
import { useFormValidation } from '../../utils/useFormValidation';
import { useEffect } from 'react';
import { EMAIL_REGEX } from '../../utils/constants'

export default function Register({ isError, setIsError, responseMessage, onRegister, isSend }) {
  const { values, errors, isValid, isInputValid, handleChange } = useFormValidation()

  useEffect(() => {
    setIsError(false)
  }, [setIsError, values])


  function handleSubmit(evt) {
    evt.preventDefault();
    onRegister(values.username, values.email, values.password)
  }

  return (
    <main className='page__auth'>
      <div className='authorization'>
        <AuthorizationHeading>Добро пожаловать!</AuthorizationHeading>
        <form noValidate className='authorization__form'
          onSubmit={handleSubmit}>
          <span className='authorization__placeholder'>Имя</span>
          <input
            className={`authorization__input ${isInputValid.username === undefined || isInputValid.username ? '' : 'authorization__input_error'}`}
            type='text'
            name='username'
            placeholder='name'
            minLength={2}
            maxLength={200}
            required
            value={values.username || ''}
            disabled={isSend}
            onChange={handleChange}
          />
          <span className={`authorization__error authorization__error_small ${isInputValid ? 'authorization__error_visible' : ''}`}>{errors.username}</span>
          <span className='authorization__placeholder'>E-mail</span>
          <input
            className={`authorization__input ${isInputValid.email === undefined || isInputValid.email ? '' : 'authorization__input_error'}`}
            type='email'
            name='email'
            placeholder='email'
            minLength={2}
            maxLength={200}
            required
            pattern={EMAIL_REGEX}
            value={values.email || ''}
            disabled={isSend}
            onChange={handleChange}
          />
          <span className={`authorization__error authorization__error_small ${isInputValid ? 'authorization__error_visible' : ''}`}>{errors.email}</span>
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
            disabled={isSend}
            onChange={handleChange}
          />
          <span className={`authorization__error authorization__error_small ${isInputValid ? 'authorization__error_visible' : ''}`}>{errors.password}</span>
          <div className='profile__button-wrapper'>
            <span className={`profile__error ${isError && 'profile__error_visible'}`}>{responseMessage}</span>
            <AuthorizationButton isValid={isValid} isError={isError} isSend={isSend}>Зарегистрироваться</AuthorizationButton>
          </div>
          <p className='authorization__text'>Уже зарегистрированы? <Link to='/signin' className='authorization__link'>Войти</Link></p>
        </form>
      </div>
    </main>
  )
}
