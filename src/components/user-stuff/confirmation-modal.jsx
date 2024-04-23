import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"


export default function ConfirmationBox() {
  const [showModal, setShowModal] = useState(false)
  
  return (
    <>
      <div className="bookmark-confirmation-box-backdrop" onClick={() => setShowModal(false)}></div>
      <motion.div
        className="bookmark-confirmation-box"
        initial={{ y: -50, opacity: 0.5 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -80, opacity: 0.5 }}
        transition={{ duration: 0.2 }}
      >
        <p>Are you sure you want to remove this movie from your watchlist?</p>
        {/* <button>Add to watched</button> */}
        <div className="btns">
          <button className="btn cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
          <button className="btn del-btn" onClick={hideConfirmationBox}>Delete</button>
        </div>
      </motion.div>
    </>
  )
}
