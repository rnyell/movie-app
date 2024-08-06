import { Modal, Button } from "@lib/ui/components"

export default function ConfirmModal({ confirmText, onConfirm, setClose }) {
  return (
    <Modal setClose={setClose} size="lg" variants="confirm">
      <div className="confirm-modal flex-col">
        <p>{confirmText}</p>
        <div className="btns flex">
          <Button variants="outline-lite" size="md" onClick={setClose}>Cancel</Button>
          <Button variants="danger" size="md" onClick={onConfirm}>Delete</Button>
        </div>
      </div>
    </Modal>
  )
}
