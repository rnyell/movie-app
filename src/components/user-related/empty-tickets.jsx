import { Link } from "react-router-dom"

export default function EmptyTickets() {
  return (
    <div className="empty-tickets-msg empty-msg">
      <p>No movies is reserved yet.</p>
      <p>You can reserve tickets from <Link to="/onscreen">in cinema</Link>.</p>
    </div>
  )
}