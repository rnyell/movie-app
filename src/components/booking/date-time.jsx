import { useNavigate } from "react-router-dom"

import Day from "./day"
import "../styles/date-time.css"

export default function DateTime({ ticketsCount }) {
  const date = new Date();
  let month = date.getMonth();
  let dayOfWeek = date.getDay();
  let dayOfMonth = date.getDate();
  let daysArray = [];
  const weekObj = {
    0: "Mon",
    1: "Tue",
    2: "Wed",
    3: "Thu",
    4: "Fri",
    5: "Sat",
    6: "Sun",
  };
  const monthObj = {
    0: "January",
    1: "February",
    2: "March",
    3: "April",
    4: "May",
    5: "June",
    6: "July",
    7: "August",
    8: "September",
    9: "October",
    10: "November",
    11: "December",
  };

  for (let i = 0; i <= 6; i++) {
    daysArray.push(weekObj[(dayOfWeek + i) % 7]);
  }

  //! any issue any dates?
  // console.log(daysArray);

  function submitHandler(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    console.log(ticketsCount);
    console.log(Object.fromEntries(data));
  }

  return (
    <div className="datetime">
      <h2>Select Date</h2>
      <form onSubmit={submitHandler}>
        <div className="dates">
          <h4>{monthObj[month]}</h4>
          <div className="days">
            {daysArray.map((day, idx) => (
              <Day key={idx} dayOfWeek={day} dayOfMonth={dayOfMonth + idx} />
            ))}
          </div>
        </div>
        <div className="times">
          <label htmlFor="s-1">
            <span>11:30 AM</span>
            <input type="radio" name="time" id="s-1" value="11:30 AM" />
          </label>
          <label htmlFor="s-2">
            <span>17:00 PM</span>
            <input type="radio" name="time" id="s-2" value="17:30 PM" />
          </label>
          <label htmlFor="s-3">
            <span>21:30 PM</span>
            <input type="radio" name="time" id="s-3" value="21:30 PM" />
          </label>
          <label htmlFor="s-4">
            <span>23:45 PM</span>
            <input type="radio" name="time" id="s-4" value="23:45 PM" />
          </label>
          <label htmlFor="s-5">
            <span>02:00 AM</span>
            <input type="radio" name="time" id="s-5" value="02:00 AM" />
          </label>
        </div>

        <div className="cta">
          <div>
            <p className="price">43$</p>
            <p className="count">
              {ticketsCount < 2
                ? `${ticketsCount} Ticket`
                : `${ticketsCount} Tickets`}
            </p>
          </div>
          <button type="submit" className="buy-ticket-btn">
            Buy Ticket
          </button>
        </div>
      </form>
    </div>
  );
}
