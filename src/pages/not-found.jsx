import { Link } from "react-router-dom"
import { Button } from "@src/lib/ui/components"

export default function NotFound() {
  const style = {
    height: "100vh",
    display: "grid",
    placeContent: "center",
    placeItems: "center",
    gap: "5rem"
  }

  return (
    <div className="error-page" style={style}>
      <h1 className="heading">Something went wrong :(</h1>
      <div className="btns flex" style={{gap: "1rem"}}>
        <Button variants="outline-lite">
          <Link to="/" className="btn">Home page</Link>
        </Button>
        <Button variants="outline-lite" onClick={() => window.location.reload()}>
          Reload
        </Button>
      </div>
      <div>
        <p>You can also report issues from:</p>
        <p><code style={{fontSize: "0.8rem", whiteSpace: "pre-wrap"}}>Sidebar &#x27F6; Settings &#x27F6; Report Issues</code></p>
      </div>
    </div>
  )
}
