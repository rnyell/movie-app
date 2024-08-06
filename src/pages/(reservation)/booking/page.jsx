import { useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { ChevronLeftIcon } from "@heroicons/outline"
import { IMAGES_URL } from "@services"
import { useWindowOffsets } from "@lib/hooks"
import { useBookingData } from "@src/store"
import { ViewTransition } from "@lib/motion"
import { Button, Divider, Icon } from "@lib/ui/components"
import Seats from "./_components/seats"
import DateTime from "./_components/date-time"


export default function Booking() {
  const {ticketDispatch} = useBookingData()
  const {windowWidth} = useWindowOffsets()
  const location = useLocation()
  const {
    id,
    title,
    poster_path,
    backdrop_path,
    price
  } = location.state

  useEffect(() => {
    ticketDispatch({
      type: "select_movie",
      id,
      title,
      poster: poster_path,
      price,
    })
  }, [])


  return (
    <ViewTransition>
      <div className="booking-page">
        <div
          className="bg-poster"
          style={{backgroundImage: `linear-gradient(transparent, var(--color-neutral-950) 50%), url(${IMAGES_URL}original${backdrop_path})`}}
        />
        <header>
          <Button variants="solid-blured" size="square-md">
            <Link to={-1} className="btn">
              <Icon svg={<ChevronLeftIcon />} />
            </Link>
          </Button>
          <h1 className="movie-title">{title}</h1>
        </header>
        <section>
          <Seats />
          {windowWidth <= 890 && <Divider variant="bold" />}
          <DateTime />
        </section>
      </div>
    </ViewTransition>
  )
}
