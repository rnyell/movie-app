import cls from "@lib/ui/cls"
import classes from "./section.module.css"

export default function Section({ children, sectionName }) {
  return (
    <section className={`${cls(classes, ["section", sectionName])}`}>
      {children}
    </section>
  )
}
