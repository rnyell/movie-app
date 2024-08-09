import { useEffect, useRef, useState } from "react"
import { motion, useMotionValue } from "framer-motion"
import { IMAGES_URL } from "@services"

import classes from "./carousel.module.css"


export default function Carousel({ 
  images,
  currIndex,
  setCurrIndex,
  showNextMovie,
  showPrevMovie
}) {
  const [constraints, setConstraints] = useState(500)
  const carouselOffsetTop = 200  // an adjustment, used in `animate()` to center active image (it's kinda a "magic" number)
  const [imgIndex, setImgIndex] = useState(0)
  const [imgHeight, setImgHeight] = useState(100)
  const [wrapHeight, setWrapHeight] = useState(1000)
  const [gap, setGap] = useState(20)
  // const [translatedY, setTranslatedY] = useState(0)
  const draggableRef = useRef(null)
  const imgRef = useRef(null)

  const yTranslate = useMotionValue(0)
  
  useEffect(() => {
    handleResize()
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [imgHeight])

  useEffect(() => {
    setImgIndex(currIndex)
  }, [currIndex])
  
  function handleResize() {
    let offset = 85
    let postersCount = 20
    let gapsCount = postersCount - 1

    setWrapHeight(draggableRef.current.scrollHeight)
    setImgHeight(imgRef.current.offsetHeight)
    setGap((draggableRef.current.scrollHeight - imgHeight * postersCount) / gapsCount)
    setConstraints(wrapHeight - window.innerWidth + offset)
  }

  function handleDragEnd(_, dragInfo) {
    const imagesCount = images.length
    let dragged = dragInfo.offset.y
    let threshold = 100
    let draggedImageCount = Math.floor(Math.abs(dragged) / threshold)
    
    if (dragged > threshold) {
      showPrevMovie(draggedImageCount)
      setImgIndex(prev => {
        if (prev - draggedImageCount === -1) {
          return 0
        } else return prev - draggedImageCount
      })
    } else if (dragged < -threshold) {
      showNextMovie(draggedImageCount)
      setImgIndex(prev => (prev + draggedImageCount) % imagesCount)
    }

    // setTranslatedY(prev => prev + yTranslate.get())
  }

  // function handleDrag(e) {
  //   // console.log("ondrag", translatedY, yTranslate.get())
  //   // if (translatedY <= -wrapHeight) {
  //   //   console.log('----------------------')
  //   // }
  // }

  function handleCarouselItemClick(idx) {
    setImgIndex(idx)
    setCurrIndex(idx)
  }


  return (
    <div className={classes.carousel}>
      <motion.div
        className={classes.draggable}
        ref={draggableRef}
        drag="y"
        dragConstraints={{ top: -constraints, bottom: constraints }}
        dragSnapToOrigin={true}
        dragMomentum={false}
        dragElastic={0.2}
        onDragEnd={handleDragEnd}
        // onDrag={handleDrag}
        style={{ y: yTranslate }}
        animate={{ translateY: `${-imgIndex * (imgHeight + gap) + carouselOffsetTop}px` }}
        transition={{ type: "tween" }}
      >
        <div className={classes.slides}>
          {images.map((url, idx) =>
            <figure
              className={classes.slide}
              data-view={`${idx === imgIndex ? "true" : null}`}
              key={Math.random()}
              onClick={() => handleCarouselItemClick(idx)}
            >
              <img 
                className={classes.poster}
                src={`${IMAGES_URL}original${url}`}
                draggable={false}
                ref={imgRef}
              />
            </figure>
          )}
        </div>
        {/* <div className="images-list-cloned">
          {images.map((url, idx) =>
            <motion.figure 
              key={Math.random()}
              data-view={`${idx === imgIndex ? "true" : null}`}
            >
              <img 
                draggable={false}
                ref={imgRef}
                src={`${IMAGES_URL}original${url}`}
                className="poster"
              />
            </motion.figure>
          )}
        </div> */}
      </motion.div>
      {/* <div className={classes.carousel}></div> */}
    </div>
  )
}
