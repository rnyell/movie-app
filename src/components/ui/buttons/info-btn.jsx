import { InfoIcon } from "@utils/icons"

export default function InfoButton({ setModal }) {
  return (
    <button
      className="main-btn info-btn"
      type="button"
      onClick={() => setModal(true)}
    >
      <i className="icon">
        <InfoIcon />
      </i>
    </button>
  )
}
