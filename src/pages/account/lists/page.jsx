import { Outlet, useOutlet } from "react-router-dom"
import { getUserLists } from "@lib/supabase/db"
import { usePostgresChanges } from "@lib/supabase/realtime"
import { useLoader } from "@lib/hooks"
import Page from "@components/layouts/page"
import ListCard from "../_components/list-card"

import styles from "./helper.module.css"

export default function UserLists() {
  const outlet = useOutlet()
  const { data: lists, setData: setLists, isLoading } = useLoader(getUserLists)

  usePostgresChanges(
    (payload) => {
      if (payload.eventType === "DELETE") {
        const deleted = payload.old
        setLists(lists => lists.filter(list => list.id !== deleted.id))
      }
    },
    { table: "lists" }
  )

  if (isLoading) {
    return null
  }

  if (outlet) {
    return <Outlet />
  } else {
    return (
      <Page>
        <h2>Your Lists</h2>
        <div className={`${styles.listsContainer} pt-12 pb-16 w-full`}>
          {lists?.map(list => <ListCard list={list} key={list.id} /> )}
        </div>
      </Page>
    )
  }
}
