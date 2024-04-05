import { Link, useLocation, useSearchParams } from "react-router-dom"
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/outline"


export default function Pagination({ currentPage, allPagesArray }) {
  const [searchParams] = useSearchParams()
  const location = useLocation()
  const totalPages = allPagesArray.length

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
        className={`page-link last-page-link ${currentPage > totalPages - 1 && "disable-link"}`}>
        <i className="icon arrow-icon">
          <ArrowRightIcon />
        </i>
      </Link>
    </div>
  )
}