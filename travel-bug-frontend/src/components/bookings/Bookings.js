import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const fetchbooking= async () => {
    const response = await fetch("http://localhost:5000/booking/", {
      method: 'GET',
      headers: {
        'auth-token': localStorage.getItem('token')
      }
    });
    
    const data = await response.json();
    
    if (data.success) {
      console.log(data);
      setBookings(data.bookings);
    }
  }
  useEffect(() => {
    fetchbooking();
  } , []);



  return (
    <div>
      <Container>
        <br/><br/>
        <h4>Your Bookings</h4>
        <br/><br/>
        <ul class="list-group">
          {bookings.map((booking, index) => (
            <Link className = "list-group-item list-group-item-light" to={`/bookingview/${booking._id}`}>
              {booking.hostingID.hostingTitle}</Link>
          ))}
        </ul>

      </Container>
    </div>
  )
}

export default Bookings
