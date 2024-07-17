import { useNewsService } from "@services/hooks"
import { weekObj, monthObj } from "@lib/utils"


export default function NewsPage() {
  const date = new Date()
  const month = date.getMonth()
  const dayOfWeek = date.getDay()
  const dayOfMonth = date.getDate()
  const currentDate = `${weekObj[dayOfWeek]}, ${monthObj[month]} ${dayOfMonth}`

  const {isLoading, news} = useNewsService()


  return (
    <div className="news-page grid">
      <header>
        <span className="date">{currentDate}</span>
      </header>

      <div className="hero">
        
      </div>

      <div className="main">

      </div>

      <aside className="side">

      </aside>
    </div>
  )
}
