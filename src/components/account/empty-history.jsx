import { Link } from "react-router-dom"

export default function EmptyHistory() {
  return (
    <div className="empty-history-msg empty-msg">
      <p>You haven't watched any movies yet.</p>
      <p>Let's <Link to="/discover">explore</Link> some movies!</p>
    </div>
  )
}
