import { useSearchParams } from "react-router-dom"
import { useWindowOffsets } from "@lib/hooks"
import Header from "@components/headers/header"
import AnimatedHeader from "@components/headers/animated-header"
import FilterBox from "./_components/toolbar/filterbox"
import SearchResults from "./_components/search-results"
import { useSearchResults } from "./_hooks"

import corn from "@src/assets/corn.png"
import SortDropdown from "./_components/toolbar/sorts/sort-dropdown"

export default function SearchPage() {
  const { windowWidth } = useWindowOffsets()
  const isLgScreen = windowWidth >= 620
  const [searchParams] = useSearchParams()
  const query = searchParams.get("query")
  const isInitialMarkup = query === null

  const { searchResults, setSearchResults, isLoading } = useSearchResults(query)


  return (
    <div className="search-page">
      {/* {isLgScreen ? <Header /> : <AnimatedHeader />} */}
      <aside data-screen={isLgScreen ? "lg-screen" : "sm-screen"}>
        <FilterBox searchResults={searchResults} setSearchResults={setSearchResults} />
      </aside>
      <main>
        {isInitialMarkup ? (
          <div className="mt-10 p-4 w-5/6 flex-col items-start 2xl:flex-row gap-2 text-xl">
            <div>
              <p>Discover TMDb's movies and series.</p>
              <p>Use filter and sorts to refine your searches.</p>
            </div>
            <img className="mx-auto py-4 w-5/6 max-w-[400px] block" src={corn} />
          </div>
        ) : (
          <>
            {isLgScreen && (
              <header className="w-full pt-4 pb-6 px-2 relative align-center">
                <h2 className="heading">
                  Results for:
                  <span className="searched-title">{query.replaceAll("-", " ")}</span>
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
