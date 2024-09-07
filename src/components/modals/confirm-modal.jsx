import { Modal, Button } from "@lib/ui/components"

export default function ConfirmModal({ msg, onConfirm, setClose }) {
  return (
    <Modal setClose={setClose} size="lg" variants="confirm">
      <div className="flex-col">
        <p>{msg}</p>
        <div className="mt-8 ml-auto mr-2 flex gap-4">
          <Button variants="outline-lite" size="md" onClick={setClose}>
            Cancel
          </Button>
          <Button
            variants="danger"
            size="md"
            onClick={() => {
              onConfirm()
              setClose()
            }}
          >
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  )
}
