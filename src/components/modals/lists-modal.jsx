import { useEffect, useState } from "react"
import { useUserContext } from "@src/store"
import { getUserLists, updateBookmarks, getListsIdsByBookmarkedItem, createList } from "@lib/supabase/db"
import { PlusIcon, LockClosedIcon, XMarkIcon } from "@heroicons/outline"
import { Modal, Button, Icon, Divider } from "@lib/ui/components"
import { useLoader } from "@lib/hooks"
import { AnimatePresence } from "framer-motion"


export default function ListsModal({ item, setClose }) {
  // const { userState } = useUserContext()
  // list type: [ {id: 'uuid', name: 'str', items: []} ]
  // const lists = userState.lists
  const [checkedListIds, setCheckedListIds] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isCreatingNewList, setIsCreatingNewList] = useState(false)

  const { data: lists, isLoading: listsLoading } = useLoader(getUserLists)
  const listIds = lists?.map(list => list.id)

  useEffect(() => {
    loader()
  }, [])

  async function loader() {
    const initialCheckedListIds = await getListsIdsByBookmarkedItem(item)
    setCheckedListIds(initialCheckedListIds)
    setIsLoading(false)
  }

  function handleChange(listId) {
    if (checkedListIds.includes(listId)) {
      const filtered = checkedListIds.filter(id => id !== listId)
      setCheckedListIds(prev => filtered)
    } else {
      setCheckedListIds(prev => [...prev, listId])
    }
  }

  async function submitSelectedLists(e) {
    e.preventDefault()

    listIds.forEach(listId => {
      if (checkedListIds.includes(listId)) {
        updateBookmarks("add", listId, item)
      } else {
        updateBookmarks("delete", listId, item)
      }
    })

    if (isCreatingNewList) {
      const formData = new FormData(e.target)
      const isPrivate = formData.get("publicity") === "private"
      const listName = formData.get("list-name")
      if (listName.trim() !== "") {
        const createdList = await createList(listName, isPrivate)
        updateBookmarks("add", createdList.id, item)
        // console.log('list successfully created', createdList)
      }
    }

    setClose()
  }

  function showCreatingList(e) {
    e.stopPropagation()
    e.preventDefault()
    setIsCreatingNewList(true)
  }


  if (isLoading || listsLoading) {
    return null
  }

  return (
    <Modal setClose={setClose} size="sm">
      <div className="lists-modal">
        <form id="lists-form" onSubmit={submitSelectedLists}>
          <Button
            variants="ghost"
            size="square-sm"
            customStyles="absolute top-4 right-4 rounded-full"
            iconOnly
            svg={<XMarkIcon />}
            onClick={setClose}
          />
          <p>Save {item.media === "movie" ? "movie" : "series"} to . . .</p>
          <div className="lists flex-col">
            {lists.map(list => (
              <label
                className="align-center"
                htmlFor={list.id}
                key={list.id}
              >
                <input
                  type="checkbox"
                  name="list"
                  id={list.id}
                  value={list.id}
                  defaultChecked={checkedListIds.includes(list.id)}
                  onChange={() => handleChange(list.id)}
                />
                <span>{list.name}</span>
                {list.is_private ? (
                  <Icon svg={<LockClosedIcon />} size="sm" customStyles="ml-auto" />
                ) : (
                  <div style={{width: 16, height: 16}} />
                )}
              </label>
            ))}
          </div>
          {isCreatingNewList && <Divider space="md" width="fill" />}
          {isCreatingNewList && <NewList />}
          <div className="cta-btns flex">
            <Button
              type={isCreatingNewList ? "submit" : "button"}
              variants={isCreatingNewList ? "solid-primary" : "outline-lite"}
              size="md"
              customStyles={isCreatingNewList ? "grow-1" : ""}
              onClick={isCreatingNewList ? null : showCreatingList}
            >
              <Icon svg={<PlusIcon />} size="sm" />
              <span>{isCreatingNewList ? "Create & Save" : "Create new list"}</span>
            </Button>
            {!isCreatingNewList && <Button type="submit" size="md" customStyles="grow-1">Save</Button>}
          </div>
        </form>
      </div>
    </Modal>
  )
}

function NewList() {
  return (
    <div className="new-list flex-col">
      <p>Creating new list . . .</p>
      <div className="flex">
        <label htmlFor="list-name">
          <input
            className="new-list-name"
            type="text"
            id="list-name"
            name="list-name"
            form="lists-form"
            placeholder="Enter list title..."
          />
        </label>
        <label className="flex-center" htmlFor="publicity">
          <select name="publicity" id="publicity" form="lists-form">
            <option value="private">Private</option>
            <option value="public">Public</option>
          </select>
        </label>
      </div>
    </div>
  )
}
