import React, { StrictMode } from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { routeTree } from "./routes"
import AppProvider from "@src/store/app-context"
import "./styles.css"


const router = createBrowserRouter(routeTree)

ReactDOM.createRoot(document.getElementById("root")).render(
  <AppProvider>
    <RouterProvider router={router} />
  </AppProvider>
  // <StrictMode>
  // </StrictMode>
)
