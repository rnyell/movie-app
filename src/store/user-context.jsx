import { createContext, useContext, useEffect, useReducer, useState } from "react"
import { readLocalStorage } from "@utils/utils"
import { supabase } from "@src/auth/supabase"

const UserContext = createContext(null)

export function useUserContext() {
  return useContext(UserContext)
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


export default function UserProvider({ children }) {
  const [userState, userDispatch] = useReducer(userStateReducer, userStateInitializer())
  const [session, setSession] = useState()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  const values = {
    session,
    userState,
    userDispatch,
  }


  return (
    <UserContext.Provider value={values}>
      {children}
    </UserContext.Provider>
  )
}
