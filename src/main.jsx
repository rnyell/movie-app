import React from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider, createBrowserRouter } from "react-router-dom"

import { MovieProvider } from "./store/app-context"
import RootLayout from "./routes/layout"
import ErrorPage from "./routes/404"
import Home from "./routes/home"
import SearchResults from "./routes/search-results"
import SelectedMovie from "./routes/selected-movie"
import Booking from "./routes/booking"
import Ticket from "./routes/ticket"

import "./main.css"


const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home />, },
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
