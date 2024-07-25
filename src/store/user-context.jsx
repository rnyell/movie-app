import { createContext, useContext, useEffect, useReducer, useState } from "react"
import { supabase, getAuthSession } from "@src/lib/supabase/auth"
import { getUserProfile, getUserLists } from "@src/lib/supabase/db"

const UserContext = createContext(null)

export function useUserContext() {
  return useContext(UserContext)
}

const userInitial = {
  id: null,
  name: "",
  username: "",
  playedMovies: [],
  playedSeries: [],
  lists: [],
  // liked: [],
  // reserved: [],
}

function userReducer(state, action) {
  switch (action.type) {
    case "init": {
      return { ...action.state }
    }
  }
}


export default function UserProvider({ children }) {
  const [userState, userDispatch] = useReducer(userReducer, userInitial)
  const [session, setSession] = useState()

  useEffect(() => {
    initSession()
  
    initUserState().then(data => 
      userDispatch({type: "init", state: data})
    )

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        setSession(session)
      }

      if (event === 'SIGNED_OUT') {
        setSession(null)
        [localStorage, sessionStorage].forEach((storage) => {
          Object.entries(storage)
            .forEach(([key]) => {
              storage.removeItem(key)
            })
        })
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  async function initSession() {
    const session = await getAuthSession()
    setSession(session)
  }

  async function initUserState() {
    const profile = await getUserProfile()

    const {
      id,
      username,
      full_name,
      avatar_url,
      played_movies,
      played_series,
    } = profile

    const playedMovies = played_movies ?? []
    const playedSeries = played_series ?? []
    const lists = await getUserLists()
  
    return {
      id,
      username,
      name: full_name,
      avatarUrl: avatar_url,
      playedMovies,
      playedSeries,
      lists,
    }
  }

  const contextValue = { session, userState }


  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  )
}
