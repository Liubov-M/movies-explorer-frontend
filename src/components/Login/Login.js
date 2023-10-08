import { useNavigate, Link } from "react-router-dom";
import './Login.css'
import AuthorizationHeading from '../AuthorizationHeading/AuthorizationHeading';
import AuthorizationButton from '../AuthorizationButton/AuthorizationButton';
import { useFormValidation } from '../../utils/useFormValidation';

export default function Login({ setLoggedIn }) {
  const { values, errors, isValid, isInputValid, handleChange } = useFormValidation()
  const navigate = useNavigate()

  function handleSubmit(evt) {
    evt.preventDefault();
    navigate('/')
    setLoggedIn(true)
  }

  return (
    <main className='page__auth'>
      <div className="authorization">
        <AuthorizationHeading>Рады видеть!</AuthorizationHeading>
        <form className="authorization__form"
          onSubmit={handleSubmit}>
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
          <span className={`authorization__error authorization__error_large ${isInputValid ? 'authorization__error_visible' : ''}`}>{errors.email}</span>
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
          <span className={`authorization__error authorization__error_large ${isInputValid ? 'authorization__error_visible' : ''}`}>{errors.password}</span>
          <AuthorizationButton onClick={handleSubmit} isValid={isValid}>Войти</AuthorizationButton>
          <p className="authorization__text">Еще не зарегистрированы? <Link to="/signup" className="authorization__link">Регистрация</Link></p>
        </form>
      </div>
    </main>
  )
}
