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
const SelectedMovieContext = createContext({})

export function useUserState() {
  return useContext(UserContext)
}

export function useMovieState() {
  return useContext(MoviesContext)
}

export function useSearch() {
  return useContext(SearchContext)
}

export function useSelectedMovie() {
  return useContext(SelectedMovieContext)
}


function userStateInitializer() {
  const played = readLocalStorage("played") ?? []
  const reserved = readLocalStorage("reserved") ?? []
  const bookmarked = readLocalStorage("bookmarked") ?? []
  return { name: "guest", played, reserved, bookmarked }
}

function userStateReducer(state, action) {
  switch (action.type) {
    case "played": {
      return {
        ...state,
        played: [...state.played, action.id],
      }
    }
    case "remove_all_played": {
      return {
        ...state,
        played: [],
      }
    }
    case "reserved": {
      return {
        ...state,
        reserved: [...state.reserved, action.id],
      }
    }
    case "cancel_reserved": {
      const filtered = state.reserved.filter(res => res !== action.id)
      return {
        ...state,
        reserved: [...filtered],
      }
    }
    case "add_bookmark": {
      return {
        ...state,
        bookmarked: [...state.bookmarked, action.id],
      }
    }
    case "remove_bookmark": {
      const filtered = state.bookmarked.filter(b => b !== action.id)
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

// TODO mix search & selected
/*
const moviesInitial = {
  title: "",
  results: [],
  pages: 1,
  selected: ""
}
*/
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

export function AppProvider({ children }) {
  const { country } = useGeoLocation()
  const [userState, userDispatch] = useReducer(userStateReducer, userStateInitializer())
  const [movieState, setMovieState] = useState({ popular: [], screen: [], series: [] })
  const [searchState, searchDispatch] = useReducer(searchReducer, searchInitial)
  const [selectedMovie, setSelectedMovie] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

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
        <SelectedMovieContext.Provider value={[selectedMovie, setSelectedMovie]}>
          <SearchContext.Provider value={[searchState, searchDispatch]}>
            {children}
          </SearchContext.Provider>
        </SelectedMovieContext.Provider>
      </MoviesContext.Provider>
    </UserContext.Provider>
  )
}
