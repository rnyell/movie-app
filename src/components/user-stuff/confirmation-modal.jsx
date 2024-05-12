import { motion } from "framer-motion"


export default function ConfirmationModal(props) {
  const { confirmText, setModal, handleSubmittedAction } = props
  
  return (
    <>
      <div className="bookmark-confirmation-box-backdrop" onClick={() => setModal(false)}></div>
      <motion.div
        className="bookmark-confirmation-box"
        initial={{ y: -50, opacity: 0.5 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -80, opacity: 0.5 }}
        transition={{ duration: 0.2 }}
      >
        <p>{confirmText}</p>
        {/* <button>Add to watched</button> */}
        <div className="btns">
          <button className="btn cancel-btn" onClick={() => setModal(false)}>Cancel</button>
          <button className="btn del-btn" onClick={handleSubmittedAction}>Delete</button>
        </div>
      </motion.div>
    </>
  )
}
