import React from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider, createBrowserRouter } from "react-router-dom"

import { MovieProvider } from "@src/store/app-context"
import RootLayout from "@src/routes/layout"
import HomePage from "@src/routes/home-page"
import SearchResults from "@src/routes/search-results"
import SelectedMovie from "@src/routes/selected-movie"
import Booking from "@src/routes/booking"
import Ticket from "@src/routes/ticket"
import { ErrorPage } from "@components/errors"

import "./main.css"


const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <HomePage />, },
      { path: "/search", element: <SearchResults /> },
      { path: "/movies/:id", element: <SelectedMovie /> },
      { path: "/booking", element: <Booking /> },
      { path: "/ticket", element: <Ticket /> }
    ]
  }
])

ReactDOM.createRoot(document.getElementById("root")).render(
    <MovieProvider>
      <RouterProvider router={router} />
    </MovieProvider>
  // <React.StrictMode>
  // </React.StrictMode>
)
