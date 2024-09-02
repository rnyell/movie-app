import { supabase, getUserId } from "../auth"


export async function getAllPublicLists() {
  const { data, error } = await supabase.from("lists").select("*")
  
  if (error) {
    console.error("Failed to fetch public lists", error)
  }

  return data
}


export async function getUserLists() {
  const userId = await getUserId()
  const { data, error } = await supabase
    .from("lists")
    .select("*")
    .eq("creator_id", userId)
  
  if (error) {
    console.error("Failed to fetch user's lists", error)
  }

  return data
}

export async function getUserListsCount() {
  const data = await getUserLists()
  return data.length
}

export async function getUserListsIds() {
  const userId = await getUserId()
  const { data, error } = await supabase
    .from("lists")
    .select("id")
    .eq("creator_id", userId)
  
  if (error) {
    console.error("Failed to fetch user's lists", error)
  }

  const listsIdsArray = data.map(d => d.id)
  return listsIdsArray
}

export async function getWatchLaterListId() {
  const userId = await getUserId()
  const { data, error } = await supabase
    .from("lists")
    .select("*")
    .eq("creator_id", userId)
    .order("created_at", { ascending: true })

  if (error) {
    console.error(error)
  }

  if (data[0].name === "Watch Later") {
    return data[0].id
  } else {
    console.error("Something went wrong... the user does not have the \"Watch Later\" list.")
    return null
  }
}

export async function getListsByShareId(shareId) {
  const { data, error } = await supabase
    .from("lists")
    .select("*")
    .eq("share_id", shareId)
    .single()

  if (error) {
    console.error(error)
  }

  return data
}

export async function createList(name, isPrivate) {
  const userId = await getUserId()
  let shareId = null

  if (!isPrivate) {
    shareId = generateShareId()
    if (!isShareIdUnique(shareId)) {
      do {
        shareId = generateShareId()
      } while (!isShareIdUnique(shareId))
    }
  }

  const { data, error } = await supabase
    .from("lists")
    .insert({
      name: name,
      creator_id: userId,
      is_private: isPrivate,
      share_id: shareId,
    })
    .select()
    .single()

  if (error) {
    console.error(error)
  }

  return data
}

// export async function addListDescription(desc) {}

export async function deleteList(listId) {
  const { error } = await supabase
    .from("lists")
    .delete()
    .eq("id", listId)

  if (error) {
    console.error(error)
  }
}

//================================================================
/* helper funcs */
function generateShareId() {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  const shareIdLength = 8
  let shareId = ""

  for (let i = 0; i <= shareIdLength; i++) {
    shareId += charset.charAt(Math.floor(
      Math.random() * charset.length
    ))
  }

  return shareId
}

async function isShareIdUnique(shareId) {
  const { data, error } = await supabase.from("lists").select("share_id")

  if (error) {
    console.error(error)
  }

  const shareIds = data.map(d => d.share_id)

  if (shareIds.includes(shareId)) {
    return false
  } else {
    return true
  }
}
