import { Link } from "react-router-dom"
import { useLoader } from "@lib/hooks"
import { getUserLists, getWatchLaterListId } from "@lib/supabase/db"
import { Button, Snap } from "@lib/ui/components"
import { EllipsisVerticalIcon } from "@heroicons/solid"
import ListCard from "./list-card"

export default function Lists() {
  const { data: watchlistId } = useLoader(getWatchLaterListId)
  const { data: lists, isLoading } = useLoader(getUserLists)

  return (
    <section>
      <header className="flex">
        <h3 className="mb-5">Your Lists</h3>
        <div className="ml-auto align-center gap-4">
          <Button
            variants="ghost"
            size="square-xs"
            iconOnly
            iconSize="md"
            svg={<EllipsisVerticalIcon />}
          />
          <Link
            className="p-2 text-sm rounded-md hover:bg-primary-700"
            to="/account/lists"
          >
            View All
          </Link>
        </div>
      </header>
      <Snap.Container className="mt-4 p-2">
        {/* return user lists except the default "WatchlistSection" */}
        {lists?.map((list) => {
          if (list.id !== watchlistId) {
            return (
              <Snap.Item className="p-2" key={list.id}>
                <ListCard list={list} />
              </Snap.Item>
            )
          }
        })}
      </Snap.Container>
    </section>
  )
}
