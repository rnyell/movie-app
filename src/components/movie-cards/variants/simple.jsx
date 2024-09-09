import { IMAGES_URL } from "@services"
import { useAppContext } from "@src/store"
import { Card } from ".."
import { Title } from "@components/movie-details"
import InfoButton from "@components/buttons/info-btn"

export default function SimpleCard({ result, media, variant }) {
  const { modalDispatch } = useAppContext()
  const { id, title, name, backdrop_path } = result

  function showDetailsModal() {
    // TODO: "movie_details" instead of "movie_info"
    modalDispatch({
      type: "movie_info",
      data: { result, media },
    })
  }

  return (
    <Card.Container
      isMotion
      data-variant={variant}
      initial={{ opacity: 0.9 }}
      whileHover={{ opacity: 1, scale: 1.05 }}
      transition={{ type: "tween", duration: 0.15 }}
    >
      <Card.Figure src={`${IMAGES_URL}w500${backdrop_path}`} />
      <Card.Body customStyles="flex">
        <Title title={title || name} width="90%" />
        <InfoButton
          className="ml-auto"
          variant="outline-bold"
          size="xs"
          iconSize="sm"
          setModal={showDetailsModal}
        />
      </Card.Body>
    </Card.Container>
  )
}
