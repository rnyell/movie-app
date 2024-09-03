import styles from "./helper.module.css"

export default function Languages({ languages }) {
  return (
    <div className={`${styles["helper"]} overflow-x-scroll align-center gap-1`}>
      {languages.map((lang) => (
        <>
          <span className="w-max shrink-0" key={lang.english_name}>
            {lang.english_name}
            <i>, </i>
          </span>
        </>
      ))}
    </div>
  )
}
