import { forwardRef, memo } from "react"
import cn from "../cn"

const Cursor = memo(
  forwardRef(({ children, className, ...rest }, ref) => (
    <div
      className={cn(
        "size-5 absolute top-0 left-0 z-infinite flex-center pointer-events-none select-none",
        className,
      )}
      ref={ref}
      {...rest}
    >
      {children}
    </div>
  )),
)

export default Cursor
