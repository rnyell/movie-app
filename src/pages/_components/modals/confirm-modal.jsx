import { Modal, Button } from "@src/lib/ui/components"

export default function ConfirmModal(props) {
  const { confirmText, setModal, handleSubmittedAction } = props
  
  return (
    <Modal setClose={() => setModal(false)} size="lg" variants="confirm">
      <div className="confirm-modal flex-col">
        <p>{confirmText}</p>
        <div className="btns flex">
          <Button
            variants="outline-lite"
            size="md"
            onClick={() => setModal(false)}
          >
            Cancel
          </Button>
          <Button variants="danger" size="md" onClick={handleSubmittedAction}>Delete</Button>
        </div>
      </div>
    </Modal>
  )
}
