import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { motion, animate, useAnimate, useMotionValue } from "framer-motion"
import { XMarkIcon } from "@heroicons/solid"
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/outline"
import { useWindowOffsets } from "@lib/hooks"
import { defaultVariantsLabel, modalTransition } from "@lib/motion/motions"
import { IMAGES_URL } from "@services"


export default function ImageSlider({ images, currIndex, setCurrIndex, setModal }) {
  const {windowWidth} = useWindowOffsets()
  const imagesCount = images.length
  // const [thumbsRef, animate] = useAnimate()
  const thumbsRef = useRef(null)
  // const [thumbsWidth, setThumbsWidth] = useState({ scrollWidth: 0, offsetWidth: 0 })
  const imgRef = useRef(null)
  const [imgWidth, setImgWidth] = useState(0)
  const [constraints, setConstraints] = useState(0)
  const gapWidth = 4  // the "4" value is 4px which is set by CSS
  // const totalGapsWidth = (images.length - 1) * gapWidth

  // const xTranslate = useMotionValue(0)

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPresses)

    return () => {
      document.removeEventListener("keydown", handleKeyPresses)
    }
  }, [])

  function handleKeyPresses(event) {
    event.stopPropagation()

    if (event.code === "Escape") {
      setModal(false)
    } else if (event.code === "ArrowLeft") {
      // showPrevImage(1) //? not working!!
      setCurrIndex(prev => {
        if (prev - 1 <= -1) {
          return 0
        } else return prev - 1
      })
    } else if (event.code === "ArrowRight") {
      setCurrIndex(prev => {
        if (prev + 1 >= imagesCount) {
          return imagesCount - 1
        } else return prev + 1
      })
    }
  }

  useEffect(() => {
    if (thumbsRef.current && imgRef.current) {
      setImgWidth(imgRef.current.offsetWidth)
      setConstraints(thumbsRef.current.scrollWidth - thumbsRef.current.offsetWidth)
      // setThumbsWidth({
      //   scrollWidth: thumbsRef.current.scrollWidth,
      //   offsetWidth: thumbsRef.current.offsetWidth
      // })
    }
  }, [windowWidth])

  // let thumbsWidth
  // let finalPosition
  // let animationControls
  // useEffect(() => {
  //   if (thumbsRef.current) {
      // thumbsWidth = thumbsRef.current.offsetWidth / 2
      // finalPosition = (thumbsWidth.offsetWidth / 2) - (currIndex * imgWidth) - (imgWidth / 2) - ((currIndex - 1) * gapWidth)
      // console.log(xTranslate.get(), finalPosition, imgWidth, thumbsWidth.offsetWidth)
    // }

    // animate(".draggable", {x: finalPosition})
    // animationControls = animate(xTranslate, finalPosition, {
    //   duration: 0.25
    // })

    // return animationControls.stop
  // }, [currIndex])
  

  function showNextImage(num) {
    setCurrIndex((currIndex + num) % images.length)
  }

  function showPrevImage(num) {
    if (currIndex - num === -1) {
      setCurrIndex(images.length - 1)
      return
    }

    setCurrIndex(currIndex - num)
  }

  function handleDragEnd(_, dragInfo) {
    let dragged = dragInfo.offset.x
    let threshold = 45
    let draggedImageCount = Math.floor(Math.abs(dragged) / threshold)
    
    if (dragged > threshold) {
      setCurrIndex(prev => {
        if (prev - draggedImageCount <= -1) {
          return 0
        } else return prev - draggedImageCount
      })
      return
    } else if (dragged < -threshold) {
      setCurrIndex(prev => {
        if (prev + draggedImageCount >= imagesCount) {
          return imagesCount - 1
        } else return prev + draggedImageCount
      })
      return
    }

    /* to set `.draggable` back to its origin if the drag-threshold is not met */
    // animate(".draggable", {x: finalPosition})
  }


  return createPortal(
    <motion.div
      className="modal slider-modal flex-col align-center"
      tabIndex={0}
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
      transition={modalTransition}
    >
      <button className="btn close-btn" type="button" onClick={() => setModal(false)}>
        <i className="icon"><XMarkIcon /></i>
      </button>
      <div className="selected-image-container">
        <button className="btn prev-btn absolute-align-center" type="button" onClick={() => showPrevImage(1)}>
          <i className="icon">
            <ChevronLeftIcon />
          </i>
        </button>
        <figure>
          <img className="selected-image" src={`${IMAGES_URL}original${images[currIndex].file_path}`} />
        </figure>
        <button className="btn next-btn absolute-align-center" type="button" onClick={() => showNextImage(1)}>
          <i className="icon">
            <ChevronRightIcon />
          </i>
        </button>
      </div>
      <div className="thumbs justify-center" ref={thumbsRef}>
        <motion.div
          className="draggable align-center"
          drag="x"
          dragMomentum={false}
          dragElastic={0.1}
          dragSnapToOrigin={true}
          dragConstraints={{ left: -constraints - 75, right: constraints + 75 }}
          onDragEnd={handleDragEnd}
          // style={{ x: xTranslate }}
          animate={{ translateX: `-${currIndex * (55 + gapWidth) + 3.5}px` }}
          transition={{ duration: 0.35, ease: "circOut" }}
          whileDrag={{cursor: "grabbing"}}
        >
          {images.map((img, idx) => (
            <motion.figure
              className="thumb flex-item"
              key={img.file_path}
              ref={imgRef}
              animate={currIndex === idx ? "active" : "inactive"}
              variants={{
                inactive: {
                  opacity: 0.3,
                  width: 55,
                  marginInline: 0
                },
                active: {
                  opacity: 1,
                  width: 70,
                  marginInline: "7px"
                }
              }}
            >
              <img src={`${IMAGES_URL}w500${img.file_path}`} draggable={false} />
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </motion.div>,
    document.getElementById("portal")
  )
}
