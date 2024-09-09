// import { lazy } from "react"
import { useAppContext } from "@src/store"
import { useAuth } from "@src/auth/auth-context"
import { Presence } from "@lib/motion"
import LoginModal from "./login-modal"
import ListsModal from "./lists-modal"
import InfoModal from "./info-modal"
import DetailsModal from "./details-modal"
import ConfirmModal from "./confirm-modal"
import EditList from "./edit-list"

export default function DisplayedModal() {
  const { modals, modalDispatch } = useAppContext()
  const { session } = useAuth()

  function setClose() {
    modalDispatch({ type: "none" })
  }

  const loginModal = (
    <LoginModal message={modals.data?.errMsg} setClose={setClose} />
  )

  const renderModal = () => {
    switch (modals.variant) {
      case "watch": {
        if (session) {
          return null
        } else {
          return loginModal
        }
      }
      case "lists": {
        if (session) {
          const item = {
            id: modals.data.id,
            media: modals.data.media,
          }

          return <ListsModal item={item} setClose={setClose} />
        } else {
          return loginModal
        }
      }
      case "fave_toast": {
        if (session) {
          return <FaveToast />
        } else {
          return loginModal
        }
      }
      case "movie_info": {
        return (
          <InfoModal
            result={modals.data.result}
            media={modals.data.media}
            setClose={setClose}
          />
        )
      }
      case "movie_details": {
        return (
          <DetailsModal
            result={modals.data.result}
            setClose={setClose}
          />
        )
      }
      case "edit_list": {
        return (
          <EditList listId={modals.data.listId} />
        )
      }
      case "confirmation": {
        return (
          <ConfirmModal
            msg={modals.data.msg}
            onConfirm={modals.data.onConfirm}
            setClose={setClose}
          />
        )
      }
      default: {
        return null
      }
    }
  }

  return <Presence trigger={modals.isOpen}>{renderModal()}</Presence>
}
