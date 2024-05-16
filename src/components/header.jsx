import { Link } from "react-router-dom"
import { UserCircleIcon, BellIcon, HomeIcon } from "@heroicons/outline"
import SearchBox from "./search-box"



export default function Header({ dataset }) {
  return (
    <header className="main-header" data-set={dataset}>
      {dataset.includes("expanded") && (
        <Link to="/" className="btn home-link">
          <i className="icon home-icon">
            <HomeIcon />
          </i>
        </Link>
      )}
      <div className="flex-item">
        <SearchBox dataset={dataset} />
      </div>
      <div className="icons">
        <i className="icon bell-icon">
          <BellIcon />
        </i>
        <Link to="/login" className="btn login-link">
          <i className="icon user-icon">
            <UserCircleIcon />
          </i>
        </Link>
      </div>
    </header>
  )
}
