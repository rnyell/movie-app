import { useEffect, useState } from "react"
import { StarIcon, BookmarkIcon, FilmIcon, TvIcon } from "@heroicons/outline"
import { getMovieDetails } from "@src/utils/apis"
import { readLocalStorage } from "@src/utils/utils"
import SideNav from "@components/sidenav"
import Header from "@components/header"
import MovieCard from "@components/movie/movie-card"

export default function Reservation() {
  return (
    <div className="reservation-page main-layout">
      <SideNav />
      <main>
        <Header dataset="discover default" />
        <section className="watchlist-section">
          <h4 className="heading">Reserved Tickets</h4>
          
        </section>
      </main>
    </div>
  )
}
