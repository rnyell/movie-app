import { useNavigate } from "react-router-dom"
import { IMAGES_URL } from "@src/services"
import { useMediaDetails } from "@src/services/hooks"
import { useLoader } from "@lib/hooks"
import { getBookmarksByListId } from "@lib/supabase/db"
import { LockClosedIcon, LockOpenIcon, ShareIcon } from "@heroicons/outline"
import cn from "@src/lib/ui/cn"


export default function ListCard({ list }) {
  const { data: bookmarks, isLoading } = useLoader(() => getBookmarksByListId(list.id))
  const navigate = useNavigate()

  // creating thumbnails for lists in the "/account#lists" route
  const thumbsCount = 3
  let a, b, thumbs;
  if (!isLoading) {
    a = bookmarks?.slice(0, thumbsCount)?.map(bookm => ({ id: bookm.id, media: bookm.media}))
    b = Array(thumbsCount - a?.length).fill(null)
    thumbs = a?.concat(b).toReversed()
  }

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
    <div className="group w-[clamp(290px,60vw,305px)] overflow-hidden flex bg-primary-900 rounded-xl transition-shadow shadow-[0_2px_0.75rem_rgb(0_0_0_/_35%)] hover:bg-primary-800">
      <div className="h-32 w-1/2 shrink-0 border-1 border-solid border-primary-700 rounded-xl">
        <div className="size-full relative -translate-y-1">
          {thumbs?.map((thumb, idx) => {
            const rotation = { "0": "-16deg", "1": "0deg", "2": "16deg" }
            const transform = { "0": "-12", "1": "0", "2": "12" }
            const style = {
              rotate: rotation[idx],
              transform: `translate(${transform[idx]}px, 0)`
            }

            if (thumb) {
              return (
                <Thumb
                  thumb={thumb}
                  className="absolute-center origin-[50%_80%] border-1 border-solid border-primary-500"
                  style={style}
                  key={thumb.id}
                />
              )
            } else {
              return (
                <Thumb
                  className="absolute-center origin-[50%_80%] border-1 border-solid border-primary-500"
                  fallback={true}
                  style={style}
                  key={Math.random()}
                />
              )
            }
          })}
        </div>
      </div>
      <div className="p-3 pb-4 grow">
        <div className="align-center">
          <h6 className="py-0.5 cursor-pointer group-hover:underline" onClick={handleNavigation}>{list.name}</h6>
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
  // return (
  //   <div className="group w-64 overflow-hidden rounded-xl transition-shadow shadow-[0_2px_0.75rem_rgb(0_0_0_/_35%)] hover:bg-primary-900">
  //     <div className="grid grid-cols-2 grid-rows-2 gap-1 grid-flow-dense border-1 border-solid border-primary-700 rounded-xl">
  //       {thumbs?.map(thumb => {
  //         if (thumb) {
  //           return <Thumb thumb={thumb} key={thumb.id} />
  //         } else {
  //           return (
  //             <figure className="w-full col-span-1 overflow-hidden rounded-xl" key={Math.random()}>
  //               <img className="aspect-[4/3]" src="/thumb-poster.png" />
  //             </figure>
  //           )
  //         }
  //       } )}
  //     </div>
  //     <div className="p-3 pb-4">
  //       <div className="align-center">
  //         <h6 className="py-0.5 cursor-pointer group-hover:underline" onClick={handleNavigation}>{list.name}</h6>
  //         <i
  //           className="icon icon-md p-2 ml-auto rounded-full hover:bg-primary-600"
  //           title={list.is_private ? "This list is private" : "This list is sharable"}
  //           onClick={handleShareClick}
  //         >
  //           {list.is_private ? <LockClosedIcon className="size-4" /> : <ShareIcon className="size-4" />}
  //         </i>
  //       </div>
  //       <p className="text-[0.675rem] text-primary-400">{list.description ? list.description : "No description"}</p>
  //     </div>
  //   </div>
  // )
}

function Thumb({ thumb, fallback = false, className, ...rest }) {
  const { mediaDetails, isLoading } = useMediaDetails(thumb?.media, thumb?.id)

  if (thumb) {
    return (
      <figure className={cn("absolute overflow-hidden rounded-xl", className)} {...rest}>
        <img className="w-16 aspect-[0.67]" src={`${IMAGES_URL}w500${mediaDetails.poster_path}`}  />
      </figure>
    )
  } else if (fallback) {
    return (
      <figure className={cn("absolute overflow-hidden rounded-xl", className)} {...rest}>
        <img className="w-16 aspect-[0.67]" src="/thumb-poster.png" />
      </figure>
    )
  }
}


// function Thumb({ thumb }) {
//   const { media, id } = thumb
//   const { mediaDetails, isLoading } = useMediaDetails(media, id)

//   return (
//     <figure className="w-full col-span-1 overflow-hidden rounded-xl">
//       <img className="aspect-[4/3]" src={`${IMAGES_URL}w500${mediaDetails.backdrop_path}`}  />
//     </figure>
//   )
// }
