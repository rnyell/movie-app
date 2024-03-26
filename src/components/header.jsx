import { Link } from "react-router-dom"
import { UserCircleIcon } from "@heroicons/outline"
import "@styles/header.css"

export default function Header({ children, isHomePage }) {
  return (
    <header className="main-header">
      {/* <h4 style={{
        marginInlineStart: "1rem",
        color: "var(--color-accent-300)"
      }}>Popular Movies</h4> */}
      {children}
      <Link to="/login">
        <i className="icon user-icon">
          <UserCircleIcon />
        </i>
      </Link>
    </header>
  )
}
