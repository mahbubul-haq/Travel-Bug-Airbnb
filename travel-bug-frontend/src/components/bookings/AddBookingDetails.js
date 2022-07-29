import React, { useContext, useEffect, useState } from 'react'
import { Card, Col, Container, Form, Row } from 'react-bootstrap'
import reservationContext from '../../context/booking/reservationContext'
import './booking.css'
const AddBookingDetails = () => {
  const context = useContext(reservationContext);
  const { reservation, setReservation } = context;
  const [activities, setActivities] = useState([]);
  useEffect(() => {

    fetchActivities();

  }, []);
  const hostAddress = 'http://localhost:5000';
  const fetchActivities = async () => {
    const response = await fetch(`${hostAddress}/experience/activity/${reservation.hostingID}`, {
      method: "GET",
    });
    const data = await response.json();
    console.log(data);
    var activitiesCopy=data;
    for (let i = 0; i < activitiesCopy.length ; i++) {
      activitiesCopy[i].buttonText="Add";
    }
    setActivities(activitiesCopy);


  }
  const onChange = (e) => {
    setReservation({ ...reservation, [e.target.name]: e.target.value })
    console.log(reservation);
  }
  const addActivity = (e) => {
    var c=reservation.cost;
    
    if(e.buttonText==="Add")
    {
      c=c+e.activityCost;
      reservation.selectedActivities.push(e);
      setReservation({...reservation,cost:c});
      setActivities(
        activities.map(item => 
            item._id === e._id 
            ? {...item, buttonText : "Remove"} 
            : item 
    ))

    }
    else{
      c=c-e.activityCost;
      for(let i=0;i<reservation.selectedActivities.length;i++)
      {
        if(reservation.selectedActivities[i]._id===e._id)
        setReservation({...reservation,cost:c});
        reservation.selectedActivities.splice(i,1);
      }
      setActivities(
        activities.map(item => 
            item._id === e._id 
            ? {...item, buttonText : "Add"} 
            : item 
    )) 
    }
    console.log(reservation);
    
    
  }
  return (
    <div>
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
          </Col>
          <Col>
            {activities.map((activity) => (

              <div className="card">
                <div className="card-header">
                </div>
                <div className="card-body">
                  <h5 className="card-title">{activity.activityTitle}</h5>
                  <p className="card-text">Start : {activity.dayTimeSlots.start}<br/>End : {activity.dayTimeSlots.end}<br/><strong>Cost : {activity.activityCost}</strong></p>
                  <button type="button" className="btn btn-info" onClick={()=>addActivity(activity)}>{activity.buttonText}</button>

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
