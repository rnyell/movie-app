import { createClient } from "@supabase/supabase-js"

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export function signInWithGoogle() {
  supabase.auth.signInWithOAuth({ provider: "google" })
}

// export async function signInAnonymously() {
//   const { data, error } = await supabase.auth.signInAnonymously()
//   if (error) {
//     console.log(error)
//   }
// }

export async function getAuthSession() {
  const { data, error } = await supabase.auth.getSession()
  const { session } = data

  if (error) {
    console.log("Session error")
    console.log(error)
  }

  return session
}

export async function getAuthUser() {
  const { data, error } = await supabase.auth.getSession()
  const { user } = data

  if (error) {
    console.log("User error")
    console.log(error)
  }

  return user
}

export async function getUserId() {
  const { data, error } = await supabase.auth.getUser()
  const { user } = data

  if (error) {
    console.log("Fetching user failed...")
    console.log(error)
  }

  return user?.id
}
