import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import { useSelectedMovie } from '../store/app-context'
import { getMovieDetails } from '../utils/apis'
import { formatRuntime, getMovieGenres } from '../utils/utils'
import { MovieLoader } from '../components/skeleton'

import "../components/styles/selected-movie.css"

export default function Movie() {
  const [, setSelectedMovie] = useSelectedMovie()
  const [isLoading, setIsLoading] = useState(true)
  const [movie, setMovie] = useState("")
  const navigate = useNavigate()
  const { state } = useLocation()
  const id = state.id

  useEffect(() => {
    const loadMovie = async () => {
    const res = await getMovieDetails(id)
    setMovie(res)
    setIsLoading(false)
  }
    loadMovie()
  }, [])
  
  const {
    title,
    release_date,
    runtime,
    genres,
    overview,
    poster_path,
    backdrop_path: bg_path,
    credits,
    budget
  } = movie
  
  console.log(genres)

  function handleBooking() {
    setSelectedMovie({ title, poster_path })
    navigate("/booking")
  }

  return (
    isLoading ? <MovieLoader /> :
    <div className="selected-movie">
      {/* <picture>
            <source />
            <img />
          </picture>
      */}
      <figure>
        <img
          src={`https://image.tmdb.org/t/p/original${bg_path ? bg_path : poster_path}`}
          alt="movie-poster"
          className="movie-poster"
        />
      </figure>
      <div className="info">
        <div className="movie-attr">
          <span className='runtime'>{formatRuntime(runtime)}</span>
          <i className='dot-icon'>&#x2022;</i>
          <span className='genres'>{getMovieGenres(genres)}</span>
          <i className='dot-icon'>&#x2022;</i>
          <span className='release-date'>{release_date?.slice(0, 4)}</span>
        </div>
        <h2 className="movie-title">{title}</h2>
        <div className='overview'>{overview}</div>
      </div>

      <div className="cta">
        <button onClick={handleBooking} className="book-btn">Book Now</button>
      </div>
    </div>
  )
}
