import { ALL_GENRES } from "@utils/apis"

const ALL_GENRES_ARRAY = []
for (let prop in ALL_GENRES) {
  ALL_GENRES_ARRAY.push({ name: ALL_GENRES[prop], id: prop })
}


export default function SideFilter({ setSearchStateCopy }) {
  return (
    <div className="side-filter ::after-abs">
      <form name="side-filter" className="flex-col">
        <div className="filter-card flex-col ::after-abs">
          <h5 className="heading">Genres</h5>
          <div className="group genres-box">
            {ALL_GENRES_ARRAY.map(genre => (
              <label key={genre.id} className="flex-center" htmlFor={genre.name}>
                <span>{genre.name}</span>
                <input type="checkbox" id={genre.name} />
              </label>
            ))}
          </div>
        </div>
        <div className="filter-card flex-col">
          <h5 className="heading">Releasee Date</h5>
          <div className="group date-box flex-col">
            <label htmlFor="from" className="flex-y-center">
              <span>from:</span> <input type="text" id="from" pattern="[+]?\d+" />
            </label>
            <label htmlFor="to" className="flex-y-center">
              <span>to:</span> <input type="text" id="to" pattern="[+]?\d+" />
            </label>
          </div>
        </div>
        <div
          data-feature-not-available
          title="feature currently is not available"
          className="filter-card flex-col"
        >
          <h5 className="heading">Country &amp; language</h5>
          <div className="group lang-box flex-col">
            <label htmlFor="langs" className="flex-y-center">
              <span>Language:</span>
              <div className="::after-abs">
                <select id="langs" name="langs">
                  <option value="English">English</option>
                  <option value="French">French</option>
                  <option value="Dutch">Dutch</option>
                </select>
              </div>
            </label>
            <label htmlFor="countries" className="flex-y-center">
              <span>Origin Country:</span>
              <div className="::after-abs">
                <select id="countries" name="countries">
                  <option value="US">US</option>
                  <option value="England">England</option>
                  <option value="France">France</option>
                </select>
              </div>
            </label>
          </div>
        </div>
      </form>
    </div>
  )
}
