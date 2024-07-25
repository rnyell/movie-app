import { useWindowOffsets } from "@lib/hooks"
import SideFilter from "./side-filter"
import SmFilter from "./sm-filter"

export default function FilterBox({ searchStateCopy, setSearchStateCopy }) {
  const {windowWidth} = useWindowOffsets()
  const isLgScreen = windowWidth >= 620
  const searchParams = new URLSearchParams(location.search)
  const query = searchParams.get("query")

  return (
    <>
      {isLgScreen ? (
        <SideFilter
          searchStateCopy={searchStateCopy}
          setSearchStateCopy={setSearchStateCopy}
        />
      ) : query !== null ? (
        <>
          <h2 className="heading">
            Results for: <span className="searched-title">{query.replaceAll("-", " ")}</span>
          </h2>
          <SmFilter
            searchStateCopy={searchStateCopy}
            setSearchStateCopy={setSearchStateCopy}
          />
        </>
      ) : null}
    </>
  )
}
