import { useLoader } from "@lib/hooks"
import { getUserLists } from "@lib/supabase/db"
import { Snap } from "@lib/ui/components"
import ListCard from "./list-card"
import Header from "./header"


export default function Lists() {
  const { data: lists, isLoading } = useLoader(getUserLists)

  return (
    <section>
      <Header heading="Your Lists" href="/account/lists" />
      <Snap.Container className="mt-4 p-2">
        {lists?.map(list => (
          <Snap.Item className="p-2" key={list.id}>
            <ListCard list={list} />
          </Snap.Item>
        ))}
      </Snap.Container>
    </section>
  )
}
