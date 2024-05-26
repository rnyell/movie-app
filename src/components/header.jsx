import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { UserCircleIcon, BellIcon, HomeIcon } from "@heroicons/outline"
import SearchBox from "./search-box"


export default function Header({ hasSearchbox = true }) {
  const [dataset, setDataset] = useState("default")
  const pathname = location.pathname

  /* TODO: better ways to handle dataset for searchbox */
  useEffect(() => {
    if (pathname === "/") {
      setDataset("default normal")
    } else if (pathname.startsWith("/search") && hasSearchbox) {
      setDataset("stretched sticky")
    } else if (pathname.startsWith("/search") && !hasSearchbox) {
      setDataset("animated")
    } else if (pathname.startsWith("/movies") || pathname.startsWith("/series")) {
      setDataset("default transparent")
    } else {
      setDataset("default sticky")
    }
  }, [location])
  

  return (
    <header className="main-header align-center" data-set={dataset}>
      {dataset.includes("stretched") || dataset.includes("animated") && (
        <Link to="/" className="btn home-link">
          <i className="icon home-icon">
            <HomeIcon />
          </i>
        </Link>
      )}
      <div className="search-box-wrapper flex-item">
        <SearchBox dataset={dataset} />
      </div>
      <div className="icons align-center">
        <i className="icon bell-icon">
          <BellIcon />
        </i>
        <button className="btn login-link">
          <i className="icon user-icon">
            <UserCircleIcon />
          </i>
        </button>
      </div>
    </header>
  )
}
