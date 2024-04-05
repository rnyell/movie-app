import { Link } from "react-router-dom"

export function ErrorPage() {
  return (
    <div className="error-page">
      <h2 className="heading">404 not found</h2>
      <div className="links">
        <Link to="/" className="btn">Home page</Link>
        <Link to="/search" className="btn">Discover movies</Link>
      </div>
    </div>
  )
}

export function NotFoundResult() {
  return (
    <section className="not-found-result">
      <div>
        <h3>No results found...</h3>
        <p>Try another one</p>
        <Link>See trend movies</Link>
      </div>
      <img className="gif" src="/gifs/jt.gif" />
    </section>
  )
}