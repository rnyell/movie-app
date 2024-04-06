import React from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider, createBrowserRouter } from "react-router-dom"

import { AppProvider } from "@src/store/app-context"
import RootLayout from "@src/routes/layout"
import HomePage from "@src/routes/home-page"
import Discover from "@src/routes/discover"
import Reservation from "@src/routes/reservation"
import ResultsPage from "@src/routes/results-page"
import SelectedMovie from "@src/routes/selected-movie"
import Booking from "@src/routes/booking"
import { ErrorPage } from "@components/errors"

import "./main.css"


const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <HomePage />, },
      { path: "/discover", element: <Discover />, children: [
        { path: "/discover/:id", element: <div /> }
      ] },
      { path: "/search", element: <ResultsPage /> },
      { path: "/movies/:id", element: <SelectedMovie /> },
      { path: "/booking", element: <Booking /> },
    ]
  }
])

ReactDOM.createRoot(document.getElementById("root")).render(
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  // <React.StrictMode>
  // </React.StrictMode>
)
