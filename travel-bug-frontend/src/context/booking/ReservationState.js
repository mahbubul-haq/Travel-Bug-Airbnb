import React, { useState } from 'react';
import reservationContext from './reservationContext';
const ReservationState = (props) => {
    const reservationInitial = {
      hostingID: "",
      bookingStartDate: "",
      bookingEndDate: "",
      noOfGuests: 0,
      user: "",
      paymentInfo: "",
      selectedActivities: [],
      cost: 0,
    };
    const [reservation, setReservation] = useState(reservationInitial);
  return (
    <reservationContext.Provider value={{ reservation, setReservation }}>
    {props.children}
</reservationContext.Provider>
  )
}

export default ReservationState
