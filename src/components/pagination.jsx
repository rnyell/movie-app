import { Link, useLocation, useSearchParams } from "react-router-dom"
import { useSearch } from "../store/app-context"
import "./styles/pagination.css"


export default function Pagination({
  currentPage, allPagesArray
}) {

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
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
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
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
          </svg>
        </i>
      </Link>
    </div>
  )
}