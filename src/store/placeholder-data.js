const TOTAL_SEAT_COUNT = 48;
const seats = [];
const seatNumbers = [...Array(50).keys()].slice(1, -1);
const reservedSeatsCounts = 19;
let reservedSeatsNumbers = new Set();

// make a fake reserveed seats
function makeRandomReservation(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

for (let num of seatNumbers) {
  seats.push({ id: num, isReserved: false });
}

while (reservedSeatsNumbers.size < reservedSeatsCounts) {
  reservedSeatsNumbers.add(makeRandomReservation(1, TOTAL_SEAT_COUNT));
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

export {
  seatNumbers,
  updatedSeats,
  reservedSeatsNumbers,
  availabeSeatsNumbers,
  validSeatSeletion,
};
