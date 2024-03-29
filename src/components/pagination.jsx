import { Link, useLocation, useSearchParams } from "react-router-dom"
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/outline"
import { useSearch } from "@src/store/app-context"


export default function Pagination({ currentPage, allPagesArray }) {
  const [searchState] = useSearch()
  const [searchParams] = useSearchParams()
  const location = useLocation()

  function createLinkUrl(pageNumber) {
    const params = new URLSearchParams(searchParams)
    params.set("page", pageNumber)
    return `${location.pathname}?${params.toString()}`
  }
  
  return (
    <div className="pagination">
      <Link
        to={createLinkUrl(currentPage - 1)} 
        className={`page-link last-page-link ${currentPage === 1 && "disable-link"}`}>
        <i className="icon arrow-icon">
          <ArrowLeftIcon />
        </i>
      </Link>

      {
        allPagesArray.map((page, i) => {
          if (page === "...") {
            return <Link className="dots" key={i}>&#x2022;&#x2022;&#x2022;</Link>
          } else {
            return (
              <Link
                key={i} 
                to={createLinkUrl(page)}
                className={`page-link ${currentPage === page && "active"}`}
              >
                {page}
              </Link>
            )
          }
        }) 
      }
      
      <Link 
        to={createLinkUrl(currentPage + 1)} 
        className={`page-link last-page-link ${currentPage > searchState.totalPages - 1 && "disable-link"}`}>
        <i className="icon arrow-icon">
          <ArrowRightIcon />
        </i>
      </Link>
    </div>
  )
}