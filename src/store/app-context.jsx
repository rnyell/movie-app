import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react"

import {
  getPopularMovies,
  getComingMovies,
  getOnScreenMovies,
  getTrendingSeries,
} from "@src/utils/apis"
import { readLocalStorage } from "@src/utils/utils"
import { useGeoLocation } from "@src/utils/hooks"
import { AppLoadingSkeleton } from "@components/skeletons"
import { VPNError } from "@components/errors"

const UserContext = createContext()
const MoviesContext = createContext()
const SearchContext = createContext([])

export function useUserState() {
  return useContext(UserContext)
}

export function useMovieState() {
  return useContext(MoviesContext)
}

export function useSearch() {
  return useContext(SearchContext)
}


function userStateInitializer() {
  const reserved = readLocalStorage("reserved") ?? []
  const played = readLocalStorage("played") ?? []
  const bookmarked = readLocalStorage("bookmarked") ?? []
  return { name: "guest", reserved, played, bookmarked }
}

function userStateReducer(state, action) {
  switch (action.type) {
    case "reserved": {
      const info = {
        id: action.id,
        title: action.title,
        imgUrl: action.imgUrl,
        count: action.count,
        price: action.price,
        place: action.place
      }
      return {
        ...state,
        reserved: [...state.reserved, info],
      }
    }
    case "cancel_reserved": {
      const filtered = state.reserved.filter(res => res.id !== action.id)
      return {
        ...state,
        reserved: [...filtered],
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
      return {
        ...state,
        bookmarked: [...state.bookmarked, action.id],
      }
    }
    case "remove_bookmark": {
      const filtered = state.bookmarked.filter(bookm => bookm !== action.id)
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

const searchInitial = {
  title: "",
  results: [],
  pages: 1,
}

function searchReducer(state, action) {
  switch (action.type) {
    case "set_search": {
      return {
        ...state,
        results: action.results,
        pages: action.pages,
      }
    }
    case "page_changed": {
      return {
        ...state,
        results: action.results,
      }
    }
    case "set_error": {
      return {
        results: [],
        pages: 0,
      }
    }
  }
}

export default function AppProvider({ children }) {
  const { country } = useGeoLocation()
  const [userState, userDispatch] = useReducer(userStateReducer, userStateInitializer())
  const [movieState, setMovieState] = useState({ popular: [], screen: [], series: [] })
  const [searchState, searchDispatch] = useReducer(searchReducer, searchInitial)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  //? move it to home-page since it's not a global state
  async function loadData() {
    // TODO: Promise.all
    const populargMovies = await getPopularMovies()
    const screenMovies = await getOnScreenMovies()
    const trendingSeries = await getTrendingSeries()
    setMovieState({
      popular: populargMovies,
      screen: screenMovies,
      series: trendingSeries,
    })
    setIsLoading(false)
  }
  
  return isLoading ? (
    <AppLoadingSkeleton />
  ) : country === "IR" ? (
    <VPNError />
  ) : (
    <UserContext.Provider value={{userState, userDispatch}}>
      <MoviesContext.Provider value={[movieState]}>
        <SearchContext.Provider value={[searchState, searchDispatch]}>
          {children}
        </SearchContext.Provider>
      </MoviesContext.Provider>
    </UserContext.Provider>
  )
}
