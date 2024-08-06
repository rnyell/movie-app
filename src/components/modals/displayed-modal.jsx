import { useAppContext } from "@src/store"
import { useAuth } from "@src/auth/auth-context"
import LoginModal from "./login-modal"
import ListsModal from "./lists-modal"
import InfoModal from "./info-modal"
import DetailsModal from "./details-modal"
import ConfirmModal from "./confirm-modal"


export default function DisplayedModal() {
  const { session } = useAuth()
  const { modals, modalDispatch } = useAppContext()

  function setClose() {
    modalDispatch({type: "none"})
  }

  const loginModal = <LoginModal message={modals.data?.errMsg} setClose={setClose} />

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
          media: modals.data.media
        }

        return (
          <ListsModal item={item} setClose={setClose} />
        )
      } else {
        return loginModal
      }
    }
    case "fave_toast": {
      if (session) {
        return (
          <FaveToast />
        )
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
          price={modals.data.price}
          setClose={setClose}
        />
      )
    }
    case "confirm_modal": {
      return (
        <ConfirmModal
          confirmText={modals.data.msg}
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
