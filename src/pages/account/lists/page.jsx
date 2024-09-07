import { Outlet, useOutlet } from "react-router-dom"
import { useLoader } from "@lib/hooks"
import { getUserLists } from "@lib/supabase/db"
import Page from "@components/layouts/page"
import ListCard from "../_components/list-card"

import styles from "./helper.module.css"

export default function UserLists() {
  const outlet = useOutlet()
  const { data: lists, isLoading } = useLoader(getUserLists)

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
