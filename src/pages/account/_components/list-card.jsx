import { useNavigate } from "react-router-dom"
import { IMAGES_URL } from "@src/services"
import { useMediaDetails } from "@src/services/hooks"
import { useLoader } from "@lib/hooks"
import { getBookmarksByListId } from "@lib/supabase/db"
import { LockClosedIcon, LockOpenIcon, ShareIcon } from "@heroicons/outline"


export default function ListCard({ list }) {
  const { data: bookmarks, isLoading } = useLoader(() => getBookmarksByListId(list.id))
  const thumbs = bookmarks?.slice(0, 4)?.map(d => ({ id: d.id, media: d.media}))
  const navigate = useNavigate()

  function handleNavigation() {
    if (!list.is_private) {
      navigate(`/lists/${list.share_id}`)
    } else {
      navigate("/account/lists/p", {
        state: { listId: list.id, listName: list.name }
      })
    }
  }

  async function handleShareClick() {
    if (!list.is_private) {
      try {
        await navigator.clipboard.writeText(list.share_id)
        console.log("Coppied")
      } catch(err) {
        console.error("Failed to copy:", err)
      }
    } else {
      console.warn("Only public lists can be shared.")
    }
  }

  return (
    <div className="group w-64 overflow-hidden rounded-xl transition-shadow shadow-[0_2px_0.75rem_rgb(0_0_0_/_35%)] hover:bg-primary-900">
      <div className="grid grid-cols-2 grid-rows-2 gap-1 grid-flow-dense border-1 border-solid border-primary-700 rounded-xl">
        {thumbs?.map(thumb => <Thumb thumb={thumb} key={thumb.id} /> )}
      </div>
      <div className="p-3 pb-4">
        <div className="align-center">
          <h6 className="cursor-pointer group-hover:underline" onClick={handleNavigation}>{list.name}</h6>
          <i
            className="icon icon-md p-2 ml-auto rounded-full hover:bg-primary-600"
            title={list.is_private ? "This list is private" : "This list is sharable"}
            onClick={handleShareClick}
          >
            {list.is_private ? <LockClosedIcon className="size-4" /> : <ShareIcon className="size-4" />}
          </i>
        </div>
        <p className="text-[0.675rem] text-primary-400">{list.description ? list.description : "No description"}</p>
      </div>
    </div>
  )
}


function Thumb({ thumb }) {
  const { media, id } = thumb
  const { mediaDetails, isLoading } = useMediaDetails(media, id)

  return (
    <figure className="w-full col-span-1 overflow-hidden rounded-xl">
      <img className="aspect-[4/3]" src={`${IMAGES_URL}w500${mediaDetails.backdrop_path}`}  />
    </figure>
  )
}
