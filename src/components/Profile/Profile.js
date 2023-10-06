import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import AuthorizationButton from '../AuthorizationButton/AuthorizationButton';
import { useFormValidation } from '../../utils/useFormValidation';
import './Profile.css';

export default function Profile({ setLoggedIn }) {
  const { values, errors, isValid, isInputValid, handleChange } = useFormValidation()
  const navigate = useNavigate()
  const [isEdit, setIsEdit] = useState(false);

  function handleEditProfile(evt) {
    evt.preventDefault();
    setIsEdit(true);
  }

  function outLogin() {
    setLoggedIn(false)
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    navigate('/')
    setLoggedIn(true)
  }

  return (
    <section className='profile'>
      <h2 className='profile__title'>{`Привет, Виталий!`}</h2>
      <form className='profile__form'
        onSubmit={handleSubmit}>
        <label className='profile__label'>
          <span className='profile__label-title'>Имя</span>
          <input
            className={`profile__input ${isInputValid.userName === undefined || isInputValid.userName ? '' : 'profile__input_error'}`}
            type='text'
            name='userName'
            placeholder='username'
            minLength={2}
            maxLength={200}
            required
            value={values.userName || ''}
            onChange={handleChange}
          />
        </label>
        <span className={`profile__error ${!isValid ? 'profile__error_visible' : ''}`}>{errors.userName}</span>
        <label className='profile__label'>
          <span className='profile__label-title'>E-mail</span>
          <input
            className={`profile__input ${isInputValid.email === undefined || isInputValid.email ? '' : 'profile__input_error'}`}
            type='email'
            name='email'
            placeholder='email'
            minLength={2}
            maxLength={200}
            required
            value={values.email || ''}
            onChange={handleChange}
          />
        </label>
        <span className={`profile__error ${!isValid ? 'profile__error_visible' : ''}`}>{errors.email}</span>
        <div className='profile__form-actions'>
          {!isEdit ? (
            <div className='profile__edit-wrapper'>
              <button type='button' className='profile__button' onClick={handleEditProfile}>
                Редактировать</button>
              <Link to={'/'} onClick={outLogin} className='profile__link'>
                Выйти из аккаунта</Link>
            </div>
          ) : (
            <div className='profile__button-wrapper'>
              <span className={`profile__error ${!isValid ? 'profile__error_visible' : ''}`}>При обновлении профиля произошла ошибка.</span>
              <AuthorizationButton onClick={handleSubmit} isValid={isValid}>Сохранить</AuthorizationButton>
            </div>
          )}
        </div>
      </form>
    </section>
  )
}
