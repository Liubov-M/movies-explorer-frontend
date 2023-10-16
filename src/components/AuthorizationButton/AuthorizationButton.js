import './AuthorizationButton.css'

function AuthorizationButton({ children, isValid, onClick, isError }) {

  return (
    <button
      onClick={onClick}
      className={`authorization__submit-button ${isValid && !isError? '' : 'authorization__disabled-button'}`}
      disabled={!isValid || isError}
      type='submit'>{children}
    </button>
  )
}

export default AuthorizationButton;
