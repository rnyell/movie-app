import { createPortal } from "react-dom"
import { motion } from "framer-motion"
import { monthObj } from "@lib/utils"
import { useBookingData } from "@src/store/booking-context"


export default function Ticket({ setModal }) {
  const {ticketData} = useBookingData()
  const {
    title,
    poster,
    count,
    prcie,
    seats,       // number[]
    date,
    time
  } = ticketData
  console.log(ticketData)


  return createPortal(
    <>
      <div className="modal-backdrop" onClick={() => setModal(false)} />
      <div className="modal">
        <div className="ticket flex-col">
          <h2>ticket</h2>
          <h5 className="title">{title}</h5>
          <div className="date-time">{date} {monthObj[new Date().getMonth()]} | {time}</div>
          <div>{count} {`${count > 1 ? "Seats" : "Seat"}`}</div>
          <div>{seats.map(seat => <span key={seat}>{seat}</span>)}</div>
        </div>
      </div>
    </>,
    document.getElementById("portal")
  )
}
