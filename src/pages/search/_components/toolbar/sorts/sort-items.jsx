import { useSearch } from "@src/store"
import { strCapitalizer } from "@lib/utils"
import cn from "@lib/ui/cn"
import { BarsArrowDownIcon, BarsArrowUpIcon } from "@heroicons/outline"
import { sortResults, submitBtn_styles, title_styles } from "../../../_utils"

const sort_items = [
  { item: "none", name: "none" },
  { item: "popularity", name: "popularity" },
  { item: "vote_average", name: "rating" },
  { item: "release_date" , name: "release date" },
  { item: "title" , name: "title" },
]


export default function SortItems({ setSearchResults, searchResults }) {
  const {searchOptions, optionsDispatch} = useSearch()

  function handleSubmitSorts(e) {
    e.stopPropagation()
    e.preventDefault()
    const formData = new FormData(e.target)
    const sortby = formData.get("sortby")
    const order = formData.get("order")
    const unsortedResults = searchResults.results
    const sortedResults = sortResults(unsortedResults, sortby, order)
    setSearchResults({ ...searchResults, results: sortedResults })
    optionsDispatch({ type: "set_sortby", sortby })
    optionsDispatch({ type: "set_order", order })
  }

  const label_styles = `
    py-3 px-4 min-w-36 text-[0.95rem] bg-primary-600 rounded-xl transition-colors
    hover:bg-primary-500 has-[:checked]:bg-primary-300 has-[:checked]:font-medium has-[:checked]:text-primary-900
  `


  return (
    <form className="min-w-[225px] grid grid-cols-2 grid-rows-2 gap-y-4 gap-x-3" onSubmit={handleSubmitSorts}>
      <div className="col-start-1 col-end-2 row-start-1 row-end-3">
        <h6 className={title_styles}>Sort by</h6>
        <div className="flex-col gap-2">
          {sort_items.map(obj => (
            <label className={label_styles} key={obj.item} htmlFor={obj.item}>
              {strCapitalizer(obj.name)}
              <input
                type="radio"
                name="sortby"
                id={obj.item}
                value={obj.item}
                defaultChecked={searchOptions.sorts.sortby === obj.item}
                disabled={obj.item === "title" || obj.item === "release_date"}
                title={(obj.item === "title" || obj.item === "release_date") ? "feature currently is not availabe" : null}
              />
            </label>
          ))}
        </div>
      </div>
      <div className="col-start-2 col-end-3 row-start-1 row-end-3">
        <h6 className={title_styles}>Order</h6>
        <div className="flex-col gap-2">
          <label className={`${label_styles} align-center gap-2`} htmlFor="desc">
            <i className="icon icon-md"><BarsArrowDownIcon /></i><span>Desc.</span>
            <input
              type="radio"
              name="order"
              id="desc"
              value="desc"
              defaultChecked={searchOptions.sorts.order === "desc"}
            />
          </label>
          <label className={`${label_styles} align-center gap-2`} htmlFor="asc">
            <i className="icon icon-md"><BarsArrowUpIcon /></i><span>Asc.</span>
            <input
              type="radio"
              name="order"
              id="asc"
              value="asc"
              defaultChecked={searchOptions.sorts.order === "asc"}
            />
          </label>
        </div>
      </div>
      <button className={cn(submitBtn_styles, "mt-0 col-start-2 col-end-3 row-start-2 row-end-3 self-end")}>Apply</button>
    </form>
  )
}
