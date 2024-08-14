import { useSearchParams } from "react-router-dom"
import { motion } from "framer-motion"
import { useSearch } from "@src/store"
import { devideItemsIntoPages, generatePagination } from "@lib/utils"
import { CardSkeleton } from "@components/skeletons"
import { NotFoundResult } from "../error"
import MovieCard from "@components/movie-cards/movie-card"
import Pagination from "@components/pagination"


export default function SearchResults({ isLoading, searchResults }) {
  const { searchState } = useSearch()
  const isNotFound = searchState.error === true
  const [searchParams] = useSearchParams()
  const currentPage = Number(searchParams.get("page")) || 1
  const allPagesArray = generatePagination(currentPage, searchResults.pages)


  if (isNotFound) {
    return <NotFoundResult />
  }

  return (
    <>
      <section className="results-container">
        <motion.div className="search-results">
          {isLoading ? (
            [...Array(10).keys()].map((_, i) => (
              <CardSkeleton variant="result" key={i} />
            ))
          ) : (
            devideItemsIntoPages(currentPage, searchResults.results).map(media =>
              <MovieCard
                key={media.id}
                result={media}
                media={media.media_type}
                variant="result"
              />
            )
          )}
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
