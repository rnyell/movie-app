import { supabase, getUserId } from "../auth"


export async function getUserProfile() {
  const userId = await getUserId()
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single()

  if (error) {
    console.log("Failed to fetch user's profile")
    console.error(error)
  }

  return data
}

export async function getPlayedMoviesFromUser() {
  const userId = await getUserId()
  const { data, error } = await supabase
    .from("profiles")
    .select("played_movies")
    .eq("id", userId)
    .single()

  if (error) {
    console.log("Failed to get played movies from user's profile")
    console.error(error)
  }

  return data?.played_movies
}

export async function updatePlayedMoviesOnProfiles(type, movieId) {
  const userId = await getUserId()
  const previousMovies = await getPlayedMoviesFromUser()
  let updatedMovies = []

  switch (type) {
    case "add": {
      updatedMovies = [...new Set([...previousMovies, movieId])]
      break
    }
    case "delete": {
      const filtered = previousMovies.filter(id => id !== movieId)
      updatedMovies = [...filtered]
      break
    }
    case "delete_all": {
      updatedMovies = []
      break
    }
  }

  const { error } = await supabase
    .from("profiles")
    .update({ played_movies: updatedMovies })
    .eq("id", userId)
  
  if (error) {
    console.log("Failed to update played movies in user's profile")
    console.error(error)
  }
}

export async function updatePlayedSeriesOnProfiles(type, movieId) {
  const userId = await getUserId()
  const previousSeries = await getPlayedMoviesFromUser()
  let updatedSeries = []

  switch (type) {
    case "add": {
      updatedSeries = [...new Set([...previousSeries, movieId])]
      break
    }
    case "delete": {
      const filtered = previousSeries.filter(id => id !== movieId)
      updatedSeries = [...filtered]
      break
    }
    case "delete_all": {
      updatedSeries = []
      break
    }
  }

  const { error } = await supabase
    .from("profiles")
    .update({ played_series: updatedSeries })
    .eq("id", userId)
  
  if (error) {
    console.log("Failed to update played movies in user's profile")
    console.error(error)
  }
}
