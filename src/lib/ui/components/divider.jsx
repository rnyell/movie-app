import classes from "./divider.module.css"
import cls from "../cls"


const Divider = ({
  variant = "lite",
  width = "partial",
  space = "sm",
  thickness = "normal"
}) => (
  <hr className={`${cls(classes, ["divider", variant, width, space, thickness])}`} />
)


export default Divider
