import "./list.module.css"

export default function ListThumb({ p }) {
  return (
    <div>
      {p?.map(src => <img src={src} key={src} />
      )}
    </div>
  )
}
