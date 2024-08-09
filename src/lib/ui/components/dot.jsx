export default function Dot({ scale = "1.4", customStyles }) {
  const styles = {
    marginTop: -1,
    display: "inline-block",
    scale: scale,
    color: "var(--color-neutral-300)",
  }
  // TODO &bull;
  return <i className={`${customStyles}`} style={styles}>&#x2022;</i>
}
