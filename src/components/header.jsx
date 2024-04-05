import { Link } from "react-router-dom"
import { UserCircleIcon, BellIcon, HomeIcon } from "@heroicons/outline"

export default function Header({ children, dataLocation }) {
  return (
    <header className="main-header" data-location={dataLocation}>
      {dataLocation.includes("results-page") && 
        <Link to="/" className="home-link">
          <i className="icon home-icon">
            <HomeIcon />
          </i>
        </Link>
      }
      <div className="flex-content">
        {children}
      </div>
      <div className="user-related">
        <i className="icon bell-icon">
          <BellIcon />
        </i>
        <Link to="/login" className="login-link">
          <i className="icon user-icon">
            <UserCircleIcon />
          </i>
        </Link>
      </div>
    </header>
  )
}
