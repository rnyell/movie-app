import { lazy, Suspense } from "react"

import Layout from "@components/layouts/layout"
import NotFound from "@pages/not-found"

import { SearchProvider, BookingProvider } from "./store"

import HomePage from "@pages/(home)/page"
import LoginPage from "@pages/login/page"
import Account from "@pages/account/page"
import Discover from "@pages/discover/page"
import MoviesPage from "@pages/discover/movies/page"
import SeriesPage from "@pages/discover/series/page"
import GenrePage from "@pages/discover/genres/page"
import SearchPage from "@pages/search/search-page"
import SelectedMovie from "@pages/(selected-media)/selected-movie/page"
import SelectedSeries from "@pages/(selected-media)/selected-series/page"
import Player from "@pages/player/page"
import ScreenMovies from "@pages/(reservation)/onscreen/page"
import Booking from "@pages/(reservation)/booking/page"
import Tickets from "@pages/(reservation)/tickets/page"

import AuthRoute from "./auth/auth-route"


export const routeTree = [{
  path: "/",
  element: <Layout variant="root" />,
  errorElement: <NotFound />,
  children: [
    { path: "/", element: <Layout variant="primary" />, children: [
      { path: "/", element: <HomePage />, },
      { path: "/discover", element: <Discover /> },
      { path: "/discover/movies", element: <MoviesPage /> },
      { path: "/discover/series", element: <SeriesPage /> },
      { path: "/discover/movies/:id", element: <GenrePage /> },
      { path: "/discover/series/:id", element: <GenrePage /> },
      { path: "/movies/:id", element: <SelectedMovie /> },
      { path: "/series/:id", element: <SelectedSeries /> },
      { path: "/onscreen", element: <ScreenMovies /> },
      { path: "/account", element: (
        <AuthRoute>
          <Account />
        </AuthRoute>
      ) },
      { path: "/tickets", element: <Tickets /> },
    ] },
    { path: "/", element: <Layout variant="secondary" />, children: [
      { path: "/search", element: (
        <SearchProvider>
          <SearchPage />
        </SearchProvider>
      )},
      { path: "/player", element: (
        <AuthRoute>
          <Player />
        </AuthRoute>
      ) },
      { path: "/booking", element: (
        <AuthRoute>
          <BookingProvider>
            <Booking />
          </BookingProvider>
        </AuthRoute>
      ) },
    ] },
    { path: "/login", element: <LoginPage /> }
  ]
}]
