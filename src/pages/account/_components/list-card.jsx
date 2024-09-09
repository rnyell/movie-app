import { useNavigate } from "react-router-dom"
import { IMAGES_URL } from "@src/services"
import { useMediaDetails } from "@src/services/hooks"
import { useAppContext, useUserContext } from "@src/store"
import { useLoader } from "@lib/hooks"
import { deleteList, getBookmarksByListId } from "@lib/supabase/db"
import { LockClosedIcon, LockOpenIcon, ShareIcon, HeartIcon, TrashIcon, PencilIcon } from "@heroicons/outline"
import { EllipsisVerticalIcon } from "@heroicons/solid"
import { Button, Dropdown, Icon } from "@lib/ui/components"
import cn from "@lib/ui/cn"

const menuItem_styles = "py-[0.675rem] px-4 w-40 align-center gap-3 text-primary-200 rounded-[0.75rem] hover:bg-primary-700"

export default function ListCard({ list }) {
  const { modalDispatch } = useAppContext()
  const { userState } = useUserContext()
  const isOwner = userState.id === list.creator_id
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

  function onEdit() {
    modalDispatch({
      type: "edit_list",
      data: { listId: list.id }
    })
  }

  function onDelete() {
    modalDispatch({
      type: "confirmation",
      data: {
        msg: "Delete collection?",
        onConfirm: async function() {
          const t = await deleteList(list.id)
        }
      }
    })
  }

  return (
    <div className="group w-[clamp(290px,60vw,305px)] overflow-hidden flex bg-primary-900 rounded-xl transition-shadow shadow-[0_2px_0.75rem_rgb(0_0_0_/_35%)] hover:bg-primary-800">
      <div className="h-32 w-[45%] shrink-0">
        <div className="size-full relative -translate-y-1">
          {thumbs?.map((thumb, idx) => {
            const rotation = { "0": "-15deg", "1": "0deg", "2": "15deg" }
            const transform = { "0": "-11", "1": "0", "2": "11" }
            const style = {
              rotate: rotation[idx],
              transform: `translate(${transform[idx]}px, 0)`
            }

            return (
              <Thumb
                className="absolute-center origin-[50%_80%]"
                thumb={thumb ? thumb : null}
                fallback={thumb ? false : true}
                style={style}
                key={thumb ? thumb.id : Math.random()}
              />
            )
          })}
        </div>
      </div>
      <div className="p-3 pb-4 grow flex-col">
        <div className="align-center">
          <h6
            className="py-0.5 w-4/5 truncate cursor-pointer group-hover:underline"
            onClick={handleNavigation}
          >
            {list.name}
          </h6>
          {isOwner && (
            <Dropdown.Container strategy="portal">
              <Dropdown.Trigger>
                <Button
                  variants="ghost"
                  size="square-xs"
                  customStyles="ml-auto"
                  iconOnly
                  iconSize="lg"
                  svg={<EllipsisVerticalIcon />}
                />
              </Dropdown.Trigger>
              <Dropdown.Menu
                autoWidth
                placement="bottom/end"
                className="z-50 text-[min(0.8rem,16px)] bg-primary-900 border-1.5 border-solid border-primary-700 rounded-3xl"
              >
                <Dropdown.MenuItem className={menuItem_styles} onClick={onEdit}>
                  <span>Edit</span>
                  <Icon size="md" svg={<PencilIcon />} customStyles="ml-auto" />
                </Dropdown.MenuItem>
                <Dropdown.MenuItem className={`${menuItem_styles} text-red-600`} onClick={onDelete}>
                  <span>Delete</span>
                  <Icon size="md" svg={<TrashIcon />} customStyles="ml-auto" />
                </Dropdown.MenuItem>
              </Dropdown.Menu>
            </Dropdown.Container>
          )}
        </div>
        <div className="mt-auto ml-auto">
          <div className="align-center">
            <Icon
              customStyles="p-2 rounded-full hover:bg-primary-600"
              size="md"
              svg={<HeartIcon />}
            />
            <i
              className="icon icon-md p-2 ml-auto rounded-full hover:bg-primary-600"
              title={list.is_private ? "This list is private" : "This list is sharable"}
              onClick={handleShareClick}
            >
              {list.is_private ? <LockClosedIcon className="size-4" /> : <ShareIcon className="size-4" />}
            </i>
          </div>
          {/* <p className="text-[0.675rem] text-primary-400">{list.description ? list.description : "No description"}</p> */}
        </div>
      </div>
    </div>
  )
}

function Thumb({ thumb, fallback = false, className, ...rest }) {
  const { mediaDetails, isLoading } = useMediaDetails(thumb?.media, thumb?.id)

  return (
    <figure
      className={cn(
        "absolute overflow-hidden border-[1.25px] border-solid border-primary-500 rounded-xl shadow-md",
        className
      )}
        {...rest}
      >
      {thumb && <img className="w-16 aspect-[0.67]" src={`${IMAGES_URL}w500${mediaDetails.poster_path}`} />}
      {fallback && <img className="w-16 aspect-[0.67]" src="/thumb-poster.png" />}
    </figure>
  )
}

///////////////////////////////////////
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
// function Thumb({ thumb }) {
//   const { media, id } = thumb
//   const { mediaDetails, isLoading } = useMediaDetails(media, id)

//   return (
//     <figure className="w-full col-span-1 overflow-hidden rounded-xl">
//       <img className="aspect-[4/3]" src={`${IMAGES_URL}w500${mediaDetails.backdrop_path}`}  />
//     </figure>
//   )
// }
