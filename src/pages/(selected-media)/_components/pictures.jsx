import { useState } from "react"
import { motion } from "framer-motion"
import { PhotoIcon, XMarkIcon } from "@heroicons/solid"
import { IMAGES_URL } from "@services"
import { Presence } from "@lib/motion"
import { Button, Modal } from "@lib/ui/components"
import ImageSlider from "./image-slider"

import "./pictures.css"

export default function Pictures({ images }) {
  const { backdrops } = images
  const [isOpen, setOpen] = useState(false)

  return (
    <div className="pictures">
      <h4 className="heading">Photos</h4>
      <div className="preview">
        {backdrops.slice(0, 5).map((img) => (
          <figure key={img.file_path}>
            <img src={`${IMAGES_URL}w500${img.file_path}`} />
          </figure>
        ))}
        <button
          className="btn photo-btn"
          type="button"
          onClick={() => setOpen(true)}
        >
          <div className="icon">
            <PhotoIcon />
          </div>
          <span>More Images</span>
        </button>
      </div>
      <Presence trigger={isOpen}>
        <Gallery images={images} setModal={setOpen} />
      </Presence>
    </div>
  )
}

function Gallery({ images, setModal }) {
  const { backdrops, posters } = images
  const TABS = ["Images", "Posters"]
  const [selectedTab, setSelectedTab] = useState(TABS[0])
  const [currIndex, setCurrIndex] = useState(0)
  const [isFullsize, setFullsize] = useState(false)

  function handleThumbnailClick(idx) {
    setFullsize(true)
    setCurrIndex(idx)
  }

  // const variants={
  //   initial: {
  //     y: -25,
  //     opacity: 0.75,
  //     scale: 0.98
  //   },
  //   animate: {
  //     y: 0,
  //     opacity: 1,
  //     scale: 1
  //   },
  //   exit: {
  //     y: -35,
  //     opacity: 0.75,
  //     scale: 0.98
  //   }
  // }
  // const transition={duration: 0.35, ease: "easeOut"}

  return (
    <Modal variant="showcase" setClose={() => setModal(false)}>
      <div className="gallery">
        <Button
          variant="ghost"
          size="lg"
          className="absolute top-6 right-6 rounded-full transition-none"
          isSquare
          iconOnly
          iconSize="lg"
          svg={<XMarkIcon />}
          onClick={() => setModal(false)}
        />
        <h3>Gallery</h3>
        <nav className="tabs flex">
          {TABS.map((tab) => (
            <motion.b
              className="tab"
              key={tab}
              onClick={() => setSelectedTab(tab)}
            >
              {tab}
              {selectedTab === tab && (
                <motion.u
                  className="tab-indicator absolute-x-center"
                  layoutId="selected"
                />
              )}
            </motion.b>
          ))}
        </nav>
        <div className="wrapper">
          <div>
            {selectedTab === "Images" ? (
              <div className="images container">
                {backdrops.slice(0, 24).map((img, idx) => (
                  <figure
                    className="thumbnail"
                    onClick={() => handleThumbnailClick(idx)}
                    key={img.file_path}
                  >
                    <img src={`${IMAGES_URL}w500${img.file_path}`} />
                  </figure>
                ))}
              </div>
            ) : (
              <div className="posters container">
                {posters.slice(0, 12).map((img, idx) => (
                  <figure
                    className="thumbnail"
                    onClick={() => handleThumbnailClick(idx)}
                    key={img.file_path}
                  >
                    <img src={`${IMAGES_URL}w500${img.file_path}`} />
                  </figure>
                ))}
              </div>
            )}
          </div>
        </div>
        <Presence trigger={isFullsize}>
          <ImageSlider
            images={selectedTab === "Images" ? backdrops : posters}
            currIndex={currIndex}
            setCurrIndex={setCurrIndex}
            setModal={setFullsize}
          />
        </Presence>
      </div>
    </Modal>
  )
}
