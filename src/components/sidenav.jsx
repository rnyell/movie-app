import { Link, useLocation } from "react-router-dom"
import { HomeIcon, TicketIcon, FilmIcon, TvIcon, BookmarkIcon } from "@heroicons/outline"
import logo from "@src/assets/logo.png"

const CompasIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM15.5 8.5L13.5 13.5L8.5 15.5L10.5 10.5L15.5 8.5Z"></path></svg>

/*const BookmarkIcon = () => <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="currentColor"><path d="M322.308-320h455.383q4.615 0 8.462-3.846 3.846-3.847 3.846-8.463v-455.382q0-4.616-3.846-8.463-3.847-3.846-8.462-3.846h-67.692v230.768q0 10.846-9.038 16.269-9.039 5.423-18.269-.807l-44-25.923q-9.231-5.616-19.192-5.616t-18.192 5.616l-44 25.923q-9.846 6.23-18.577.807-8.73-5.423-8.73-16.269V-800H322.308q-4.616 0-8.462 3.846-3.847 3.847-3.847 8.463v455.382q0 4.616 3.847 8.463 3.846 3.846 8.462 3.846Zm0 59.999q-30.308 0-51.307-21-21-21-21-51.308v-455.382q0-30.308 21-51.308 20.999-21 51.307-21h455.383q30.307 0 51.307 21 21 21 21 51.308v455.382q0 30.308-21 51.308t-51.307 21H322.308ZM182.309-120.003q-30.307 0-51.307-21-21-21-21-51.307v-485.382q0-12.769 8.615-21.384 8.616-8.615 21.384-8.615 12.769 0 21.385 8.615 8.615 8.615 8.615 21.384v485.382q0 4.616 3.846 8.462 3.847 3.847 8.462 3.847h485.382q12.769 0 21.385 8.615 8.615 8.615 8.615 21.384t-8.615 21.384q-8.616 8.615-21.385 8.615H182.309ZM309.999-800v480-480Zm220.002 230.768q0 10.846 8.73 16.269 8.731 5.423 18.577-.807l44-25.923q8.231-5.616 18.192-5.616t19.192 5.616l44 25.923q9.23 6.23 18.269.807 9.038-5.423 9.038-16.269 0 10.846-9.038 16.269-9.039 5.423-18.269-.807l-44-25.923q-9.231-5.616-19.192-5.616t-18.192 5.616l-44 25.923q-9.846 6.23-18.577.807-8.73-5.423-8.73-16.269Z"/></svg>
*/

const links = [
  { name: "Home", href: "/", icon: <HomeIcon /> },
  { name: "Discover", href: "/discover", icon: <CompasIcon /> },
  { name: "Reservation", href: "/reservation", icon: <TicketIcon /> },
  { name: "Movies", href: "/movies", icon: <FilmIcon /> },
  { name: "Tv Shows", href: "/series", icon: <TvIcon /> },
  { name: "Your Stuff", href: "/stuff", icon: <BookmarkIcon /> }
]

export default function SideNav() {
  const location = useLocation()

  return (
    <div className="sidenav">
      <div className="logo-wrapper">
        <Link to="/">
          <img src={logo} className="logo" />
        </Link>
        {/* <h5>Dad's movie app</h5> */}
      </div>
      <nav className="nav-links">
        {links.map(link => 
          <Link
            to={link.href} 
            key={link.href}
            className={`link ${location.pathname === link.href && "is-active"}`}
          >
            <i className="icon">{link.icon}</i>
            <p>{link.name}</p>
          </Link>
        )}
      </nav>
    </div>
  )
}