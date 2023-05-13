import logoPath from "../images/logo/logo.svg"
import { Link } from 'react-router-dom';

export default function Header(props) {
  return (
    <header className="header">
        <img className="header__logo" src={logoPath} alt="Логотип сайта" />
        {props.isLoggedIn && <p className="header__email">{props.email}</p>}
        <Link className="header__link" to={props.link} onClick={props.isLoggedIn && props.onLogOut}>{props.textLink}</Link>
    </header>
  )
}
