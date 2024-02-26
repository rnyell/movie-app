import { useEffect, useState, useRef } from "react"

export default function Row({ children, seatCounts }) {
  const [rowWidth, setRowWidth] = useState(0);
  const rowRef = useRef(250);

  useEffect(() => {
    setRowWidth(rowRef.current.clientWidth);
    window.addEventListener("resize", () =>
      setRowWidth(rowRef.current.clientWidth)
    );
  }, []);

  return (
    <div
      className="row"
      ref={rowRef}
      style={{ "--row-width": `${rowWidth}px`, "--seat-counts": seatCounts }}
    >
      {children}
    </div>
  );
}
