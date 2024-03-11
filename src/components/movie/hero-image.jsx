
export default function HeroImage({ imgUrl, currIndex, index }) {
  // var isNext = currIndex === index ? true : false
  // var isActive = currIndex === index ? true : false
  // var isPrev = currIndex === index ? true : false

  return (
    <div className={`hero-image`}>
      <figure>
        <img src={`https://image.tmdb.org/t/p/w500${imgUrl}`}/>
      </figure>
    </div>
  )
}