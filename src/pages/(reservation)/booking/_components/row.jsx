import { useEffect, useState, useRef } from "react"


export default function Row({ children, seatCounts }) {
  const rowRef = useRef(250)
  const [rowWidth, setRowWidth] = useState(0)

  useEffect(() => {
    setRowWidth(rowRef.current.clientWidth)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  function handleResize() {
    setRowWidth(rowRef.current.clientWidth)
  }


  return (
    <div
      className="row"
      ref={rowRef}
      style={{ "--row-width": `${rowWidth}px`, "--seat-counts": seatCounts }}
    >
      {children}
    </div>
  )
}
