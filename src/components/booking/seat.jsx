import { useState } from "react"


export default function Seat({
  seatSelecttHandler,
  validSeatSeletion,
  reservedSeatsNumbers,
  id,
  dx,
  dy,
}) {
  const [select, setSelect] = useState(false)

  function selectedHandler(id) {
    if (validSeatSeletion(id)) {
      setSelect(!select)
      seatSelecttHandler(id, select)
    }
  }

  return (
    <div
      onClick={() => selectedHandler(id)}
      className={`
        seat ${select ? "selected" : ""}
        ${reservedSeatsNumbers.includes(id) && "reserved"}
      `}
      style={{ "--dx": dx, "--dy": `${dy}deg` }}
    ></div>
  )
}
