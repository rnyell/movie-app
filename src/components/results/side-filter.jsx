

export default function SideFilter() {
  return (
    <div className="side-filter">
      <form name="side-filter">
        <div className="filter-card">
          <h5 className="heading">Genres</h5>
          <div className="genres-box">
            <label htmlFor="drama" className="flex-center">
              <span>Drama</span>
              <input type="checkbox" id="drama" />
            </label>
            <label htmlFor="thriller" className="flex-center">
              <span>Thriller</span>
              <input type="checkbox" id="thriller" />
            </label>
            <label htmlFor="mystery" className="flex-center">
              <span>Mystery</span>
              <input type="checkbox" id="mystery" />
            </label>
            <label htmlFor="action" className="flex-center">
              <span>Action</span>
              <input type="checkbox" id="action" />
            </label>
            <label htmlFor="romance" className="flex-center">
              <span>Romance</span>
              <input type="checkbox" id="romance" />
            </label>
            <label htmlFor="comdey" className="flex-center">
              <span>Comdy</span>
              <input type="checkbox" id="comdey" />
            </label>
            <label htmlFor="sci-fi" className="flex-center">
              <span>Sci-Fi</span>
              <input type="checkbox" id="sci-fi" />
            </label>
          </div>
        </div>
        <div className="filter-card">
          <h5 className="heading">Releasee Date</h5>
          <input type="number" />
        </div>
        <div className="filter-card">
          <h5 className="heading">Country &amp; language</h5>
          <select id="langs" name="langs">
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
            <option value="fiat">Fiat</option>
            <option value="audi">Audi</option>
          </select>
        </div>
      </form>
    </div>
  )
}
