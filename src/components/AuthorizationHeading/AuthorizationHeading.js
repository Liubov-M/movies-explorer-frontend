import { Link } from 'react-router-dom'
import './AuthorizationHeading.css'
import progectLogo from '../../images/logo.svg'

function AuthorizationHeading({children}) {
  return (
    <>
    <Link to="/" className="logo">
    <img src={progectLogo}
        alt='логотип проекта'
        className='authorization__logo'></img>
    </Link>
    <h3 className="authorization__heading">{children}</h3>
    </>
  )
}

export default AuthorizationHeading;
