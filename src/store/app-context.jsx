import { createContext, useContext, useReducer } from "react"
import { AnimatePresence } from "framer-motion"
import { useLoader } from "@lib/hooks"
import {
  getPopularMovies,
  getTrendingMovies,
  getTrendingSeries,
} from "@services"
import { InitialLoading, AppLoading } from "@components/skeletons"
import AuthProvider from "@src/auth/auth-context"
import ThemeProvider from "./theme-context"

const AppContext = createContext(null)

export function useAppContext() {
  return useContext(AppContext)
}

const modalsInit = {
  variant: null,
  isOpen: false,
  data: {},
}

function modalReducer(state, action) {
  switch (action.type) {
    case "watch": {
      return {
        variant: "watch",
        isOpen: true,
        data: {
          errMsg: "You need to be logged in to watch movies!",
        },
      }
    }
    case "save": {
      return {
        variant: "lists",
        isOpen: true,
        data: {
          id: action.data.id,
          media: action.data.media,
          errMsg:
            "You need to be logged in to save movies and create watchlists.",
        },
      }
    }
    case "fave": {
      return {
        variant: "fave_toast",
        isOpen: true,
        data: {
          msg: "Added to your favorites!",
          errMsg: "Like it? Log in to create favorite lists",
        },
      }
    }
    case "movie_info": {
      return {
        variant: "movie_info",
        isOpen: true,
        data: {
          result: action.data.result,
          media: action.data.media,
        },
      }
    }
    case "movie_details": {
      return {
        variant: "movie_details",
        isOpen: true,
        data: {
          result: action.data.result,
          price: action.data.price,
        },
      }
    }
    case "confirmation": {
      return {
        variant: "confirmation",
        isOpen: true,
        data: {
          msg: action.data.msg,
          onConfirm: action.data.onConfirm
        },
      }
    }
    case "none": {
      return modalsInit
    }
  }
}

export default function AppProvider({ children }) {
  const isInitialLoad = false
  const [modals, modalDispatch] = useReducer(modalReducer, modalsInit)

  const { data: moviesState, isLoading, error } = useLoader(loadMovies)

  async function loadMovies() {
    const p1 = getPopularMovies()
    const p2 = getTrendingMovies()
    const p3 = getTrendingSeries()

    const [popular, movies, series] = await Promise.all([p1, p2, p3])

    return { popular, movies, series }
  }

  // a `setLoading(true)` to start app loading on some async jobs like logout
  const contextValue = { moviesState, modals, modalDispatch }

  return (
    // sync or wait??
    <AnimatePresence mode="wait" initial={true}>
      {isLoading ? (
        isInitialLoad ? (
          <InitialLoading />
        ) : (
          <AppLoading />
        )
      ) : (
        <div key="nothing-but-for-AnimatePresence" data-presence>
          <AppContext.Provider value={contextValue}>
            <ThemeProvider>
              <AuthProvider>{children}</AuthProvider>
            </ThemeProvider>
          </AppContext.Provider>
        </div>
      )}
    </AnimatePresence>
  )
}
