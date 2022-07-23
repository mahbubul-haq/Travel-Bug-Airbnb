import React, { useContext } from 'react'
import { Col, Container, Form, Row } from 'react-bootstrap'
import reservationContext from '../../context/booking/reservationContext'
import './booking.css'
const AddBookingDetails = () => {
  const context = useContext(reservationContext);
    const { reservation, setReservation } = context;
  const onChange = (e) => {
    setReservation({ ...reservation, [e.target.name]: e.target.value })
    console.log(reservation);
}
  return (
    <div>
      <br /><br />
      <Container>
        <Row>

          <Col className='col-style-1 md-2'>
            <Form className='form-style-11'>
              <div className="form-group">
                <div className="mb-3">
                  <label htmlFor="checkin">Check In </label>
                  <input type="Date" className="form-control" id="date" name="bookingStartDate"  placeholder={reservation.bookingStartDate} onChange={onChange}  />
                </div>
              </div>

              <div className="form-group">
                <div className="mb-3">
                  <label htmlFor="noOfGuests">No Of Guests</label>
                  <input type="number" className="form-control" id="noOfGuests" name="noOfGuests" placeholder={reservation.noOfGuests} onChange={onChange} />
                </div>
              </div>
            </Form>

          </Col>
        </Row>
      </Container>
    </div >
  )
}

export default AddBookingDetails
