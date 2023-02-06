import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiFillHome} from 'react-icons/ai'
import {MdEmail} from 'react-icons/md'
import {FiLogOut} from 'react-icons/fi'

import './index.css'

const Headers = props => {
  const onLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="nav-bar">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="headers-website-logo"
        />
      </Link>
      <ul className="mobile-header-icons-list">
        <li>
          <Link to="/">
            <AiFillHome
              size="26"
              color="#ffffff"
              className="mobile-view-icon"
            />
          </Link>
        </li>
        <li>
          <Link to="/jobs">
            <MdEmail size="26" color="#ffff" className="mobile-view-icon" />
          </Link>
        </li>
        <li>
          <FiLogOut
            size="26"
            color="#ffff"
            className="mobile-view-icon"
            onClick={onLogout}
          />
        </li>
      </ul>
      <ul className="desktop-header-icons-list">
        <li className="desktop-header-item">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
        <li className="desktop-header-item">
          <Link to="/jobs" className="nav-link">
            Jobs
          </Link>
        </li>
      </ul>
      <button className="headers-logout-btn" type="button" onClick={onLogout}>
        Logout
      </button>
    </nav>
  )
}
export default withRouter(Headers)
