import { useLoader } from "@lib/hooks"
import { getAllPublicLists } from "@lib/supabase/db"
import Page from "@components/layouts/page"
import ListCard from "../account/_components/list-card";


export default function PublicLists() {
  const { data, isLoading } = useLoader(getAllPublicLists)

  return (
    <Page>
      <h2>Public Lists</h2>
      <div>
        {data?.map(list => <ListCard list={list} key={list.id} /> )}
      </div>
    </Page>
  )
}
