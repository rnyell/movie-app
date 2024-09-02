import { useLoader } from "@lib/hooks"
import { getUserLists } from "@lib/supabase/db"
import Page from "@components/layouts/page"
import ListCard from "../_components/list-card"

import styles from "./page.module.css"

export default function UserLists() {
  const { data: lists, isLoading } = useLoader(getUserLists)

  return (
    <Page>
      <h2 className="mb-8">Your Lists</h2>
      <div className={styles.gridContainer}>
        {lists?.map(list => <ListCard list={list} key={list.id} /> )}
      </div>
    </Page>
  )
}
