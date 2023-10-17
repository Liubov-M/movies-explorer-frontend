import './AuthorizationButton.css'

function AuthorizationButton({ children, isValid, onClick, isError, isSend }) {

  return (
    <button
      onClick={onClick}
      className={`authorization__submit-button ${isValid && !isError ? '' : 'authorization__disabled-button'}`}
      disabled={!isValid || isError || isSend}
      type='submit'
      >{isSend ? 'Подождите...' : `${children}`}
    </button>

  )
}

export default AuthorizationButton;
