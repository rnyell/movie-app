import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { StarIcon, BookmarkIcon, FilmIcon, TvIcon } from "@heroicons/outline"

import { getMovieDetails } from "@utils/apis"
import { readLocalStorage } from "@utils/utils"
import { useUserState } from "@src/store/app-context"


export default function Reservation() {
  const {userState, userDispatch} = useUserState()

  return (
    <div className="reservation-page">
      <section className="watchlist-section">
        <header>
          <h4 className="heading">Reserved Tickets</h4>
        </header>
        <div className="tickets-container">
          {userState.reserved.length === 0 ? (
            <div className="empty-tickets-msg empty-msg">
              <p>No movies is reserved yet.</p>
              <p>You can reserve tickets from <Link to="/onscreen">in cinema</Link>.</p>
            </div>
          ) : (
            userState.reserved.map(res => 
              <div className="ticket">
                <h6>{res.title}</h6>
                <div></div>
              </div>
            )
          )}
        </div>
      </section>
    </div>
  )
}
