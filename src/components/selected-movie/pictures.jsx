import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { motion, AnimatePresence } from "framer-motion"
import { PhotoIcon, XMarkIcon } from "@heroicons/solid"
import { defaultVariantsLabel, modalBackdropVariants } from "@utils/motions"
import { IMAGES_URL } from "@utils/apis"
import ImageSlider from "./image-slider"


export default function Pictures({ images }) {
  const {backdrops} = images
  const [isOpen, setIsOpen] = useState(false)


  return (
    <div className="pictures">
      <h4 className="heading">Photos</h4>
      <div className="preview">
        {backdrops.slice(0, 5).map(img => (
          <figure key={img.file_path}>
            <img src={`${IMAGES_URL}w500${img.file_path}`} />
          </figure>
        ))}
        <button className="btn photo-btn" onClick={() => setIsOpen(true)}>
          <div className="icon"><PhotoIcon /></div>
          <span>More Images</span>
        </button>
      </div>
      {createPortal(
        <AnimatePresence>
          {isOpen && <Gallery images={images} setModal={setIsOpen} />}
        </AnimatePresence>,
        document.getElementById("root")
      )}
    </div>
  )
}


function Gallery({ images, setModal }) {
  const {backdrops, posters} = images
  const tabs = ["Images", "Posters"]
  const [selectedTab, setSelectedTab] = useState(tabs[0])
  const [currIndex, setCurrIndex] = useState(0)
  const [isFullsize, setIsFullsize] = useState(false)

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPresses)

    return () => {
      document.removeEventListener("keydown", handleKeyPresses)
    }
  }, [])

  function handleKeyPresses({code}) {
    if (code === "Escape") {
      setModal(false)
    }
  }

  function handleThumbnailClick(idx) {
    setIsFullsize(true)
    setCurrIndex(idx)
  }


  return (
    <>
      <motion.div
        className="modal-backdrop"
        variants={modalBackdropVariants}
        {...defaultVariantsLabel}
        onClick={() => setModal(false)}
      />
      <motion.div
        className="modal gallery"
        variants={{
          initial: {
            y: -25,
            opacity: 0.75,
            scale: 0.98
          },
          animate: {
            y: 0,
            opacity: 1,
            scale: 1
          },
          exit: {
            y: -35,
            opacity: 0.75,
            scale: 0.98
          }
        }}
        {...defaultVariantsLabel}
        transition={{duration: 0.35, ease: "easeOut"}}
      >
        <button className="btn close-btn" onClick={() => setModal(false)}>
          <i className="icon"><XMarkIcon /></i>
        </button>
        <h3>Gallery</h3>
        <div className="wrapper">
          <nav className="tabs flex">
            {tabs.map(tab => (
              <motion.b
                className="tab"
                key={tab}
                onClick={() => setSelectedTab(tab)}
              >
                {tab}
                {selectedTab === tab && (
                  <motion.u
                    className="tab-indicator absolute-justify-center"
                    layoutId="selected"
                  />
                )}
              </motion.b>
            ))}
          </nav>
          <div>
            {selectedTab === "Images" ? (
              <div className="images container">
                {backdrops.slice(0, 24).map((img, idx) => (
                  <figure className="thumbnail" onClick={() => handleThumbnailClick(idx)} key={img.file_path}>
                    <img src={`${IMAGES_URL}w500${img.file_path}`} />
                  </figure>
                ))}
              </div>
            ) : (
              <div className="posters container">
                {posters.slice(0, 12).map((img, idx) => (
                  <figure className="thumbnail" onClick={() => handleThumbnailClick(idx)} key={img.file_path}>
                    <img src={`${IMAGES_URL}w500${img.file_path}`} />
                  </figure>
                ))}
              </div>
            )}
          </div>
        </div>
        {createPortal(
          <AnimatePresence>
            {isFullsize && (
              <ImageSlider
                images={selectedTab === "Images" ? backdrops : posters}
                currIndex={currIndex}
                setCurrIndex={setCurrIndex}
                setModal={setIsFullsize}
              />
            )}
          </AnimatePresence>,
          document.getElementById("root")
        )}
      </motion.div>
    </>
  )
}
