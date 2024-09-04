import { lazy, Suspense } from "react"

import AuthRoute from "./auth/auth-route"

import { SearchProvider } from "./store"

import Layout from "@components/layouts/layout"

import HomePage from "@pages/(home)/page"
import Discover from "@pages/discover/page"
import SearchPage from "@pages/search/page"
import LoginPage from "@pages/login/page"
import NotFound from "@pages/not-found"

const MoviesPage = lazy(() => import("@pages/discover/movies/page"))
const SeriesPage = lazy(() => import("@pages/discover/series/page"))
const GenrePage = lazy(() => import("@pages/discover/genres/page"))
const SelectedMovie = lazy(() => import("@pages/(selected-media)/selected-movie/page"))
const SelectedSeries = lazy(() => import("@pages/(selected-media)/selected-series/page"))
const PublicLists = lazy(() => import("@pages/lists/page"))
const SelectedList = lazy(() => import("@pages/lists/[share-id]/page"))
const Account = lazy(() => import("@pages/account/page"))
const UserLists = lazy(() => import("@pages/account/lists/page"))
const Player = lazy(() => import("@pages/player/page"))


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
          element: <Discover />,
        },
        {
          path: "/discover/movies",
          element: (
            <Suspense fallback={null}>
              <MoviesPage />
            </Suspense>
          ),
        },
        {
          path: "/discover/series",
          element: (
            <Suspense fallback={null}>
              <SeriesPage />
            </Suspense>
          )
        },
        {
          path: "/discover/genres",
          element: (
            <Suspense fallback={null}>
              <GenrePage />
            </Suspense>
          )
        },
        {
          path: "/movies/:id",
          element: (
            <Suspense fallback={null}>
              <SelectedMovie />
            </Suspense>
          )
        },
        {
          path: "/series/:id",
          element: (
            <Suspense fallback={null}>
              <SelectedSeries />
            </Suspense>
          )
        },
        {
          path: "/account",
          element: (
            <AuthRoute>
              <Suspense fallback={null}>
                <Account />
              </Suspense>
            </AuthRoute>
          )
        },
        {
          path: "/account/lists",
          element: (
            <Suspense fallback={null}>
              <UserLists />
            </Suspense>
          )
        },
        {
          path: "/lists",
          element: (
            <Suspense fallback={null}>
              <PublicLists />
            </Suspense>
          )
        },
        {
          path: "/lists/:shareId",
          element: (
            <Suspense fallback={null}>
              <SelectedList />
            </Suspense>
          )
        }
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
              <Suspense fallback={null}>
                <Player />
              </Suspense>
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
