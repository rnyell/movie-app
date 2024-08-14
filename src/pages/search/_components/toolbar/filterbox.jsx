import { useWindowOffsets } from "@lib/hooks"
import SideFilter from "./side-filter"
import SmFilter from "./sm-filter"

export default function FilterBox({ searchResults, setSearchResults }) {
  const {windowWidth} = useWindowOffsets()
  const isLgScreen = windowWidth >= 620
  const searchParams = new URLSearchParams(location.search)
  const query = searchParams.get("query")

  return (
    <>
      {isLgScreen ? (
        <SideFilter
          searchResults={searchResults}
          setSearchResults={setSearchResults}
        />
      ) : query !== null ? (
        <>
          <h2 className="heading">
            Results for: <span className="searched-title">{query.replaceAll("-", " ")}</span>
          </h2>
          <SmFilter
            searchResults={searchResults}
            setSearchResults={setSearchResults}
          />
        </>
      ) : null}
    </>
  )
}
