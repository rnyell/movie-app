// import { Link } from "react-router-dom"

import "./error.css"

export function NotFoundResult() {
  return (
    <div className="not-found-result">
      <div className="wrapper">
        <h3>No results found...</h3>
        <p>Make sure to enter the correct title.</p>
        {/* <div className="links flex">
          <Link to="/discover/movies">See popular movies</Link>
          <Link to="/discover/series">See trend series</Link>
        </div> */}
      </div>
      <img className="gif" src="/gifs/jt.gif" />
    </div>
  )
}
