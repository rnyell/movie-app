import { InfoIcon } from "@utils/icons"


export default function InfoButton({ setModal }) {

  return (
    <button className="main-btn info-btn" onClick={() => setModal(true)}>
      <i className="icon">
        <InfoIcon />
      </i>
    </button>
  )
}