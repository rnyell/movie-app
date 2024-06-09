import { createPortal } from "react-dom"
import { motion } from "framer-motion"
import { useBookingData } from "@src/store/booking-context"


export default function Ticket({ setModal }) {
  const {ticketData} = useBookingData()
  const {title} = ticketData


  return createPortal(
    <>
      <div className="modal-backdrop" onClick={() => setModal(false)} />
      <div className="modal">
        <div className="ticket">
          <h2>ticket</h2>
          <h5>{title}</h5>
        </div>
      </div>
    </>,
    document.getElementById("portal")
  )
}
