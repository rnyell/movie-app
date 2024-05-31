import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { ChevronLeftIcon } from "@heroicons/outline"
import Seats from "@components/booking/seats"
import DateTime from "@components/booking/date-time"


export default function BookingPage() {
  const [ticketsCount, setTicketsCount] = useState(0)
  const { state } = useLocation()
  // console.log('re-render') //+ unnecessary renders after selecting seats

  return (
    <div className="page booking-page">
      <header>
        <Link to={-1} className="back-btn">
          <i className="icon">
            <ChevronLeftIcon />
          </i>
        </Link>
        <h1 className="movie-title">{state?.title}</h1>
      </header>
      <Seats ticketsCount={ticketsCount} setTicketsCount={setTicketsCount} />
      <DateTime ticketsCount={ticketsCount} />
    </div>
  )
}
