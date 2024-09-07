import { supabase } from ".."
import { getUserListsIds, getWatchLaterListId } from "./lists"

export async function isItemBookmarked(item) {
  const listIds = await getUserListsIds()

  const { data, error } = await supabase
    .from("bookmarks")
    .select("id")
    .eq("id", item.id)
    .eq("media", item.media)
    .in("list_id", listIds)
    .limit(1)

  if (error) {
    console.error(error)
  }

  if (data.length > 0) {
    return true
  } else {
    return false
  }
}

export async function getWatchLaterItems() {
  const listId = await getWatchLaterListId()
  const { data, error } = await supabase
    .from("bookmarks")
    .select("*")
    .eq("list_id", listId)

  if (error) {
    console.error(error)
  }

  if (data) {
    return data
  } else {
    console.info("Watch later has no item...")
    return []
  }
}

export async function getBookmarksByListId(listId) {
  const { data, error } = await supabase
    .from("bookmarks")
    .select("*")
    .eq("list_id", listId)

  if (error) {
    console.error(error)
  }

  return data
}

export async function getListsIdsByBookmarkedItem(item) {
  const { data, error } = await supabase
    .from("bookmarks")
    .select("list_id")
    .eq("id", item.id)
    .eq("media", item.media)

  if (error) {
    console.error("Error finding lists:", error)
  }

  const ids = data.map((list) => list.list_id)
  return ids
}

export async function updateBookmarks(type, listId, item) {
  let response = {
    error: null,
    status: null,
    statusText: null,
  }

  if (type === "add") {
    const { error, status, statusText } = await supabase
      .from("bookmarks")
      .upsert({
        id: item.id,
        media: item.media,
        list_id: listId,
      })

    response = { error, status, statusText }

    if (error) {
      console.error(error)
    }
  } else if (type === "delete") {
    const { error, status, statusText } = await supabase
      .from("bookmarks")
      .delete()
      .eq("id", item.id)
      .eq("media", item.media)
      .eq("list_id", listId)

    response = { error, status, statusText }

    if (error) {
      console.error(error)
    }
  }

  console.log(response) //? why this is called so many times?
  return response
}

// ----
// export async function getAllBookmarkedItems() {
//   const userId = await getUserId()
//   const { data, error } = await supabase
//   .from("bookmarks")
//   .select("*")
//   .eq("")

//   console.log("all bookmarks", data)
//   console.log(data);

//   if (error) {
//     console.error(error)
//   }

//   return data
// }

// ----
// export async function isItemBookmarked(item) {
//   const { data, error } = await supabase
//     .from("bookmarks")
//     .select(`
//       lists:list_id (
//         id,
//         name,
//         is_private,
//         description
//       )
//     `)
//     .eq("id", item.id)
//     .eq("media", item.media)
//     .limit(1)

//     // or
//     // .from("bookmarks")
//     // .select("list_id")
//     // .eq("id", item.id)
//     // .eq("media", item.media)
//     // .limit(1)
//   console.log(data)
//   if (error) console.error(error)
// }
