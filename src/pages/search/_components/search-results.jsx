import { useSearchParams } from "react-router-dom"
import { motion } from "framer-motion"
import { useSearch } from "@src/store/search-context"
import { devideItemsIntoPages, generatePagination } from "@lib/utils"
import { SearchResultsSkeleton } from "@components/skeletons"
import { NotFoundResult } from "@components/errors"
import Pagination from "@components/pagination"
import MovieCard from "@components/movie-cards/movie-card"


export default function SearchResults({ isLoading, searchStateCopy }) {
  const {searchState} = useSearch()
  const [searchParams] = useSearchParams()
  const isNotFound = searchState.pages === 0
  // const isNotFound = searchState.error // why?
  const currentPage = Number(searchParams.get("page")) || 1
  const allPagesArray = generatePagination(currentPage, searchStateCopy.pages)


  if (isLoading) {
    return <SearchResultsSkeleton />
  }

  if (isNotFound) {
    return <NotFoundResult />
  }

  return (
    <>
      <section className="results-container">
        <motion.div
          className="search-results"
          layout
        >
          {devideItemsIntoPages(currentPage, searchStateCopy.results)
            .map(media =>
              <MovieCard
                key={media.id}
                result={media}
                media={media.media_type}
                variant="result"
              />
            )
          }
        </motion.div>
      </section>
      {!isNotFound && (
        <Pagination
          currentPage={currentPage}
          allPagesArray={allPagesArray}
        />
      )}
    </>
  )
}
