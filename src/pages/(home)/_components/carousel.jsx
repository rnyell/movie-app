import { useEffect, useRef, useState } from "react"
import { motion, useMotionValue } from "framer-motion"
import { IMAGES_URL } from "@services"
import { useWindowOffsets } from "@lib/hooks"


export default function Carousel({ 
  images,
  currIndex,
  setCurrIndex,
  showNextMovie,
  showPrevMovie
}) {
  const [constraints, setConstraints] = useState(500)
  const carouselOffsetTop = 200  // an adjustment, used in `animate` to center active image (kinda "magic" number).
  const [imgIndex, setImgIndex] = useState(0)
  const [imgHeight, setImgHeight] = useState(100)
  const [wrapHeight, setWrapHeight] = useState(1000)
  const [gap, setGap] = useState(20)
  const [translatedY, setTranslatedY] = useState(0)
  const wrapRef = useRef(null)
  const imgRef = useRef(null)

  const yTranslate = useMotionValue(0)
  
  const handleResize = () => {
    let offset = 85  // arbitrary number
    let postersCount = 20
    let gapsCount = postersCount - 1

    setWrapHeight(wrapRef.current.scrollHeight)
    setImgHeight(imgRef.current.offsetHeight)
    setGap((wrapRef.current.scrollHeight - imgHeight * postersCount) / gapsCount)
    setConstraints(wrapHeight - window.innerWidth + offset)
  }

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

  useEffect(() => {
    // console.log(yTranslate.get())
  }, [translatedY])

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

    setTranslatedY(prev => prev + yTranslate.get())
    // console.log(yTranslate.get(), dragged, draggedImageCount * imgHeight + gap)
  }

  function handleDrag(e) {
    // console.log("ondrag", translatedY, yTranslate.get())
    // if (translatedY <= -wrapHeight) {
    //   console.log('----------------------')
    // }
  }

  function handleCarouselItemClick(idx) {
    setImgIndex(idx)
    setCurrIndex(idx)
  }


  return (
    <div className="carousel-container">
      <div className="carousel">
        <motion.div
          className="images-wrapper"
          ref={wrapRef}
          drag="y"
          dragConstraints={{ top: -constraints, bottom: constraints }}
          dragSnapToOrigin={true}
          dragMomentum={false}
          dragElastic={0.2}
          onDragEnd={handleDragEnd}
          // onDrag={handleDrag}
          style={{ y: yTranslate }}
          animate={{
            translateY: `${-imgIndex * (imgHeight + gap) + carouselOffsetTop}px`
          }}
          transition={{ type: "tween" }}
        >
          <div className="images-list">
            {images.map((url, idx) =>
              <figure 
                key={Math.random()}
                onClick={() => handleCarouselItemClick(idx)}
                data-view={`${idx === imgIndex ? "true" : null}`}
              >
                <img 
                  draggable={false}
                  ref={imgRef}
                  src={`${IMAGES_URL}original${url}`}
                  className="poster"
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
      </div>
    </div>
  )
}
