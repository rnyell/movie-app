import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { routeTree } from "./routes"
import { AppProvider } from "./store"

import "./app.css"

const shell = document.getElementById("shell")
const root = createRoot(shell)
const router = createBrowserRouter(routeTree)

const app = (
  // <StrictMode></StrictMode>
  <AppProvider>
    <RouterProvider router={router} />
  </AppProvider>
)

root.render(app)
