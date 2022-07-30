import React, { useContext, useEffect, useState } from 'react';
import { Alert, Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import reservationContext from '../../context/booking/reservationContext';
import userContext from '../../context/user/userContext';
import './booking.css';
const AddBookingDetails = () => {

  //get params from url
  const { id } = useParams();

  const context = useContext(reservationContext);
  const { reservation, setReservation } = context;
  const context1 = useContext(userContext);
    const { user, getUser } = context1;
  const [ show, setShow ] = useState(false);
  const [activities, setActivities] = useState([]);
  useEffect(() => {

    fetchActivities();
    setReservation({ ...reservation, hostingID: id ,user:user._id});
    


  }, []);
  const hostAddress = 'http://localhost:5000';
  const fetchActivities = async () => {
    const response = await fetch(`${hostAddress}/experience/activities/hostingid/${id}`, {
      method: "GET",
    });
    const data = await response.json();
    console.log(data);
    var activitiesCopy = data;
    for (let i = 0; i < activitiesCopy.length; i++) {
      activitiesCopy[i].buttonText = "Add";
    }
    setActivities(activitiesCopy);


  }
  const requestHost = async(e) => {
    e.preventDefault();
        
        const response = await fetch("http://localhost:5000/booking", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify(reservation)
        });
        const data = await response.json();
        setShow(data.success);
  }
  const onChange = (e) => {
    
    setReservation({ ...reservation, [e.target.name]: e.target.value })
    console.log(reservation);
  }
  const addActivity = (e) => {
    var c = reservation.cost;

    if (e.buttonText === "Add") {
      c = c + e.activityCost;
      reservation.selectedActivities.push(e._id);
      setReservation({ ...reservation, cost: c });
      setActivities(
        activities.map(item =>
          item._id === e._id
            ? { ...item, buttonText: "Remove" }
            : item
        ))

    }
    else {
      c = c - e.activityCost;
      for (let i = 0; i < reservation.selectedActivities.length; i++) {
        if (reservation.selectedActivities[i]._id === e._id)
          setReservation({ ...reservation, cost: c });
        reservation.selectedActivities.splice(i, 1);
      }
      setActivities(
        activities.map(item =>
          item._id === e._id
            ? { ...item, buttonText: "Add" }
            : item
        ))
    }
    console.log(reservation);


  }
  return (
    <div>
      <Alert show={show} variant="success">
       
        Request Sent!!!
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={() => setShow(false)} variant="outline-success">
            Close 
          </Button>
        </div>
      </Alert>

      
      <br /><br />
      <Container>
        <Row>

          <Col>
            <Row>
              <Card className='card-style-19 md-2'>
                <Card.Body>
                  <h3><center>Total Cost : &#36;{reservation.cost}</center></h3>
                </Card.Body>
              </Card>
            </Row>
            <Row className='row-style-1 md-2'>

              <Form className='form-style-11'>
                <div className="form-group">
                  <div className="mb-3">
                    <label htmlFor="checkin">Check In </label>
                    <input type="Date" className="form-control" id="date" name="bookingStartDate" placeholder={reservation.bookingStartDate} onChange={onChange} />
                  </div>
                </div>

                <div className="form-group">
                  <div className="mb-3">
                    <label htmlFor="noOfGuests">No Of Guests</label>
                    <input type="number" className="form-control" id="noOfGuests" name="noOfGuests" placeholder={reservation.noOfGuests} onChange={onChange} />
                  </div>
                </div>
              </Form>

            </Row>
            <Row>
            <button type="button" class="btn btn-outline-primary" onClick={requestHost}><strong>Request Host</strong></button>
            </Row>
          </Col>
          <Col>
            {activities.map((activity) => (

              <div className="card">
                <div className="card-header">
                </div>
                <div className="card-body">
                  <h5 className="card-title">{activity.activityTitle}</h5>
                  <p className="card-text">Start : {activity.dayTimeSlots.start}<br />End : {activity.dayTimeSlots.end}<br /><strong>Cost : {activity.activityCost}</strong></p>
                  <button type="button" className="btn btn-info" onClick={(e) => {e.preventDefault();addActivity(activity)}}>{activity.buttonText}</button>

                </div>
              </div>
            ))}
          </Col>
        </Row>
      </Container>
    </div >
  )
}

export default AddBookingDetails
