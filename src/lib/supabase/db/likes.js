import { getUserId, supabase } from "../auth"

export async function isItemLiked(item) {
  const userId = await getUserId()
  const { data } = await supabase
    .from("likes")
    .select("*")
    .eq("id", item.id)
    .eq("media", item.media)
    .eq("user_id", userId)
    .limit(1)

  if (data?.length > 0) {
    return true
  } else {
    return false
  }
}
