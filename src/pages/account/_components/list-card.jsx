import classes from "./list.module.css"

export default function ListCard({ list }) {
  return (
    <div className={classes.listCard}>
      <div className="list-image">

      </div>
      <div className="list-details">
        <h5 className="list-name">{list.name}</h5>
        <p className="list-publicity">{list.is_private ? "Private" : "Public"}</p>
      </div>
    </div>
  )
}
