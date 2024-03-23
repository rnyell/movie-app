import { useEffect, useRef, useState } from "react"
import { motion, useMotionValue, animate } from "framer-motion"
import useMeasure from 'react-use-measure'

// import { Swiper, SwiperSlide } from 'swiper/react'
// import { Autoplay } from 'swiper/modules'
// import "swiper/css/autoplay"


export default function Carousel({ 
  images,
  currIndex,
  showNextMovie,
  showPrevMovie
}) {
  const [constraints, setConstraints] = useState(500)
  const [imgIndex, setImgIndex] = useState(0)
  const [imgWidth, setImgWidth] = useState(100)
  const [wrapWidth, setWrapWidth] = useState(1000)
  const [gap, setGap] = useState(20)
  const [translatedX, setTranslatedX] = useState(0)
  const wrapRef = useRef(null)
  const imgRef = useRef(null)

  const xTranslate = useMotionValue(0)
  
  function handleResize() {
    let offset = 85  // arbitrary number
    let postersCount = 20
    let gapsCount = postersCount - 1

    setWrapWidth(wrapRef.current.scrollWidth)
    setImgWidth(imgRef.current.offsetWidth)
    setGap((wrapRef.current.scrollWidth - imgWidth * postersCount) / gapsCount)
    setConstraints(wrapWidth - window.innerWidth + offset)
    // console.log(imgWidth, gap)
  }

  useEffect(() => {
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [imgWidth])

  useEffect(() => {
    setImgIndex(currIndex)
  }, [currIndex])

  useEffect(() => {
    // console.log(xTranslate.get())
  }, [translatedX])

  function handleDragEnd(dragInfo) {
    const imagesCount = images.length
    let dragged = dragInfo.offset.x
    let threshold = 100
    let draggedImageCount = Math.floor(Math.abs(dragged) / threshold)
    
    if (dragged > threshold) {
      showPrevMovie(draggedImageCount)
      setImgIndex(prev => {
        if (prev - draggedImageCount === -1) {
          return imagesCount
        } else return prev - draggedImageCount
      })
    } else if (dragged < -threshold) {
      showNextMovie(draggedImageCount)
      setImgIndex(prev => (prev + draggedImageCount) % imagesCount)
    }

    setTranslatedX(prev => prev + xTranslate.get())
    console.log(xTranslate.get(), dragged, draggedImageCount * imgWidth + gap)
  }

  function handleDrag(e) {
    console.log("ondrag", translatedX, xTranslate.get())
    if (translatedX <= -wrapWidth) {
      console.log('----------------------')
    }
  }


  return (
    <div className="carousel">
      <motion.div
        ref={wrapRef}
        drag="x"
        dragConstraints={{ left: -constraints, right: constraints }}
        dragSnapToOrigin={true}
        dragMomentum={false}
        dragElastic={0.2}
        onDragEnd={(_, dragInfo) => handleDragEnd(dragInfo)}
        onDrag={handleDrag}
        style={{ x: xTranslate }}
        animate={{
          translateX: `${-imgIndex * (imgWidth + gap)}px`
        }}
        transition={{ type: "tween" }}
        className="images-wrapper"
      >
        <div className="images-list">
          {images.map((url, idx) =>
            <motion.figure 
              key={Math.random()}
              data-view={`${idx === imgIndex ? "true" : null}`}
              // initial={false}
              // animate={idx === imgIndex && { scale: 1.15 }}
              // transition={{ duration: 2000 }}
            >
              <img 
                draggable={false}
                ref={imgRef}
                src={`https://image.tmdb.org/t/p/original${url}`}
                className="poster"
              />
            </motion.figure>
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
                src={`https://image.tmdb.org/t/p/original${url}`}
                className="poster"
              />
            </motion.figure>
          )}
        </div> */}
      </motion.div>
    </div>
  )
}