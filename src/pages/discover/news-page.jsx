import { weekObj, monthObj } from "@utils/utils"

export default function NewsPage() {
  const date = new Date()
  const month = date.getMonth()
  const dayOfWeek = date.getDay()
  const dayOfMonth = date.getDate()
  const currentDate = `${weekObj[dayOfWeek]}, ${monthObj[month]} ${dayOfMonth}`

  return (
    <div>
      <p className="date">{currentDate}</p>
    </div>
  )
}
