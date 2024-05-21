import { motion } from "framer-motion"
import { formatReleaseDate } from "@utils/utils"
import { portraitCardOverlayVariants, defaultVariantsLabel } from "@utils/motions"
import Overview from "@components/movie/details/overview"
import BookmarkButton from "@components/buttons/bookmark-btn"
import BookmarkDeleteButton from "@components/buttons/bookmark-del-btn"
import InfoButton from "@components/buttons/info-btn"
import LinkButton from "@components/buttons/link-btn"


export default function SecondaryOverlay({ result, variant, ...rest }) {
  const {media, setModal} = rest
  const id = result.id
  const title = result.title || result.name


  return (
    <motion.div
      className="secondary-overlay flex-col"
      variants={portraitCardOverlayVariants}
      {...defaultVariantsLabel}
    >
      <motion.h4
        className="overlay-title box-clamp"
        initial={{y: -8}}
        animate={{y: 0}}
        exit={{y: -8}}
      >
        {title}
      </motion.h4>
      {variant === "bookmarked" && (
        <motion.span
          className="release-date"
          initial={{y: -9}}
          animate={{y: 0}}
          exit={{y: -9}}
        >
          {formatReleaseDate(result.release_date)}
        </motion.span>
      )}
      <motion.div
        initial={{y: -5, opacity: 0}}
        animate={{y: 0, opacity: 1}}
        exit={{y: -5, opacity: 0}}
      >
        <Overview text={result.overview} />
      </motion.div>
      <motion.div
        className="overlay-cta-btns justify-center absolute-justify-center"
        initial={{y: 12}}
        animate={{y: 0}}
        exit={{y: 12}}
      >
        {variant === "result" ? (
          <>
            <BookmarkButton item={{id, media}} />
            <InfoButton setModal={setModal} />
          </>
        ) : (
          <>
            <BookmarkDeleteButton setModal={setModal} />
            <LinkButton linkData={{id, media, blank: false}} />
          </>
        )}
      </motion.div>
    </motion.div>
  )
}
