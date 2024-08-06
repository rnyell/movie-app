import cls from "../cls"
import classes from "./icon.module.css"


export default function Icon({
  svg,
  size = "md",
  fill,
  customStyles = "",
  ...props
}) {

  return (
    <i
      className={cls(classes, ["icon", size, fill], customStyles)}
      {...props}
    >
      {svg}
    </i>
  )
}
