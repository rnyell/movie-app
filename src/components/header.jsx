import { Link } from "react-router-dom"
import { UserCircleIcon, BellIcon, HomeIcon } from "@heroicons/outline"
import SearchBox from "./search-box"



export default function Header({ dataset }) {
  return (
    <header className="main-header" data-set={dataset}>
      {dataset.includes("results-page") && 
        <Link to="/" className="home-link">
          <i className="icon home-icon">
            <HomeIcon />
          </i>
        </Link>
      }
      <div className="flex-item">
        <SearchBox dataset={dataset} />
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
