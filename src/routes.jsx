import { lazy, Suspense } from "react"

import Layout from "@components/layouts/layout"

import SearchProvider from "@src/store/search-context"
import BookingProvider from "@src/store/booking-context"

import HomePage from "@pages/page"
import Discover from "@pages/discover/page"
import MoviesPage from "@pages/discover/movies/page"
import SeriesPage from "@pages/discover/series/page"
import GenrePage from "@pages/discover/genres/page"
import SearchPage from "@pages/search/search-page"
import SelectedMovie from "@pages/(selected-media)/selected-movie/page"
import SelectedSeries from "@pages/(selected-media)/selected-series/page"
import Tickets from "@pages/(reservation)/tickets/tickets"
import ScreenMovies from "@pages/(reservation)/onscreen/page"
import Booking from "@pages/(reservation)/booking/page"
import Account from "@pages/account/page"
import Player from "@pages/player/page"

import NotFound from "@pages/not-found"


export const routeTree = [{
  path: "/",
  // element: <Layout variant="root" />,
  errorElement: <NotFound />,
  children: [
    { path: "/", element: <Layout variant="primary" />, children: [
      { path: "/", element: <HomePage />, },
      { path: "/discover", element: <Discover /> },
      { path: "/discover/movies", element: <MoviesPage /> },
      { path: "/discover/series", element: <SeriesPage /> },
      { path: "/discover/movies/:id", element: <GenrePage /> },
      { path: "/discover/series/:id", element: <GenrePage /> },
      { path: "/tickets", element: <Tickets /> },
      { path: "/onscreen", element: <ScreenMovies /> },
      { path: "/movies/:id", element: <SelectedMovie /> },
      { path: "/series/:id", element: <SelectedSeries /> },
      { path: "/account", element: <Account /> },
    ] },
    { path: "/", element: <Layout variant="secondary" />, children: [
      { path: "/search", element: (
        <SearchProvider>
          <SearchPage />
        </SearchProvider>
      )},
      { path: "/player", element: <Player /> },
      { path: "/booking", element: (
        <BookingProvider>
          <Booking />
        </BookingProvider>
      ) },
    ] },
  ]
}]
