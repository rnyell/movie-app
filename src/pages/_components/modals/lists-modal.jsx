import { useEffect, useState } from "react"
import { useUserContext } from "@src/store"
import { updateBookmarks, getListsIdsByBookmarkedItem, createList } from "@src/lib/supabase/db"
import { PlusIcon, LockClosedIcon, XMarkIcon } from "@heroicons/outline"
import { Modal, Button, Icon, Divider } from "@src/lib/ui/components"


export default function ListsModal({ item, setModal }) {
  const { userState, setUserState } = useUserContext()
  // list type: [ {id: 'uuid', name: 'str', items: []} ]
  const lists = userState.lists
  const listIds = lists.map(list => list.id)
  const [checkedLists, setCheckedLists] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isCreatingNewList, setIsCreatingNewList] = useState(false)

  useEffect(() => { loader() }, [])

  async function loader() {
    const initialCheckedLists = await getListsIdsByBookmarkedItem(item)
    setCheckedLists(initialCheckedLists)
    setIsLoading(false)
  }

  function handleChange(listId) {
    if (checkedLists.includes(listId)) {
      const filtered = checkedLists.filter(id => id !== listId)
      setCheckedLists(prev => filtered)
    } else {
      setCheckedLists(prev => [...prev, listId])
    }
  }

  async function submitSelectedLists(e) {
    e.preventDefault()

    listIds.forEach(listId => {
      if (checkedLists.includes(listId)) {
        updateBookmarks("add", listId, item)
      } else {
        updateBookmarks("delete", listId, item)
      }
    })

    if (isCreatingNewList) {
      const formData = new FormData(e.target)
      const isPrivate = formData.get("publicity") === "private" ? true : false
      const listName = formData.get("list-name")
      if (listName.trim() !== "") {
        const createdList = await createList(listName, isPrivate)
        updateBookmarks("add", createdList.id, item)
        // console.log('list successfully created', createdList)
      }
    }

    setModal(false)
  }

  function showCreatingList(e) {
    e.stopPropagation()
    e.preventDefault()
    setIsCreatingNewList(true)
  }


  if (isLoading) {
    return null
  }

  return (
    <Modal setClose={() => setModal(false)} size="sm">
      <div className="lists-modal">
        <form id="lists-form" onSubmit={submitSelectedLists}>
          <Button
            variants="ghost"
            size="square-sm"
            customStyles="absolute top-4 right-4 rounded-full"
            iconOnly
            svg={<XMarkIcon />}
            onClick={() => setModal(false)}
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
                  defaultChecked={checkedLists.includes(list.id)}
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
