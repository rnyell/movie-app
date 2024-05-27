import React from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider, createBrowserRouter } from "react-router-dom"

import AppProvider from "@src/store/app-context"
import SearchProvider from "@src/store/search-context"

import RootLayout from "@src/pages/layouts/root-layout"
import SharedLayout from "@src/pages/layouts/shared-layout"
import HomePage from "@src/pages/home-page"
import Discover from "@src/pages/discover/discover"
import MoviesPage from "@src/pages/discover/movies-page"
import SeriesPage from "@src/pages/discover/series-page"
import NewsPage from "@src/pages/discover/news-page"
import Article from "@src/pages/discover/article"
import SearchPage from "@src/pages/search-page"
import SelectedMovie from "@src/pages/selected-movie"
import SelectedSeries from "@src/pages/selected-series"
import PlayerPage from "@src/pages/player-page"
import Reservation from "@src/pages/reservation/reservation"
import OnScreenPage from "@src/pages/reservation/onscreen-page"
import Library from "@src/pages/library"
import BookingPage from "@src/pages/booking-page"
import { ErrorPage } from "@components/errors"

import "./main.css"


const routes = [
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <HomePage />, },
      { path: "/", element: <SharedLayout />, children: [
        { path: "/reservation", element: <Reservation /> },
        { path: "/onscreen", element: <OnScreenPage /> },
        { path: "/library", element: <Library /> },
        { path: "/movies/:id", element: <SelectedMovie /> },
        { path: "/series/:id", element: <SelectedSeries /> },
        { path: "/discover", element: <Discover />, children: [
          { path: "/discover/movies", element: <MoviesPage /> },
          { path: "/discover/series", element: <SeriesPage /> },
          { path: "/discover/news", element: <NewsPage /> },
          { path: "/discover/news/:id", element: <Article /> },
        ] },
      ] },
      { path: "/search", element: (
        <SearchProvider>
          <SearchPage />
        </SearchProvider>
      )},
      { path: "/player", element: <PlayerPage /> },
      { path: "/booking", element: <BookingPage /> },
    ]
  }
]

const router = createBrowserRouter(routes)

ReactDOM.createRoot(document.getElementById("root")).render(
  <AppProvider>
    <RouterProvider router={router} />
  </AppProvider>
  // <React.StrictMode>
  // </React.StrictMode>
)
