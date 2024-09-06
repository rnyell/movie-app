import { useSearchParams } from "react-router-dom"
import { motion } from "framer-motion"
import { useSearch } from "@src/store"
import { devideItemsIntoPages, generatePagination } from "@lib/utils"
import { CardSkeleton } from "@components/skeletons"
import MovieCard from "@components/movie-cards/movie-card"
import Pagination from "@components/pagination"
import { NotFoundResult } from "../error"


export default function SearchResults({ isLoading, searchResults }) {
  const { results, pages } = searchResults
  const { searchState } = useSearch()
  const [searchParams] = useSearchParams()
  const currentPage = Number(searchParams.get("page")) || 1
  const allPagesArray = generatePagination(currentPage, pages)


  if (searchState.error) {
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
            devideItemsIntoPages(currentPage, results).map((media) => (
              <MovieCard
                key={media.id}
                result={media}
                media={media.media_type}
                variant="result"
              />
            ))
          )}
        </motion.div>
      </section>
      {!searchState.error && (
        <div className="py-2">
          <Pagination currentPage={currentPage} allPagesArray={allPagesArray} />
        </div>
      )}
    </>
  )
}
