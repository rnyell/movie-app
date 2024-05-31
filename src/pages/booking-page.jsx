import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { ChevronLeftIcon } from "@heroicons/outline"
import { IMAGES_URL } from "@services"
import Seats from "@components/booking/seats"
import DateTime from "@components/booking/date-time"


export default function BookingPage() {
  const [ticketsCount, setTicketsCount] = useState(0)
  const location = useLocation()
  const {
    id,
    title,
    poster_path,
    backdrop_path,
    price
  } = location.state


  return (
    <div className="booking-page">
      <div
        className="bg-poster"
        style={{backgroundImage: `linear-gradient(transparent, var(--color-neutral-800) 50%), url(${IMAGES_URL}original${backdrop_path})`}}
      />
      <header>
        <Link to={-1} className="main-btn back-btn">
          <i className="icon">
            <ChevronLeftIcon />
          </i>
        </Link>
        <h1 className="movie-title">{title}</h1>
      </header>
      <section>
        <Seats ticketsCount={ticketsCount} setTicketsCount={setTicketsCount} />
        <DateTime ticketsCount={ticketsCount} price={price} />
      </section>
    </div>
  )
}
