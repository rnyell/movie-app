import { useState } from "react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { IMAGES_URL } from "@services"
import { useMediaDetails } from "@services/hooks"
import { Presence } from "@lib/motion"
import { Icon } from "@lib/ui/components"
import { Card } from ".."
import { Title } from "@components/movie-details"
import { PlayIcon } from "@heroicons/solid"


export default function PlayedCard({ result, media, variant }) {
  const [cardOverlay, setCardOverlay] = useState(false)
  const {isLoading, mediaDetails} = useMediaDetails("movie", result)
  const navigate = useNavigate()

  const {
    id,
    title,
    runtime,
    backdrop_path,
  } = mediaDetails

  function handleRewatch() {
    navigate("/player", { state: { id, media } })
  }


  return (
    <Card.Container
      variant={variant}
      isMotion
      onHoverStart={() => setCardOverlay(true)}
      onHoverEnd={() => setCardOverlay(false)}
    >
      <Card.Figure src={`${IMAGES_URL}original${backdrop_path}`}>
      <div className="bar" />
      <Presence trigger={cardOverlay}>
        <motion.div
          className="hover-overlay grid-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ type: "tween", duration: 0.2, ease: "easeOut" }}
        >
          <button className="btn justify-center" type="button" onClick={handleRewatch}>
            <i className="icon">
              <PlayIcon />
            </i>
            Re-watch
          </button>
        </motion.div>
      </Presence>
      </Card.Figure>
      <Card.Body>
        <Title title={title} size="sm" width="85%" />
      </Card.Body>
    </Card.Container>
  )
}
