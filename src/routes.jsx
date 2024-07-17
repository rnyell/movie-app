import { lazy, Suspense } from "react"

import Layout from "@components/ui/layouts/layout"
import { ErrorPage } from "@components/ui/errors"

import HomePage from "@src/pages/home-page"
import Discover from "@src/pages/discover/discover"
import MoviesPage from "@src/pages/discover/movies-page"
import SeriesPage from "@src/pages/discover/series-page"
import GenrePage from "@src/pages/discover/genre-page"
// import NewsPage from "@src/pages/discover/news-page"
// import Article from "@src/pages/discover/article"
import SearchProvider from "@src/store/search-context"
import SearchPage from "@src/pages/search-page"
import SelectedMovie from "@src/pages/selected-movie"
import SelectedSeries from "@src/pages/selected-series"
import Tickets from "@src/pages/reservation/reservation"
import ScreenMovies from "@src/pages/reservation/screen-movies"
import AccountProvider from "@src/store/account-context"
import Account from "@src/pages/account"
import Player from "@src/pages/player"
import BookingProvider from "@src/store/booking-context"
import BookingPage from "@src/pages/booking-page"


export const routeTree = [{
  path: "/",
  element: <Layout variant="root" />,
  errorElement: <ErrorPage />,
  children: [
    { path: "/", element: <Layout variant="primary" />, children: [
      { path: "/", element: <HomePage />, },
      { path: "/discover", element: <Discover /> },
      { path: "/discover/movies", element: <MoviesPage /> },
      { path: "/discover/series", element: <SeriesPage /> },
      { path: "/discover/movies/:id", element: <GenrePage /> },
      { path: "/discover/series/:id", element: <GenrePage /> },
      // { path: "/discover/news", element: <NewsPage /> },
      // { path: "/discover/news/:id", element: <Article /> },
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
          <BookingPage />
        </BookingProvider>
      ) },
    ] },
  ]
}]
