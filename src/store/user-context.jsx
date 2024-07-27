import { createContext, useContext, useEffect, useState } from "react"
import { useAuth } from "@src/auth/auth-context"
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
}


export default function UserProvider({ children }) {
  const { session, isLoaded } = useAuth()
  const [userState, setUserState] = useState(userInitial)

  useEffect(() => {
    if (session) {
      initUserState()
      console.warn('<UserProvider> rendered')
    }
  }, [isLoaded])

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
  
    setUserState({
      id,
      username,
      name: full_name,
      avatarUrl: avatar_url,
      playedMovies,
      playedSeries,
      lists,
    })
  }

  return (
    <UserContext.Provider value={{userState, setUserState}}>
      {children}
    </UserContext.Provider>
  )
}
