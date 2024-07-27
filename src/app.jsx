import React, { StrictMode } from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { routeTree } from "./routes"
import { AppProvider } from "./store"

import "./styles.css"
import "./lib/ui/utilities.css"


const router = createBrowserRouter(routeTree)

ReactDOM.createRoot(document.getElementById("root")).render(
  <AppProvider>
    <RouterProvider router={router} />
  </AppProvider>
  // <StrictMode>
  // </StrictMode>
)
