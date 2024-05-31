import { useState } from "react"
import {
  seatNumbers,
  updatedSeats,
  reservedSeatsNumbers,
  validSeatSeletion
} from "@services/placeholder-data"
import Row from "./row"
import Seat from "./seat"


export default function Seats({ ticketsCount, setTicketsCount }) {
  const [seatsStates, setSeatsStates] = useState(updatedSeats)

  function seatSelecttHandler(id, select) {
    setSeatsStates(
      seatsStates.map((seat) =>
        seat.id === id ? { ...seat, isReserved: !select } : seat
      )
    )

    if (select) {
      setTicketsCount(ticketsCount - 1)
    } else {
      setTicketsCount(ticketsCount + 1)
    }
    return
  }


  return (
    <div className="seats align-center-col ::after-abs">
      <h2 className="heading">Select Your Seat</h2>
      <div className="screen">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
          <path d="M 60 340 Q 400 260 740 340 C 740 340 720 360 720 360 Q 400 260 80 360 C 80 360 60 340 60 340" />
        </svg>
      </div>
      <div className="rows">
        <Row seatCounts={6}>
          {seatNumbers.slice(0, 6).map((e, index) => (
            <Seat
              seatSelecttHandler={seatSelecttHandler}
              validSeatSeletion={validSeatSeletion}
              reservedSeatsNumbers={reservedSeatsNumbers}
              key={e}
              id={e}
              dx={index}
              dy={index * (180 / 5)}
            />
          ))}
        </Row>

        <Row seatCounts={7}>
          {seatNumbers.slice(6, 13).map((e, index) => (
            <Seat
              seatSelecttHandler={seatSelecttHandler}
              validSeatSeletion={validSeatSeletion}
              reservedSeatsNumbers={reservedSeatsNumbers}
              key={e}
              id={e}
              dx={index}
              dy={index * (180 / 6)}
            />
          ))}
        </Row>

        <Row seatCounts={8}>
          {seatNumbers.slice(13, 21).map((e, index) => (
            <Seat
              seatSelecttHandler={seatSelecttHandler}
              validSeatSeletion={validSeatSeletion}
              reservedSeatsNumbers={reservedSeatsNumbers}
              key={e}
              id={e}
              dx={index}
              dy={index * (180 / 7)}
            />
          ))}
        </Row>

        <Row seatCounts={8}>
          {seatNumbers.slice(21, 29).map((e, index) => (
            <Seat
              seatSelecttHandler={seatSelecttHandler}
              validSeatSeletion={validSeatSeletion}
              reservedSeatsNumbers={reservedSeatsNumbers}
              key={e}
              id={e}
              dx={index}
              dy={index * (180 / 7)}
            />
          ))}
        </Row>

        <Row seatCounts={8}>
          {seatNumbers.slice(29, 37).map((e, index) => (
            <Seat
              seatSelecttHandler={seatSelecttHandler}
              validSeatSeletion={validSeatSeletion}
              reservedSeatsNumbers={reservedSeatsNumbers}
              key={e}
              id={e}
              dx={index}
              dy={index * (180 / 7)}
            />
          ))}
        </Row>

        <Row seatCounts={8}>
          {seatNumbers.slice(37, 45).map((e, index) => (
            <Seat
              seatSelecttHandler={seatSelecttHandler}
              validSeatSeletion={validSeatSeletion}
              reservedSeatsNumbers={reservedSeatsNumbers}
              key={e}
              id={e}
              dx={index}
              dy={index * (180 / 7)}
            />
          ))}
        </Row>
      </div>

      <div className="seats-states flex">
        <div className="reserved">
          <div className="seat-color"></div>
          <p>Reserved</p>
        </div>
        <div className="available">
          <div className="seat-color"></div>
          <p>Availabe</p>
        </div>
        <div className="selected">
          <div className="seat-color"></div>
          <p>Selected</p>
        </div>
      </div>
    </div>
  )
}
