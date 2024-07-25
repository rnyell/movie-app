export default function Day({ dayOfWeek, dayOfMonth }) {
  const dateObject = {
    toString() {
      return `${dayOfWeek}, ${dayOfMonth}`;
    },
  };

  return (
    <label className="day align-center-col" htmlFor={dayOfWeek}>
      <p className="day-name">{dayOfWeek}</p>
      <p className="day-number">{dayOfMonth}</p>
      <input type="radio" name="date" id={dayOfWeek} value={`${dateObject}`} />
    </label>
  );
}
