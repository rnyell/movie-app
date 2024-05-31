import { weekObjShort, monthObj, weekObj } from "@utils/utils"
import Day from "./day"


export default function DateTime({ ticketsCount, price }) {
  const date = new Date()
  const month = date.getMonth()
  const dayOfWeek = date.getDay()
  const dayOfMonth = date.getDate()
  const currentDate = `${weekObj[dayOfWeek]}, ${monthObj[month]} ${dayOfMonth}`
  const daysArray = []

  for (let i = 0; i <= 6; i++) {
    daysArray.push(weekObjShort[(dayOfWeek + i) % 7])
  }

  function submitHandler(e) {
    e.preventDefault()
    const data = new FormData(e.target)
    console.log(Object.fromEntries(data))
  }

  return (
    <div className="datetime flex-col">
      <h2 className="heading">Select Date</h2>
      <form onSubmit={submitHandler} className="flex-col">
        <div className="dates align-center-col">
          <h6>{currentDate}</h6>
          <div className="days">
            {daysArray.map((day, idx) => (
              <Day key={idx} dayOfWeek={day} dayOfMonth={dayOfMonth + idx} />
            ))}
          </div>
        </div>
        <div className="times flex-wrap">
          <label htmlFor="s-1">
            <span>11:30 AM</span>
            <input type="radio" name="time" id="s-1" value="11:30 AM" />
          </label>
          <label htmlFor="s-2">
            <span>17:00 PM</span>
            <input type="radio" name="time" id="s-2" value="17:30 PM" />
          </label>
          <label htmlFor="s-3">
            <span>21:30 PM</span>
            <input type="radio" name="time" id="s-3" value="21:30 PM" />
          </label>
          <label htmlFor="s-4">
            <span>23:45 PM</span>
            <input type="radio" name="time" id="s-4" value="23:45 PM" />
          </label>
          <label htmlFor="s-5">
            <span>02:00 AM</span>
            <input type="radio" name="time" id="s-5" value="02:00 AM" />
          </label>
        </div>

        <div className="cta align-center">
          <div>
            <p className="price">$ {ticketsCount * price}</p>
            <p className="count">{ticketsCount < 2 ? `${ticketsCount} Ticket` : `${ticketsCount} Tickets`}
            </p>
          </div>
          <button type="submit" className="buy-ticket-btn">Buy Ticket</button>
        </div>
      </form>
    </div>
  )
}
