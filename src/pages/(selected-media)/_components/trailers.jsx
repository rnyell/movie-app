export default function Trailers({ videos }) {
  const urls = videos?.results.map(res => res)
  const officialTrailers = urls?.filter(res => 
    res.type === "Trailer" && res.official === true
  )

  return (
    <div className="trailers">
      <h4 className="heading">Videos</h4>
      <div className="container flex">
        {officialTrailers.map(t => (
          <iframe
            key={t.key}
            src={`https://www.youtube.com/embed/${t.key}?controls=0&modestbranding=1&rel=0&showInfo=0`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
          ></iframe>
        ))}
      </div>
    </div>
  )
}
