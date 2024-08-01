import { supabase, getUserId } from "../auth"
import { getWatchLaterListId } from "./lists"


export async function getAllBookmarkedItems() {
  // const userId = await getUserId()
  const { data, error } = await supabase
  .from("bookmarks")
  .select("*")

  console.log("all bookmarks", data)
  
  if (error) {
    console.error(error)
  }
  
  return data
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

export async function getListsIdsByBookmarkedItem(item) {
  const { data, error } = await supabase
    .from("bookmarks")
    .select("list_id")
    .eq("id", item.id)
    .eq("media", item.media)

  if (error) {
    console.error('Error finding lists:', error)
  }
  
  const ids = data.map(list => list.list_id)
  return ids
}

export async function getBookmarkedItemByListId(listId) {
  const { data, error } = await supabase
    .from("bookmarks")
    .select("*")
    .eq("list_id", listId)

  if (error) {
    console.error(error)
  }

  console.log(data)
  return data
}

export async function isItemBookmarked(item) {
  const userId = await getUserId()
  const { data, error } = await supabase
    .from("bookmarks")
    .select("*")
    .eq("id", item.id)
    .eq("media", item.media)
    .limit(1)

  if (error) {
    console.error(error)
  }

  console.log(data)

  if (data.length > 0) {
    return true
  } else {
    return false
  }
}

export async function updateBookmarks(type, listId, item) {
  if (type === "add") {
    const { error } = await supabase
      .from("bookmarks")
      .upsert({
        id: item.id,
        media: item.media,
        list_id: listId
      })
  
    if (error) console.error(error)
  } else if (type === "delete") {
    const { error } = await supabase
      .from("bookmarks")
      .delete()
      .eq("id", item.id)
      .eq("media", item.media)
      .eq("list_id", listId)
  
    if (error) console.error(error)
  }
}


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

// isItBooked({id: 1022789, media: "movie"})
// async function isItBooked(item) {
//   const allLists = await getUserLists()
//   const listsIds = allLists.map(list => list.id)
//   console.log(listsIds)

//   const { data, error } = await supabase
//     .from("bookmarks")
//     .select(`*`)
//     .eq("id", item.id)
//     .eq("media", item.media)
//     .in("list_id", listsIds)

//   console.log('is it??', data)

//   if (error) {
//     console.error(error)
//   }
// }

// async function test() {
//   const userId = await getUserId()
//   const { data, error } = await supabase
//     .from("bookmarks")
//     .select(`
//       id,
//       title,
//       media,
//       added_at,
//       lists!inner (id, name, creator_id)
//     `)
//     .eq('lists.creator_id', userId)
//   if (error) console.error(error)
//   console.log('test', data)
//   return data
// }
