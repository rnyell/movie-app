import { supabase } from ".."
import { getUserId } from "../auth"


async function getPlayedSeriesCount(id) {
  const userId = await getUserId()
  const { data, error } = await supabase
    .from("played_series")
    .select("*")
    .eq("id", id)
    .eq("user_id", userId)
    
  if (error) {
    console.log("ّFailed to get series data")
    console.log(error)
  }

  if (data.length === 0) {
    return 0
  } else {
    const playedCount = data[0]?.played_count
    return playedCount
  }
}

async function insertPlayedSeries(id, title) {
  const userId = await getUserId()
  const { error } = await supabase
    .from("played_series")
    .insert({ id, title, user_id: userId })

  if (error) {
    console.log("ّFailed to insert record to played_series table")
    console.log(error)
  }
}

async function updatePlayedSeries(id) {
  const userId = await getUserId()
  const playedCount = await getPlayedSeriesCount(id)

  const { error } = await supabase
    .from("played_series")
    .update({ played_count: playedCount + 1 })
    .eq("id", id)
    .eq("user_id", userId)

  if (error) {
    console.log("ّFailed to update played_series row")
    console.log(error)
  }
}

export async function upsertPlayedSeries(id, title) {
  const playedCount = await getPlayedSeriesCount(id)

  if (playedCount === 0) {
    insertPlayedSeries(id, title)
  } else {
    updatePlayedSeries(id)
  }
}
