import { lazy, Suspense } from "react"

import Layout from "@components/layouts/layout"
import NotFound from "@pages/not-found"

import { SearchProvider } from "./store"

import HomePage from "@pages/(home)/page"
import Discover from "@pages/discover/page"
import SearchPage from "@pages/search/page"
const MoviesPage = lazy(() => import("@pages/discover/movies/page"))
const SeriesPage = lazy(() => import("@pages/discover/series/page"))
const GenrePage = lazy(() => import("@pages/discover/genres/page"))
const SelectedMovie = lazy(() => import("@pages/(selected-media)/selected-movie/page"))
const SelectedSeries = lazy(() => import("@pages/(selected-media)/selected-series/page"))
const Player = lazy(() => import("@pages/player/page"))
const LoginPage = lazy(() => import("@pages/login/page"))
const Account = lazy(() => import("@pages/account/page"))

import AuthRoute from "./auth/auth-route"


export const routeTree = [{
  path: "/",
  element: <Layout variant="root" />,
  errorElement: <NotFound />,
  children: [
    {
      path: "/",
      element: <Layout variant="primary" />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/discover",
          element: <Discover />
        },
        {
          path: "/discover/movies",
          element: <MoviesPage />,
        },
        {
          path: "/discover/series",
          element: <SeriesPage />
        },
        {
          path: "/discover/movies/:id",
          element: <GenrePage />
        },
        {
          path: "/discover/series/:id",
          element: <GenrePage />
        },
        {
          path: "/movies/:id",
          element: <SelectedMovie />
        },
        {
          path: "/series/:id",
          element: <SelectedSeries />
        },
        {
          path: "/account",
          element: (
            <AuthRoute>
              <Account />
            </AuthRoute>
          )
        },
      ]
    },
    {
      path: "/",
      element: <Layout variant="secondary" />,
      children: [
        {
          path: "/search",
          element: (
            <SearchProvider>
              <SearchPage />
            </SearchProvider>
          )
        },
        {
          path: "/player",
          element: (
            <AuthRoute>
              <Player />
            </AuthRoute>
          )
        },
      ]
    },
    {
      path: "/login",
      element: <LoginPage />
    }
  ]
}]
