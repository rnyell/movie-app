import { createPortal } from "react-dom"
import { motion } from "framer-motion"
import { modalBackdropVariants, modalVariants, defaultVariantsLabel, modalTransition } from "@utils/motions"


export default function ConfirmModal(props) {
  const { confirmText, setModal, handleSubmittedAction } = props
  
  return createPortal(
    <>
      <motion.div
        className="modal-backdrop"
        onClick={() => setModal(false)}
        variants={modalBackdropVariants}
        {...defaultVariantsLabel}
      />
      <motion.div
        className="modal confirm-modal flex-col"
        variants={modalVariants}
        {...defaultVariantsLabel}
        transition={modalTransition}
      >
        <p>{confirmText}</p>
        {/* <button>Add to watched</button> */}
        <div className="btns flex">
          <button className="btn cancel-btn" onClick={() => setModal(false)}>Cancel</button>
          <button className="btn del-btn" onClick={handleSubmittedAction}>Delete</button>
        </div>
      </motion.div>
    </>,
    document.getElementById("portal")
  )
}
