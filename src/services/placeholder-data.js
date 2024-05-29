const TOTAL_SEAT_COUNT = 48;
const seats = [];
const seatNumbers = [...Array(50).keys()].slice(1, -1);
const reservedSeatsCounts = 19;
let reservedSeatsNumbers = new Set();

// make a fake reserveed seats
function spitRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

for (let num of seatNumbers) {
  seats.push({ id: num, isReserved: false });
}

while (reservedSeatsNumbers.size < reservedSeatsCounts) {
  reservedSeatsNumbers.add(spitRandomNumber(1, TOTAL_SEAT_COUNT));
}

const updatedSeats = seats.map((seat) =>
  reservedSeatsNumbers.has(seat.id) ? { ...seat, isReserved: true } : seat
);

const availabeSeatsNumbers = updatedSeats
  .filter((seat) => (!seat.isReserved ? seat.id : null))
  .map((seat) => seat.id);

reservedSeatsNumbers = [...reservedSeatsNumbers];

function validSeatSeletion(id) {
  if (availabeSeatsNumbers.includes(id)) {
    return true;
  } else {
    return false;
  }
}

const FAKE_PRICES = [23, 48, 10, 14];
const MOVIES_COUNT = 20;
const PRICES = [];

for (let i = 0; i < MOVIES_COUNT; i++) {
  const rand = spitRandomNumber(0, 3)
  PRICES.push(FAKE_PRICES[rand])
}


export {
  seatNumbers,
  updatedSeats,
  reservedSeatsNumbers,
  availabeSeatsNumbers,
  validSeatSeletion,
  PRICES,
};
