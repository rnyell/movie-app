import "@styles/skeletons.css"

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
      <div className="l-movies-grid">
        {
          [...Array(10).keys()].map(_ => (
            <div className="l-movie-card">
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