import { useState } from "react"
import { isValidSeatSeletion, reservedSeatsNumbers } from "@services/placeholder-data"
import { useBookingData } from "@src/store/booking-context"


export default function Seat({ id, dx, dy }) {
  const {ticketDispatch} = useBookingData()
  const [isSelected, setIsSelected] = useState(false)

  function handleSeatSelection(id) {
    if (isValidSeatSeletion(id)) {
      setIsSelected(!isSelected)
      ticketDispatch({
        type: "select_seat",
        seatNumber: id,
      })
    }
  }

  return (
    <div
      className={`seat ${reservedSeatsNumbers.has(id) ? "reserved" : "available"} ${isSelected ? "selected" : ""}`}
      style={{ "--dx": dx, "--dy": `${dy}deg` }}
      onClick={() => handleSeatSelection(id)}
    />
  )
}
