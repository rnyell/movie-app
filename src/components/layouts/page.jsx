import classes from "./page.module.css"

export default function Page({ children, pageName }) {
  return (
    <div className={`${classes.page} ${pageName}`}>
      {children}
    </div>
  )
}
