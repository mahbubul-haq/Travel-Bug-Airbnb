
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';
import './request.css';

export default function Request() {
    // state booking
    const [booking, setBooking] = useState({});
    const [paid , setPaid] = useState(false);
    // get params from url
    const { bookingId } = useParams();
    const {notificationId} = useParams();
    const {type} = useParams();
    //use navigate to redirect to home page
    let navigate = useNavigate();
    //async call to get booking details
    const fetchBooking = async () => {
        const response = await fetch("http://localhost:5000/booking/" + bookingId, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                

            },
            body: JSON.stringify({notificationId:notificationId})
        });
        const data = await response.json();

        if (data.success) {
            console.log(data);
            setBooking(data.booking);
            setPaid(true);
        }
    }
    //useEffect to fetch booking details
    useEffect(() => {
        fetchBooking();

    }, []);
    const approveRequest = async () => {
        const response = await fetch("http://localhost:5000/booking/approved/" + bookingId, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({})
        });
        const data = await response.json();
        if (data.success) {
           alert("Request Approved");
            sendNotification("approved");
            navigate('/notifications');
        }
    }
    const declineRequest = async () => {
        const response = await fetch("http://localhost:5000/booking/rejected/" + bookingId, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({})
        });
        const data = await response.json();
        if (data.success) {
            alert("Request Declined");
            sendNotification("rejected");
            navigate('/notifications');
        }
    }
    const makePayment = async (token) => {
        const body = {
            token,
            booking
        }
        const headers = {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
        }
        const response =  await fetch("http://localhost:5000/payment/create", {
            method: "POST",
            headers,
            body: JSON.stringify(body)
        });
        const data = await response.json();
        //console.log(data);
    }
    const sendNotification = async (status) => {
        const response = await fetch("http://localhost:5000/booking/sendnotification/"+status+"/"+bookingId, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({})
        });
        const data = await response.json();
        if (data.success) {
            console.log(data);
        }
    }




    return (
        <div>
            <br /><br />
            <Container>
                <h5><center>Booking Request</center></h5>
                <div className="card-style-67">
                    <div className="card-body">
                        <div className="row my-10">
                            <div className="col-md-6">
                                <Row className='my-10'>
                                    <span className="border border-info">
                                        <Container>
                                            <h5>Booking Start Date : {moment(booking.bookingStartDate).format("MMMM Do YYYY")}</h5>
                                        </Container>
                                    </span>
                                </Row>
                                <Row className='md-10'>
                                    <span className="border border-info">
                                        <Container>
                                            <h5>Booking End Date : {moment(booking.bookingEndDate).format("MMMM Do YYYY")}</h5>
                                        </Container>
                                    </span>
                                </Row>

                                <Row className='my-10'>
                                    <span className="border border-info">
                                        <Container>
                                            <h5>No of Guests : {booking.noOfGuests}</h5>
                                        </Container>
                                    </span>
                                </Row>
                                <Row className='my-10'>
                                    <span className="border border-info">
                                        <Container>
                                            <h5>Total Cost : {booking.cost}</h5>
                                        </Container>
                                    </span>
                                </Row>
                            </div>
                            {//if boooking.selected activity is not null
                                booking.selectedActivities && (
                                    <div className="col-md-6">
                                        <div className="card-style-69">
                                            <center><h4><div className='card-title'>Selected Activities</div></h4>
                                                <div className='card-body'>
                                                    {booking.selectedActivities.map((activity) => (
                                                        <Row className='my-10'>

                                                            <Container>
                                                                {activity.activityTitle}
                                                            </Container>
                                                        </Row>
                                                    ))}
                                                </div>
                                            </center></div>

                                    </div>)}
                             
                        </div>
                    </div>
                    <center>
                        <div className="card-footer">
                            {booking.status === "waiting"&& paid==false && (

                            <div className="d-flex">

                                <button type="button" className="btn btn-success mx-2 " onClick={approveRequest}>Approve</button>


                                <button type="button" className="btn btn-danger mx-2" onClick={declineRequest}>Decline</button>

                            </div>)}{
                            booking.status === "approved" && paid==false && (
                                <li class="list-group-item list-group-item-success">This Request has been Approved</li>
                            )
                            }
                            {
                                booking.status === "rejected" && paid==false &&  (
                                    <li class="list-group-item list-group-item-danger">This Request has been Rejected</li>
                                )
                            }
                            {
                                paid &&  (
                                    <li class="list-group-item list-group-item-primary">This Request has been Paid</li>
                                )
                            }
                            {
                                booking.status === "confirmed" && paid==false &&  (
                                    <li class="list-group-item list-group-item-primary">This Request has been Paid</li>
                                )
                            }


                        </div>
                    </center>
                    {type=="reply" && booking.status=="approved" && paid==false&& (
                        <StripeCheckout stripeKey="pk_test_51LbLZjLOMUpyuAnrdPiTUuHC5zH8qH6O9VY8BfSO4TI9vKK6a1LjwGNnQNq3Z3jPTXwAIfTpK957wr4HBOe0KbsB00NJVCBzV6" token={makePayment} name="Make Payment"
                        shippingAddress amount={booking.totalPrice*100} 
                       >
                         <button className="btn btn-primary">Pay Now</button>
                       </StripeCheckout>
                        )}
                </div>
            </Container >
        </div >
    )

}
