import { useSearchParams } from "react-router-dom"
import { useWindow } from "@utils/hooks"
import SideFilter from "./side-filter"
import SmFilter from "./sm-filter"

export default function FilterBox({ setSearchStateCopy }) {
  const { windowWidth } = useWindow()
  const [searchParams] = useSearchParams()  // replace with native?
  const query = searchParams.get("query")

  return (
    <>
      {windowWidth >= 620 ? (
        <SideFilter setSearchStateCopy={setSearchStateCopy} />
      ) : query !== null ? (
        <>
          <h2 className="heading">
            Results for: <span>{query}</span>
          </h2>
          <SmFilter setSearchStateCopy={setSearchStateCopy} />
        </>
      ) : null}
    </>
  )
}
