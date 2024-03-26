import { Link } from "react-router-dom"
import "@styles/skeletons.css"

export function MainAppLoadingSkeleton() {
  return (
    <div className="app-skeleton">
      <div className="l-sidenav">
        <div className="l-sidenav-item"></div>
        <div className="l-sidenav-item"></div>
        <div className="l-sidenav-item"></div>
        <div className="l-sidenav-item"></div>
      </div>
      <div className="l-main">
        <div className="l-hero">
          <div className="l-hero-poster"></div>
          <div className="l-hero-carousel">
          <div className="l-hero-carousel-img"></div>
          <div className="l-hero-carousel-img"></div>
          <div className="l-hero-carousel-img"></div>
          </div>
        </div>
        <div className="l-section">
          <div className="l-section-movie"></div>
          <div className="l-section-movie"></div>
          <div className="l-section-movie"></div>
        </div>
      </div>
    </div>
  )
}

export function HeroMovieLoadingSkeleton() {
  return (
    <div className="hero-movie-skeleton">
      
    </div>
  )
}

export function SelectedMovieSkeleton() {
  return (
    <div className="movie-skeleton">
      <div className="l-poster"></div>
      <div className="l-attr">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className="l-title"></div>
      <div className="l-overview">
        <p className="l-lines"></p>
        <p className="l-lines"></p>
        <p className="l-lines"></p>
      </div>
      <div className="l-casts">
        <div className="l-img"></div>
        <div className="l-img"></div>
        <div className="l-img"></div>
      </div>
    </div>
  )
}

export function SearchResultsSkeleton() {
  return (
    <div className="search-results-skeleton">
      <div className="l-results-grid">
        {
          [...Array(10).keys()].map((_, i) => (
            <div className="l-movie-card" key={i}>
              <div className="l-poster"></div>
              <div className="l-title"></div>
              <div className="l-release-date"></div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export function NotFoundResult() {
  return (
    <div className="not-found-result">
      <aside>
        <h3>No results found...</h3>
        <p>Try another one</p>
        <Link>See trend movies</Link>
      </aside>
      <img className="gif" src="/gifs/jt.gif" />
    </div>
  )
}