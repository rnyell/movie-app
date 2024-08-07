import { createClient } from "@supabase/supabase-js"

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function signInWithGoogle() {
  const { error } = await supabase.auth.signInWithOAuth(
    { provider: "google" }
  )
  
  if (error) {
    console.error(error)
  }
}

export async function signInAnonymously() {
  const { error } = await supabase.auth.signInAnonymously()

  if (error) {
    console.error(error)
  }
}

export async function getAuthSession() {
  const { data, error } = await supabase.auth.getSession()
  const { session } = data

  if (error) {
    console.error("Session error")
    console.log(error)
  }

  return session
}

export async function getAuthUser() {
  const { data, error } = await supabase.auth.getUser()
  const { user } = data

  if (error) {
    console.error("Error while getting user's data")
    console.log(error.message)
  }

  return user
}

export async function getUserId() {
  const { data, error } = await supabase.auth.getUser()
  const { user } = data

  if (error) {
    console.error("Fetching user's data failed")
    console.log(error)
  }

  return user?.id
}
