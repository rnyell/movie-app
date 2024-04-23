import { useWindow } from "@utils/hooks"
import SideFilter from "./side-filter"
import SmFilter from "./sm-filter"

export default function FilterBox({ searchStateCopy, setSearchStateCopy }) {
  const { windowWidth } = useWindow()
  const searchParams = new URLSearchParams(location.search)
  const query = searchParams.get("query")

  return (
    <>
      {windowWidth >= 620 ? (
        <SideFilter
          searchStateCopy={searchStateCopy}
          setSearchStateCopy={setSearchStateCopy}
        />
      ) : query !== null ? (
        <>
          <h2 className="heading">
            Results for: <span>{query}</span>
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
