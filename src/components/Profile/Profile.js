import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import AuthorizationButton from '../AuthorizationButton/AuthorizationButton';
import { useFormValidation } from '../../utils/useFormValidation';
import './Profile.css';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import Header from '../Header/Header';

export default function Profile({ isEdit, setIsEdit, isError, setIsError, responseMessage, setLoggedIn, onUpdateUser }) {
  const { values, errors, isValid, isInputValid, resetForm, handleChange } = useFormValidation()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const currentUser = useContext(CurrentUserContext)
  const [isSaved, setIsSaved] = useState(false)

  useEffect(() => {
    setIsError(false)
  }, [setIsError, values])

  useEffect(() => {
    if (pathname === '/profile') {
      setIsEdit(false)
      setIsSaved(false)
    }
  }, [setIsEdit, setIsSaved, pathname])

  useEffect(() => {
    resetForm({username: currentUser.name, email: currentUser.email});
  }, [resetForm, currentUser]);

  function onSubmit(evt) {
    evt.preventDefault()
    onUpdateUser(values.username, values.email)
  }

  function handleEditProfile(evt) {
    evt.preventDefault();
    setIsEdit(true);
    setIsError(true)
  }

  function handleSavedProfile() {
    setIsEdit(true);
    setIsSaved(true)
  }

  function outLogin() {
    localStorage.clear()
    setLoggedIn(false)
    navigate('/')
  }

  return (
    <>
      <Header />
      <main className='page__auth'>
        <section className='profile'>
          <h1 className='profile__title'>{`Привет, ${currentUser.name}!`}</h1>
          <form
            noValidate
            className='profile__form'
            onSubmit={onSubmit}>
            <label className='profile__label'>
              <span className='profile__label-title'>Имя</span>
              <input
                className={`profile__input ${isInputValid.username === undefined || isInputValid.username ? '' : 'profile__input_error'}`}
                type='text'
                name='username'
                placeholder='username'
                minLength={2}
                maxLength={200}
                required
                value={values.username || ''}
                disabled={!isEdit}
                onChange={handleChange}
              />
            </label>
            <span className={`profile__error ${!isError ? 'profile__error_visible' : ''}`}>{errors.username}</span>
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
                disabled={!isEdit}
                onChange={handleChange}
              />
            </label>
            <span className={`profile__error ${!isError ? 'profile__error_visible' : ''}`}>{errors.email}</span>
            <div className='profile__form-actions'>
              {!isEdit ? (
                <div className='profile__edit-wrapper'>
                  <span className={`profile__message ${isSaved && 'profile__message_success'}`}>{isError ? '' : 'Профиль успешно обновлен'}</span>
                  <button type='button' className='profile__button' onClick={handleEditProfile}>
                    Редактировать</button>
                  <Link to={'/'} onClick={outLogin} className='profile__link'>
                    Выйти из аккаунта</Link>
                </div>
              ) : (
                <div className='profile__button-wrapper'>
                  <span className={`profile__error ${!isValid || isError ? 'profile__error_visible' : ''}`}>{!isError  ? 'При обновлении профиля произошла ошибка' : `${responseMessage}`}</span>
                  <AuthorizationButton onClick={handleSavedProfile} isValid={isValid} isError={isError}>Сохранить</AuthorizationButton>
                </div>
              )}
            </div>
          </form>
        </section>
      </main>
    </>
  )
}
