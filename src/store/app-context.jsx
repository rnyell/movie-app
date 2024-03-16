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
  getOnScreenMovies
} from "@src/utils/apis"

const AppContext = createContext()
const SearchContext = createContext([])
const SelectedMovieContext = createContext({})

export function useAppState() {
  return useContext(AppContext)
}

export function useSearch() {
  return useContext(SearchContext)
}

export function useSelectedMovie() {
  return useContext(SelectedMovieContext)
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

export function MovieProvider({ children }) {
  const [appState, setAppState] = useState({
    popular: [],
    screen: []
  })
  const [searchState, searchDispatch] = useReducer(searchReducer, searchInitial)
  const [selectedMovie, setSelectedMovie] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    const popularMovies = await getPopularMovies()
    const screenMovies = await getOnScreenMovies()
    setAppState({
      popular: popularMovies,
      screen: screenMovies
    })
    setIsLoading(false)
  }

  return (
    isLoading ? <h1>loading app...</h1> :
    <AppContext.Provider value={[appState]}>
      <SelectedMovieContext.Provider value={[selectedMovie, setSelectedMovie]}>
        <SearchContext.Provider value={[searchState, searchDispatch]}>
          {children}
        </SearchContext.Provider>
      </SelectedMovieContext.Provider>
    </AppContext.Provider>
  )
}
