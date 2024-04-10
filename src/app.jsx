import React from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider, createBrowserRouter } from "react-router-dom"

import RootLayout from "@src/routes/layout"
import HomePage from "@src/routes/home-page"
import Discover from "@src/routes/discover/discover"
import MoviesPage from "@src/routes/discover/movies-page"
import SeriesPage from "@src/routes/discover/series-page"
import NewsPage from "@src/routes/discover/news-page"
import Article from "@src/routes/discover/article"
import ResultsPage from "@src/routes/results-page"
import Reservation from "@src/routes/reservation"
import UserStuff from "@src/routes/user-stuff"
import SelectedMovie from "@src/routes/selected-movie"
import Booking from "@src/routes/booking"
import Player from "@src/routes/player"

import { ErrorPage } from "@components/errors"
import { AppProvider } from "@src/store/app-context"

import "./main.css"


const routes = [
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <HomePage />, },
      { path: "/discover", element: <Discover />, children: [
        { path: "/discover/movies", element: <MoviesPage /> },
        { path: "/discover/series", element: <SeriesPage /> },
        { path: "/discover/news", element: <NewsPage /> },
        { path: "/discover/news/:id", element: <Article /> },
        // { path: "/discover/:id", element: <div /> }
      ] },
      { path: "/player", element: <Player /> },
      { path: "/reservation", element: <Reservation /> },
      { path: "/your-stuff", element: <UserStuff /> },
      { path: "/search", element: <ResultsPage /> },
      { path: "/movies/:id", element: <SelectedMovie /> },
      { path: "/booking", element: <Booking /> },
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
