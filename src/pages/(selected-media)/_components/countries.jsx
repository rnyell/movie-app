import styles from "./helper.module.css"

export default function Countries({ countries }) {
  return (
    <div className={`${styles["helper"]} overflow-x-scroll align-center gap-1`}>
      {countries.map((c) => (
        <>
          <span className="w-max shrink-0" key={c.name}>
            {c.name === "United States of America" ? "US" : c.name}
            <i>, </i>
          </span>
        </>
      ))}
    </div>
  )
}
