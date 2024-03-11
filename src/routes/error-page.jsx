import { Link } from "react-router-dom"
import "@styles/error-page.css"

export default function ErrorPage() {
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