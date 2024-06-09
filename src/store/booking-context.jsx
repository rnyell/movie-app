import { createContext, useContext, useReducer } from "react"

const BookingCntext = createContext(null)

export function useBookingData() {
  return useContext(BookingCntext)
}


const initialTicketData = {
  id: 0,
  title: "",
  poster: "/",
  price: 0,
  seats: [],
  count: 0,
  totalPrice: 0,
  date: "",
  time: ""
}

function ticketReducer(state, action) {
  switch (action.type) {
    case "select_movie": {
      return {
        ...state,
        id: action.id,
        title: action.title,
        poster: action.poster,
        price: action.price,
      }
    }
    case "select_seat": {
      let seats = state.seats
      if (state.seats.includes(action.seatNumber)) {
        seats = seats.filter(num => num !== action.seatNumber)
      } else {
        seats.push(action.seatNumber)
      }

      let seatsCount = seats.length

      return {
        ...state,
        seats: seats,
        count: seatsCount,
        totalPrice: seatsCount * state.price,
      }
    }
    case "select_datetime": {
      return {
        ...state,
        date: action.date,
        time: action.time,
      }
    }
  }
}


export default function BookingProvider({ children }) {
  const [ticketData, ticketDispatch] = useReducer(ticketReducer, initialTicketData)
  console.log(ticketData)

  return (
    <BookingCntext.Provider value={{ticketData, ticketDispatch}}>
      {children}
    </BookingCntext.Provider>
  )
}
