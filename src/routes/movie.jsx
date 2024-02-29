import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import { useSelectedMovie } from '../store/app-context'
import { getMovieDetails, getMovieTrailer } from '../utils/apis'
import { formatRuntime, getMovieGenres } from '../utils/utils'
import { SelectedMovieSkeleton } from '../components/skeletons'

import "../components/styles/selected-movie.css"


export default function Movie() {
  const [imgUrl, setImgUrl] = useState({
    width: "",
    path: "",
    toString() {
      return `${this.width}${this.path}`
    }
  })
  const [trailerUrl, setTrailerUrl] = useState("")
  const [windowWidth, setWindowWidth] = useState(365)
  const [isLoading, setIsLoading] = useState(true)
  const [, setSelectedMovie] = useSelectedMovie()
  const [movie, setMovie] = useState("")
  const navigate = useNavigate()
  const { state } = useLocation()
  const id = state.id

  useEffect(() => {
    setWindowWidth(window.innerWidth)

    const loadMovie = async () => {
    const res = await getMovieDetails(id)
    setMovie(res)
    setIsLoading(false)
  }
    loadMovie()

    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])
  
  useEffect(() => {
    handleResize()
  }, [movie, windowWidth])


  function handleResize() {
    if (windowWidth < 390) {
      setImgUrl({
        ...imgUrl,
        width: "w300",
        path: poster_path
      })
    } else if (windowWidth < 620) {
      setImgUrl({
        ...imgUrl,
        width: "w500",
        path: poster_path
      })
    } else {
      setImgUrl({
        ...imgUrl,
        width: "original",
        path: bg_path
      })
    }
  }
  
  const {
    title,
    release_date,
    runtime,
    genres,
    vote_average: rate,
    overview: plot,
    tagline,
    poster_path,
    backdrop_path: bg_path,
    credits,
    videos,
    budget,
    revenue,
    belongs_to_collection
  } = movie

  //! WTF
  // credits is undefined
  // const { cast } = credits

  console.log(movie)

  function showTrailer(data) {
    let officialTrailers = data.results.filter(res => 
      res.type === "Trailer" && 
      res.official === true
    )
  
    let latestTrailer = officialTrailers[0].key
    let trailerUrl = `https://www.youtube.com/watch?v=${latestTrailer}`
    setTrailerUrl(trailerUrl)
  }

  function handleBooking() {
    setSelectedMovie({ title, poster_path })
    navigate("/booking")
  }

  return (
    isLoading ? <SelectedMovieSkeleton /> :
    <section className="selected-movie">
      <div className="poster-wrapper">
        <figure>
          <img
            src={`https://image.tmdb.org/t/p/${imgUrl}`}
            alt="movie-poster"
            className="poster"
          />
        </figure>
        <div className="gradient">
          <div className="details">
            <span className="runtime">{formatRuntime(runtime)}</span>
            <i className="dot">&#x2022;</i>
            <span className="genres">{getMovieGenres(genres)}</span>
            <i className="dot">&#x2022;</i>
            <span className="release-date">{release_date?.slice(0, 4)}</span>
          </div>
          <span className='icons'>
            <i className="icon bookmark-icon">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
              </svg>
            </i>
            <i className="icon share-icon">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
              </svg>
            </i>
          </span>
        </div>
      </div>
      <div className="description">
        <h3 className="title">{title}</h3>
        <p className="plot">{plot}</p>
        <div className='casts-wrapper'>
          <h4>Casts</h4>
          <ul className="casts">
            {
              credits.cast.slice(0, 7).map(c => 
                <li>
                  <img className='cast-img' src={`https://image.tmdb.org/t/p/w154/${c.profile_path}`} alt="cast-profile" />
                  <p className="cast-name">{c.name}</p>
                </li>)
            }
          </ul>
        </div>
      </div>

      <div className="cta">
        <button onClick={() => showTrailer(videos)} className="trailer-btn">
          <span>Watch Trailer</span>
          <i className="icon play-icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
            </svg>
          </i>
        </button>
        <button onClick={handleBooking} className="book-btn">Book Now</button>
      </div>
    </section>
  )
}
