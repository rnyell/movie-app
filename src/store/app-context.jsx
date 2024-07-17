import { createContext, useContext, useEffect, useState } from "react"
import { AnimatePresence } from "framer-motion"
import { useGeoLocation } from "@lib/hooks"
import { getPopularMovies, getOnScreenMovies, getTrendingMovies, getTrendingSeries } from "@services"
import UserProvider from "./user-context"
import { InitialLoading, AppLoading } from "@components/ui/skeletons"
import { VPNError } from "@components/ui/errors"


const MoviesContext = createContext()

export function useMoviesState() {
  return useContext(MoviesContext)
}

const initialMovies = {
  popular: [],
  movies: [],
  series: [],
  screen: [],
}

export default function AppProvider({ children }) {
  const [moviesState, setMoviesState] = useState(initialMovies)
  const [isInitialLoad, setIsInitialLoad] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  // const {country} = useGeoLocation()
  // const isVPNError = country === "IR"
  const isVPNError = false

  useEffect(() => {
    loadMovies()
  }, [])

  //? move it to home-page since it's not a global state
  async function loadMovies() {
    const populargMovies = await getPopularMovies()
    const screenMovies = await getOnScreenMovies()
    const trendingMovies = await getTrendingMovies()
    const trendingSeries = await getTrendingSeries()
    setMoviesState({
      popular: populargMovies,
      movies: trendingMovies,
      series: trendingSeries,
      screen: screenMovies
    })
    setIsLoading(false)
    // setIsInitialLoad(false)
  }


  return (
    <AnimatePresence mode="wait" initial={true}>
      {isLoading ? (
        isInitialLoad ? <InitialLoading /> : <AppLoading />
      ) : isVPNError ? (
        <VPNError />
      ) : (
        <div key="nothing-but-for-AnimatePresence-sake">
          <UserProvider>
            <MoviesContext.Provider value={[moviesState]}>
              {children}
            </MoviesContext.Provider>
          </UserProvider>
        </div>
      )}
    </AnimatePresence>
  )
}
