import RootLayout from "@src/pages/layouts/root-layout"
import MainLayout from "@src/pages/layouts/main-layout"
import SecondaryLayout from "@src/pages/layouts/secondary-layout"

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
import Reservation from "@src/pages/reservation/reservation"
import OnScreenPage from "@src/pages/reservation/onscreen-page"
import Library from "@src/pages/library"
import PlayerPage from "@src/pages/player-page"
import BookingProvider from "@src/store/booking-context"
import BookingPage from "@src/pages/booking-page"

import { ErrorPage } from "@components/ui/errors"


export const routeTree = [{
  path: "/",
  element: <RootLayout />,
  errorElement: <ErrorPage />,
  children: [
    { path: "/", element: <MainLayout />, children: [
      { path: "/", element: <HomePage />, },
      { path: "/discover", element: <Discover />, children: [
        { path: "/discover/movies", element: <MoviesPage /> },
        { path: "/discover/series", element: <SeriesPage /> },
        { path: "/discover/movies/:id", element: <GenrePage /> },
        { path: "/discover/series/:id", element: <GenrePage /> },
        // { path: "/discover/news", element: <NewsPage /> },
        // { path: "/discover/news/:id", element: <Article /> },
      ] },
      { path: "/reservation", element: <Reservation /> },
      { path: "/onscreen", element: <OnScreenPage /> },
      { path: "/library", element: <Library /> },
      { path: "/movies/:id", element: <SelectedMovie /> },
      { path: "/series/:id", element: <SelectedSeries /> },
    ] },
    { path: "/", element: <SecondaryLayout />, children: [
      { path: "/search", element: (
        <SearchProvider>
          <SearchPage />
        </SearchProvider>
      )},
      { path: "/player", element: <PlayerPage /> },
      { path: "/booking", element: (
        <BookingProvider>
          <BookingPage />
        </BookingProvider>
      ) },
    ] },
  ]
}]
