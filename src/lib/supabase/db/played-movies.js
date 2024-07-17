import { supabase, getUserId } from "../auth"

async function getPlayedMovieCount(id) {
  const userId = await getUserId()
  const { data, error } = await supabase
    .from("played_movies")
    .select("*")
    .eq("id", id)
    .eq("user_id", userId)
    
  if (error) {
    console.log("ّFailed to get movie data")
    console.log(error)
  }

  if (data.length === 0) {
    return 0
  } else {
    const playedCount = data[0]?.played_count
    return playedCount
  }
}

async function insertPlayedMovies(id, title) {
  const userId = await getUserId()
  const { error } = await supabase
    .from("played_movies")
    .insert({ id, title, user_id: userId })

  if (error) {
    console.log("ّFailed to insert record to played_movies table")
    console.log(error)
  }
}

async function updatePlayedMovie(id) {
  const userId = await getUserId()
  const playedCount = await getPlayedMovieCount(id)

  const { error } = await supabase
    .from("played_movies")
    .update({ played_count: playedCount + 1 })
    .eq("id", id)
    .eq("user_id", userId)

  if (error) {
    console.log("ّFailed to update played_movie row")
    console.log(error)
  }
}

export async function upsertPlayedMovies(id, title) {
  const playedCount = await getPlayedMovieCount(id)

  if (playedCount === 0) {
    insertPlayedMovies(id, title)
  } else {
    updatePlayedMovie(id)
  }
}

// export async function upsertPlayedMovies(id, title) {
//   const userId = await getUserId()
//   const { played_count } = await getPlayedMovieCount(id)
//   const { error } = await supabase
//     .from("played_movies")
//     .upsert({ id, title, user_id: userId }, {
//       onConflict: 'id, user_id',
//       update: { played_count: played_count + 1 }
//     })
//   if (error) {
//     console.log(error)
//   }
// }
