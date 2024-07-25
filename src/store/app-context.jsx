import { createContext, useContext, useState } from "react"
import { AnimatePresence } from "framer-motion"
import { useLoader } from "@lib/hooks"
import { getPopularMovies, getOnScreenMovies, getTrendingMovies, getTrendingSeries } from "@services"
import { InitialLoading, AppLoading } from "@components/skeletons"
import UserProvider from "./user-context"
import ThemeProvider from "./theme-context"


const MoviesContext = createContext(null)

export function useMoviesState() {
  return useContext(MoviesContext)
}


export default function AppProvider({ children }) {
  const [isInitialLoad, setIsInitialLoad] = useState(true)

  const {data: moviesState, isLoading, error} = useLoader(loadMovies)

  async function loadMovies() {
    const popularMovies = getPopularMovies()
    const screenMovies = getOnScreenMovies()
    const trendingMovies = getTrendingMovies()
    const trendingSeries = getTrendingSeries()

    const [popular, screen, movies, series] = await Promise.all([
      popularMovies, screenMovies, trendingMovies, trendingSeries
    ])

    return { popular, movies, series, screen }
  }


  return (
    <AnimatePresence mode="wait" initial={true}>
      {isLoading ? (
        isInitialLoad ? <InitialLoading /> : <AppLoading />
      ) : (
        <div key="nothing-but-for-AnimatePresence-sake" data-presence>
          <ThemeProvider>
            <UserProvider>
              <MoviesContext.Provider value={[moviesState]}>
                {children}
              </MoviesContext.Provider>
            </UserProvider>
          </ThemeProvider>
        </div>
      )}
    </AnimatePresence>
  )
}
