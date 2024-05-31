import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { readLocalStorage } from "@utils/utils"
import { getMovieDetails } from "@services"
import { useUserState } from "@src/store/app-context"
import EmptyTickets from "@components/library/empty-tickets"


export default function Reservation() {
  const {userState} = useUserState()

  return (
    <div className="page reservation-page">
      <section className="watchlist-section">
        <header className="page-header">
          <h2 className="heading">Reserved Tickets</h2>
        </header>
        <div className="tickets-container">
          {userState.reserved.length === 0 ? (
            <EmptyTickets />
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
