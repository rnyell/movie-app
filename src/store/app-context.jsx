import { createContext, useContext, useEffect, useReducer, useState } from "react"
import { AnimatePresence } from "framer-motion"
import { useGeoLocation } from "@utils/hooks"
import { readLocalStorage } from "@utils/utils"
import { getPopularMovies, getOnScreenMovies, getTrendingMovies, getTrendingSeries } from "@services"
import { InitialLoading, AppLoading } from "@components/ui/skeletons"
import { VPNError } from "@components/ui/errors"


const UserContext = createContext()
const MoviesContext = createContext()

export function useUserState() {
  return useContext(UserContext)
}

export function useMoviesState() {
  return useContext(MoviesContext)
}


function userStateInitializer() {
  const played = readLocalStorage("played") ?? []
  const bookmarked = readLocalStorage("bookmarked") ?? []
  const reserved = readLocalStorage("reserved") ?? []

  return {
    name: "guest",
    country: "unknown",
    played,
    bookmarked,
    reserved,
  }
}

function userStateReducer(state, action) {
  switch (action.type) {
    case "set_country": {
      return {
        ...state,
        country: action.country
      }
    }
    case "played": {
      return {
        ...state,
        played: [...new Set([...state.played, action.id])],
      }
    }
    case "remove_all_played": {
      return {
        ...state,
        played: [],
      }
    }
    case "add_bookmark": {
      const added = {
        media: action.media,
        id: action.id
      }
      return {
        ...state,
        bookmarked: [...state.bookmarked, added],
      }
    }
    case "remove_bookmark": {
      const removed = {
        media: action.media,
        id: action.id
      }
      let filtered = state.bookmarked.filter(bookm => bookm.id !== removed.id)
      // if we have a movie and a tv show with same ids
      if (filtered.length === 2) {
        filtered = filtered.filter(bookm => bookm.media === removed.media)
      }
      return {
        ...state,
        bookmarked: [...filtered],
      }
    }
    case "remove_all_bookmark": {
      return {
        ...state,
        bookmarked: [],
      }
    }
  }
}

const initialMovies = {
  popular: [],
  movies: [],
  series: [],
  screen: [],
}

export default function AppProvider({ children }) {
  const [userState, userDispatch] = useReducer(userStateReducer, userStateInitializer())
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
          <UserContext.Provider value={{userState, userDispatch}}>
            <MoviesContext.Provider value={[moviesState]}>
              {children}
            </MoviesContext.Provider>
          </UserContext.Provider>
        </div>
      )}
    </AnimatePresence>
  )
}
