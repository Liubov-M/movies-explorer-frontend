import './AuthorizationButton.css'

function AuthorizationButton({ children, isValid, onClick }) {

  return (
    <button
      onClick={onClick}
      className={`authorization__submit-button ${isValid ? '' : 'authorization__disabled-button'}`}
      disabled={!isValid}
      type='submit'>{children}
    </button>
  )
}

export default AuthorizationButton;
