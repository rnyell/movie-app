import { useState, useEffect, createContext, useContext } from "react"
import { supabase, getAuthSession } from "@lib/supabase/auth"
import { UserProvider } from "@src/store"

const AuthContext = createContext(null)

export function useAuth() {
  return useContext(AuthContext)
}


export default function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [isLoggedIn, setLogIn] = useState(false)
  const [isLoaded, setLoaded] = useState(false)  // without loading state?

  useEffect(() => {
    initSession()

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        setSession(session)
      }

      /*
      if (event === "SIGNED_IN") {
        welcome notif
      }
      */

      if (event === "SIGNED_OUT") {
        setSession(null)
        setLogIn(false)

        if (location.pathname.includes("/account")) {
          location.pathname = "/"
        }

        /*
        if (anonumous) {
          alert("your data will be missing?")
        }
        */

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
    try {
      const session = await getAuthSession()
      setSession(session)
      if (session) {
        setLogIn(true)
      } else {
        setLogIn(false)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoaded(true)
    }
  }

  const contextValue = { session, isLoggedIn, isLoaded }

  return (
    <AuthContext.Provider value={contextValue}>
      <UserProvider>
        {children}
      </UserProvider>
    </AuthContext.Provider>
  )
}
