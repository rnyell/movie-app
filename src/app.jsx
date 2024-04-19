import React from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider, createBrowserRouter } from "react-router-dom"

import AppProvider from "@src/store/app-context"

import RootLayout from "@src/routes/layouts/root-layout"
import SharedLayout from "@src/routes/layouts/shared-layout"

import HomePage from "@src/routes/home-page"
import PlayerPage from "@src/routes/player-page"
import Discover from "@src/routes/discover/discover"
import MoviesPage from "@src/routes/discover/movies-page"
import SeriesPage from "@src/routes/discover/series-page"
import NewsPage from "@src/routes/discover/news-page"
import Article from "@src/routes/discover/article"
import ResultsPage from "@src/routes/results-page"
import SelectedMovie from "@src/routes/selected-movie"

import Reservation from "@src/routes/user-related/reservation"
import OnScreenPage from "@src/routes/user-related/onscreen-page"
import UserStuff from "@src/routes/user-related/user-stuff"
import BookingPage from "@src/routes/booking-page"

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
        { path: "/your-stuff", element: <UserStuff /> },
        { path: "/discover", element: <Discover />, children: [
          { path: "/discover/movies", element: <MoviesPage /> },
          { path: "/discover/series", element: <SeriesPage /> },
          { path: "/discover/news", element: <NewsPage /> },
          { path: "/discover/news/:id", element: <Article /> },
        ] },
      ] },
      { path: "/player", element: <PlayerPage /> },
      { path: "/search", element: <ResultsPage /> },
      { path: "/booking", element: <BookingPage /> },
      { path: "/:id", element: <SelectedMovie /> },
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
