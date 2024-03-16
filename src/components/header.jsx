import { Link } from "react-router-dom"
import { UserCircleIcon, HomeIcon } from "@heroicons"

import icon from "@src/assets/logo.png"

import "@styles/header.css"


export default function Header({ children, isHomePage }) {
  return (
    <header className="main-header">
      <Link to="/">
        <i className="icon home-icon">
          {
            isHomePage ? 
            <span className="logo-wrapper">
              <img src={icon} className="logo" />
            </span> :
            <HomeIcon />
          }
        </i>
      </Link>
      {children}
      <Link to="">
        <i className="icon user-icon">
          <UserCircleIcon />
        </i>
      </Link>
    </header>
  )
}