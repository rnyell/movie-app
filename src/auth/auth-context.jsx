import { useState, useEffect, createContext, useContext } from "react"
import { supabase, getAuthSession } from "@src/lib/supabase/auth"
import { UserProvider } from "@src/store"

const AuthContext = createContext(null)

export function useAuth() {
  return useContext(AuthContext)
}


export default function AuthProvider({ children }) {
  const [isLoaded, setLoaded] = useState(false)  // without loading state?
  const [session, setSession] = useState(null)

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
    } catch (err) {
      console.error(err)
    } finally {
      setLoaded(true)
    }
  }


  return (
    <AuthContext.Provider value={{session, isLoaded}}>
      <UserProvider>
        {children}
      </UserProvider>
    </AuthContext.Provider>
  )
}
