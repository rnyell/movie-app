import { readLocalStorage, monthObj } from "@lib/utils"
import { ViewTransition } from "@lib/motion"
import Page from "@components/layouts/page"
import EmptyTickets from "./_components/empty-tickets"


export default function Tickets() {
  const reservedMovies = readLocalStorage("reserved")

  return (
    <ViewTransition>
      <Page pageName="reservation-page">
        <section className="watchlist-section">
          <header className="page-header">
            <h2 className="heading">Reserved Tickets</h2>
          </header>
          <div className="tickets-container">
            {reservedMovies?.length === 0 ? (
              <EmptyTickets />
            ) : (
              reservedMovies?.map(res => 
                <div className="ticket flex-col">
                  <h5 className="title">{res.title}</h5>
                  <div className="date-time">{res.date} {monthObj[new Date().getMonth()]} | {res.time}</div>
                  <div>{res.count} {`${res.count > 1 ? "Seats" : "Seat"}`}</div>
                  <div>{res.seats.map(seat => <span key={seat}>{seat}</span>)}</div>
                </div>
              )
            )}
          </div>
        </section>
      </Page>
    </ViewTransition>
  )
}
