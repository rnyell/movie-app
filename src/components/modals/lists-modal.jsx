import { useEffect, useState } from "react"
import {
  getUserLists,
  updateBookmarks,
  getListsIdsByBookmarkedItem,
  createList,
} from "@lib/supabase/db"
import { useUserContext } from "@src/store"
import { PlusIcon, LockClosedIcon, XMarkIcon } from "@heroicons/outline"
import { Modal, Button, Icon, Divider } from "@lib/ui/components"
import { useLoader } from "@lib/hooks"
import { ListsModalSkeleton } from "../skeletons"

import "./lists-modal.css"

export default function ListsModal({ item, setClose }) {
  const { userState } = useUserContext()
  const [checkedListIds, setCheckedListIds] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isCreatingNewList, setIsCreatingNewList] = useState(false)

  const { data: lists, isLoading: listsLoading } = useLoader(getUserLists)
  const listIds = lists?.map((list) => list.id)

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
      const filtered = checkedListIds.filter((id) => id !== listId)
      setCheckedListIds((prev) => filtered)
    } else {
      setCheckedListIds((prev) => [...prev, listId])
    }
  }

  async function submitSelectedLists(e) {
    e.preventDefault()

    listIds.forEach(async (listId) => {
      if (checkedListIds.includes(listId)) {
        let r = await updateBookmarks("add", listId, item)
        console.log(r)
      } else {
        updateBookmarks("delete", listId, item)
      }
    })

    if (isCreatingNewList) {
      const formData = new FormData(e.target)
      const isPrivate = formData.get("publicity") === "private"
      const listName = formData.get("list-name")
      if (listName.trim() !== "") {
        const listResponse = await createList(listName, isPrivate)
        const bookResponse = await updateBookmarks(
          "add",
          listResponse.data.id,
          item
        )
      }
    }

    setClose()
  }

  function showCreatingList(e) {
    e.stopPropagation()
    e.preventDefault()
    setIsCreatingNewList(true)
  }

  return (
    <Modal setClose={setClose} size="sm">
      <div className="lists-modal">
        <form id="lists-form" onSubmit={submitSelectedLists}>
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-4 right-4 rounded-full"
            isSquare
            iconOnly
            svg={<XMarkIcon />}
            onClick={setClose}
          />
          <p className="mb-6 font-semibold">
            Save {item.media === "movie" ? "movie" : "series"} to . . .
          </p>
          <div className="lists flex-col">
            {isLoading || listsLoading ? (
              <ListsModalSkeleton count={userState.listsCount} />
            ) : (
              <>
                {lists.map((list) => (
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
                      <Icon
                        className="ml-auto"
                        svg={<LockClosedIcon />}
                        size="sm"
                      />
                    ) : (
                      <div style={{ width: 16, height: 16 }} />
                    )}
                  </label>
                ))}
              </>
            )}
          </div>
          {isCreatingNewList && <Divider space="md" width="fill" />}
          {isCreatingNewList && <NewList />}
          <div className="mt-6 flex gap-2">
            <Button
              type={isCreatingNewList ? "submit" : "button"}
              variant={isCreatingNewList ? "solid-primary" : "outline-lite"}
              size="md"
              className={isCreatingNewList ? "grow" : ""}
              onClick={isCreatingNewList ? null : showCreatingList}
            >
              <Icon svg={<PlusIcon />} size="sm" />
              <span>
                {isCreatingNewList ? "Create & Save" : "Create new list"}
              </span>
            </Button>
            {!isCreatingNewList && (
              <Button type="submit" size="md" className="grow">
                Save
              </Button>
            )}
          </div>
        </form>
      </div>
    </Modal>
  )
}

function NewList() {
  return (
    <div id="new-list" className="flex-col gap-2">
      <p>Creating new list . . .</p>
      <div className="flex gap-2 text-sm">
        <label className="grow" htmlFor="list-name">
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
