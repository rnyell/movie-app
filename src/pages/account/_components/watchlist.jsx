import { useState } from "react"
import { Link } from "react-router-dom"
import { getWatchLaterItems } from "@lib/supabase/db"
import { useAppContext } from "@src/store"
import { BookmarkIcon } from "@heroicons/outline"
import { useLoader } from "@lib/hooks"
import { Button, Snap } from "@lib/ui/components"
import { EllipsisVerticalIcon } from "@heroicons/solid"
import { CardsSkeleton } from "@components/skeletons"
import MovieCard from "@components/movie-cards/movie-card"
import Section from "./section"

/* //~TODO:
  1. change view: list or grid
  2. sort base on the time movie is watched
  3. filter movie or tv show on watchlist
  4. a dropdown menu for these (sorting filtering etc.) also with a "delete all" option for `handleClearAllBookmarksBtn`
*/

export default function Watchlist() {
  const { modalDispatch } = useAppContext()
  const {
    data: watchLaterItems,
    isLoading,
    error,
  } = useLoader(getWatchLaterItems)
  const isEmpty = watchLaterItems?.length === 0

  return (
    <Section sectionName="watchlist">
      <header className="flex">
        <h3 className="heading">Watchlist</h3>
        <div className="align-center ml-auto">
          <Button
            variants="ghost"
            size="square-xs"
            iconOnly
            iconSize="md"
            svg={<EllipsisVerticalIcon />}
          />
          <Link to="">View All</Link>
        </div>
      </header>
      <div>
        {isLoading ? (
          <CardsSkeleton cardVariant="bookmark" />
        ) : isEmpty ? (
          <div className="empty-watchlist-msg empty-msg">
            <p>Your watchlist is currently empty.</p>
            <p>
              To keep track of the stuff you want to watch, just tap the
              bookmark icon:{" "}
              <i className="icon">
                <BookmarkIcon />
              </i>
            </p>
          </div>
        ) : (
          <Snap.Container customStyles="p-5">
            {watchLaterItems?.slice(0, 12).map((item) => (
              <Snap.Item align="center" key={item.id}>
                <MovieCard
                  result={item.id}
                  media={item.media}
                  variant="bookmarked"
                />
              </Snap.Item>
            ))}
          </Snap.Container>
        )}
      </div>
    </Section>
  )
}
