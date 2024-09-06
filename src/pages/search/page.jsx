import { useSearchParams } from "react-router-dom"
import { useWindowOffsets } from "@lib/hooks"
import Navigation from "@components/menus/navigation"
import Header from "@components/headers/header"
import ElasticHeader from "@components/headers/elastic-header"
import FilterBox from "./_components/toolbar/filterbox"
import SearchResults from "./_components/search-results"
import SortDropdown from "./_components/toolbar/sorts/sort-dropdown"
import { useSearchResults } from "./_hooks"

import corn from "@src/assets/corn.png"

export default function SearchPage() {
  const { windowWidth } = useWindowOffsets()
  const isLgScreen = windowWidth >= 620
  const [searchParams] = useSearchParams()
  const query = searchParams.get("query")
  const isInitialMarkup = query === null

  const { searchResults, setSearchResults, isLoading } = useSearchResults(query)

  return (
    <div className="search-page">
      <div className="header-container">
        {isLgScreen ? <Header /> : <ElasticHeader />}
      </div>
      <div className="sidenav-container">
        <Navigation />
      </div>
      <aside data-screen={isLgScreen ? "lg-screen" : "sm-screen"}>
        <FilterBox
          searchResults={searchResults}
          setSearchResults={setSearchResults}
        />
      </aside>
      <main>
        {isInitialMarkup ? (
          <div className="mt-10 p-4 w-5/6 flex items-start gap-2 xs:flex-col text-xl">
            <div>
              <p>Discover TMDb's movies and series.</p>
              <p>Use filter and sorts to refine your searches.</p>
            </div>
            <img className="mx-auto py-4 w-5/6 max-w-[400px] block" src={corn} />
          </div>
        ) : (
          <>
            {isLgScreen && (
              <header className="w-full pt-10 pb-8 px-2 relative align-center">
                <h2 className="heading">
                  Results for:
                  <span className="searched-title">
                    {query.replaceAll("-", " ")}
                  </span>
                </h2>
                <SortDropdown
                  className="ml-auto"
                  searchResults={searchResults}
                  setSearchResults={setSearchResults}
                />
                <div className="w-full h-[1px] absolute bottom-0 bg-primary-600" />
              </header>
            )}
            <SearchResults isLoading={isLoading} searchResults={searchResults} />
          </>
        )}
      </main>
    </div>
  )
}
