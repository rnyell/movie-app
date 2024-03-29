import { useState } from "react"
import { Link } from "react-router-dom"
import { ChevronLeftIcon } from "@heroicons/outline"

import { useSelectedMovie } from '@src/store/app-context'
import Seats from "@components/booking/seats"
import DateTime from "@components/booking/date-time"


export default function Booking() {
  const [ticketsCount, setTicketsCount] = useState(0)
  const [selectMovie] = useSelectedMovie()
  // console.log('re-render') //+ unnecessary renders after selecting seats

  return (
    <div className="booking">
      <header>
        <Link to="/" className="back-btn">
          <i className="icon">
            <ChevronLeftIcon />
          </i>
        </Link>
        <h1 className="movie-title">{selectMovie.title}</h1>
      </header>
      <Seats ticketsCount={ticketsCount} setTicketsCount={setTicketsCount} />
      <DateTime ticketsCount={ticketsCount} />
    </div>
  )
}
