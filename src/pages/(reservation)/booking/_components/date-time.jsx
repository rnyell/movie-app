import { useState, useEffect, useRef } from "react"
import { weekObjShort, monthObj, weekObj } from "@lib/utils"
import { useBookingData } from "@src/store"
import Day from "./day"
import Ticket from "./ticket"


export default function DateTime() {
  const {ticketData, ticketDispatch} = useBookingData()
  const {count, price} = ticketData
  const [showTicket, setShowTicket] = useState(false)
  // const seatsRef = useRef(null)
  const formRef = useRef(null)

  const date = new Date()
  const month = date.getMonth()
  const dayOfWeek = date.getDay()
  const dayOfMonth = date.getDate()
  const currentDate = `${weekObj[dayOfWeek]}, ${monthObj[month]} ${dayOfMonth}`
  const daysArray = []

  for (let i = 0; i <= 6; i++) {
    daysArray.push(weekObjShort[(dayOfWeek + i) % 7])
  }

  useEffect(() => {
    // seatsRef.current = document.querySelector(".seats .wrapper")
  }, [])

  function submitHandler(e) {
    e.preventDefault()
    const formData = new FormData(e.target)
    const selectedDate = formData.get("date")
    const selectedTime = formData.get("time")
    ticketDispatch({
      type: "select_datetime",
      date: selectedDate,
      time: selectedTime
    })

    if (ticketData.count === 0) {
      // seatsRef.current.classList.add("invalid")
    } else if (selectedDate === null || selectedTime === null) {
      // formRef.current.classList.add("invalid")
    } else {
      setShowTicket(true)
      ticketDispatch({ type: "confirm_ticket" })
    }
  }


  return (
    <div className="datetime flex-col">
      <h2 className="heading">Select Date</h2>
      <div className="empty-space" />
      <form onSubmit={submitHandler} className="flex-col" ref={formRef}>
        <div className="dates align-center-col">
          <h6>{currentDate}</h6>
          <div className="days">
            {daysArray.map((day, idx) => (
              <Day key={idx} dayOfWeek={day} dayOfMonth={dayOfMonth + idx} />
            ))}
          </div>
        </div>
        <div className="times flex">
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
            <p className="price">${count * price}</p>
            <p className="count">{count < 2 ? `${count} Ticket` : `${count} Tickets`}
            </p>
          </div>
          <button type="submit" className="buy-ticket-btn">Buy Ticket</button>
        </div>
      </form>

      {showTicket && <Ticket setModal={setShowTicket} />}
    </div>
  )
}
