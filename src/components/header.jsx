import { Link } from "react-router-dom"
import { UserCircleIcon, BellIcon } from "@heroicons/outline"

export default function Header({ children, dataLocation }) {
  return (
    <header className="main-header" data-location={dataLocation}>
      {children}
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
