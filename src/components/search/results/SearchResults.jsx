import { useSearchParams } from "react-router-dom"
import { motion } from "framer-motion"
import { devideItemsIntoPages, generatePagination } from "@utils/utils"
import { useSearch } from "@src/store/search-context"
import MovieCard from "@components/movie/movie-card"
import Pagination from "@components/pagination"
import { SearchResultsSkeleton } from "@components/skeletons"
import { NotFoundResult } from "@components/errors"


export default function SearchResults({ isLoading, searchStateCopy }) {
  const {searchState} = useSearch()
  const [searchParams] = useSearchParams()
  const isNotFound = searchState.pages === 0
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
      <div className="results-container">
        <motion.div
          className="search-results"
          layout
        >
          {devideItemsIntoPages(currentPage, searchStateCopy.results)
            .map(media =>
              <MovieCard
                key={media.id}
                result={media}
                type={media.media_type}
                variant="result"
              />
            )
          }
        </motion.div>
      </div>
      {!isNotFound && (
        <Pagination
          currentPage={currentPage}
          allPagesArray={allPagesArray}
        />
      )}
    </>
  )
}