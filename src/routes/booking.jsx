import { useState } from "react"
import { Link } from "react-router-dom"

import { useSelectedMovie } from '../store/app-context'
import Seats from "../components/booking/seats"
import DateTime from "../components/booking/date-time"

import "../components/styles/booking.css"


export default function Booking() {
  const [ticketsCount, setTicketsCount] = useState(0)
  const [selectMovie, setSelectMovie] = useSelectedMovie()
  // console.log('re-render') //+ unnecessary renders after selecting seats

  return (
    <div className="booking">
      <header>
        <Link to="/" className="back-btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
        </Link>
        <h1 className="movie-title">{selectMovie.title}</h1>
      </header>
      <Seats ticketsCount={ticketsCount} setTicketsCount={setTicketsCount} />
      <DateTime ticketsCount={ticketsCount} />
    </div>
  )
}
