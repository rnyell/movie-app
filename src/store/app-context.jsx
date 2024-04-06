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
  getTrendingSeries
} from "@src/utils/apis"
import { AppLoadingSkeleton } from "@components/skeletons"


const UserContext = createContext()
const MoviesContext = createContext()
const SearchContext = createContext([])
const SelectedMovieContext = createContext({})

export function useUserStae() {
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


const userInitial = {
  name: "guest",
  reserved: [],
  bookmarked: []
}

function userReducer(state, action) {
  switch (action.type) {
    case "reserved": {
      return {
        ...state,
        reserved: [...state.reserved, action.id],
      }
    }
    case "bookmarked": {
      return {
        ...state,
        bookmarked: [...state.bookmarked, action.id]
      }
    }
    case "remove_bookmarked": {
      return {
        ...state,
        bookmarked: []
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
        pages: action.pages
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
        pages: 0
      }
    }
  }
}

export function AppProvider({ children }) {
  const [userState, userDispatch] = useReducer(userReducer, userInitial)
  const [movieState, setMovieState] = useState({
    popular: [],
    screen: [],
    series: []
  })
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
      series: trendingSeries
    })
    setIsLoading(false)
  }

  return (
    isLoading ? <AppLoadingSkeleton /> :
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
