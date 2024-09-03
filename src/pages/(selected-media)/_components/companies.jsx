import styles from "./helper.module.css"

export default function Companies({ companies }) {
  return (
    <div className={`${styles["helper"]} overflow-x-scroll align-center gap-1`}>
      {companies.map((company) => (
        <>
          <span className="w-max shrink-0" key={company.name}>
            {company.name}
            <i>, </i>
          </span>
        </>
      ))}
    </div>
  )
}
