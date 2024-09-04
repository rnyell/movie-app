import { createContext, useContext, useEffect, useState } from "react"
import { useAuth } from "@src/auth/auth-context"
import { getUserListsCount, getUserProfile } from "@lib/supabase/db"

const UserContext = createContext(null)

export function useUserContext() {
  return useContext(UserContext)
}

const userInitial = {
  id: null,
  username: "",
  email: "",
  fullName: "",
  avatarUrl: "",
  listsCount: 1,
  isAnonymous: false,
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
    const listsCount = await getUserListsCount()
    const isAnonymous = session?.user?.is_anonymous

    const {
      id,
      username,
      email,
      full_name,
      avatar_url,
    } = profile

    setUserState({
      id,
      username,
      email,
      fullName: full_name,
      avatarUrl: avatar_url,
      listsCount,
      isAnonymous
    })
  }

  const contextValue = { userState, setUserState }

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  )
}
