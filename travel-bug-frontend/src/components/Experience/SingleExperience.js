import React from 'react';
import { Card, Container } from 'react-bootstrap';
import greece from "../../images/greece.jpg";
import greece1 from "../../images/greece1.jpg";
import greece2 from "../../images/greece2.jpg";
import greece3 from "../../images/greece3.jpg";
import greece4 from "../../images/greece4.jpg";
import hostProfilePic from "../../images/person.jpg";
import './experience.css';
const SingleExperience = () => {
    return (
        <div>
            <Container>
                <br /> <br />
                <Container>
                    <h1><strong> Hosting Title</strong></h1>
                    <h5>Location</h5>
                </Container>
                <Container>
                    <div className='card-group'>
                        <div className='row'>

                            <div className='card-style-1 col'>
                                <Card.Img variant="top" src={greece1} />
                            </div>
                            <div className='col-md-4'>
                                <div className='row my-10'>
                                    <div className='card-style-2 col'>
                                        <Card.Img variant="top" src={greece2} />
                                    </div>
                                    <div className='card-style-2 col'>
                                        <Card.Img variant="top" src={greece3} />
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='card-style-2 col'>
                                        <Card.Img variant="top" src={greece4} />
                                    </div>
                                    <div className='card-style-2 col'>
                                        <Card.Img variant="top" src={greece} />
                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>
                    <Container>
                        <br />
                        <h4>Hosted By HostName </h4>
                        <small>max no of guests . min age of guests</small>
                    </Container>
                    <Container>
                        <br /><br />
                        <div class="card border-info mb-3 md-10" >
                            <div class="card-body text-dark">
                                <h5 class="card-title">Description</h5>
                                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            </div>
                        </div>
                    </Container>
                    <Container>
                        <div className='row '>


                            <div className='col-style-3 '>
                                <h4>Activities</h4>
                                <br />
                                <ul class="list-group ">
                                    <div className='list-group-item list-group-item-primary'>
                                        <div class="d-flex w-100 justify-content-between">
                                            <h7 className="mb-1"><strong>Activity Name</strong></h7>
                                            <small>#duration</small>
                                        </div>

                                        <h9 className="mb-1">Start Time - End Time</h9>

                                    </div>
                                    <div className='list-group-item list-group-item-primary'>
                                        <div class="d-flex w-100 justify-content-between">
                                            <h7 className="mb-1"><strong>Activity Name</strong></h7>
                                            <small>#duration</small>
                                        </div>

                                        <h9 className="mb-1">Start Time - End Time</h9>


                                    </div>
                                    <div className='list-group-item list-group-item-primary'>
                                        <div class="d-flex w-100 justify-content-between">
                                            <h7 className="mb-1"><strong>Activity Name</strong></h7>
                                            <small>#duration</small>
                                        </div>

                                        <h9 className="mb-1">Start Time - End Time</h9>


                                    </div>
                                </ul>
                            </div>
                            <div className='col form-style-9'>

                                <div class="form-group">
                                    <div className="mb-3">
                                        <label for="checkin">Check In </label>
                                        <input type="date" class="form-control" id="checkin" aria-describedby="emailHelp" placeholder="Enter checkin Date" />
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div className="mb-3">
                                        <label for="checkout">CheckOut</label>
                                        <input type="date" class="form-control" id="checkout" placeholder="Enter checkin Date" />
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div className="mb-3">
                                        <label for="noOfGuests">No Of Guests</label>
                                        <input type="number" class="form-control" id="noOfGuests" placeholder="Enter No Of Guests" />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <button type="submit" class="btn btn-primary btn-lg">Reserve</button>
                                </div>
                            </div>
                        </div>


                    </Container>
                    <Container>
                        <div class="card-style-6 mb-3" >
                            <div class="row no-gutters">
                                <div class="col-md-4">
                                    <img src={hostProfilePic} class="card-img" alt="..." />
                                </div>
                                <div class="col-md-8">
                                    <div class="card-body">
                                        <h5 class="card-title">Hosted By  #hostname</h5>
                                        <p class="card-text">Host description.</p>

                                        <p class="card-text"><small class="text-muted">Hosrting date</small></p>
                                        <button type="button" class="btn btn-outline-primary">Contact Host</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Container>
                    <Container>
                        <br /><br />
                        <div className='row md-6'>
                            <h2>Things to Know</h2>
                            <div className='col'>
                                <Container>

                                    <ul class="list-group">
                                        <li class="list-group-item"><h4>House Rules</h4></li>
                                        <li class="list-group-item"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-alarm-fill" viewBox="0 0 16 16">
                                            <path d="M6 .5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1H9v1.07a7.001 7.001 0 0 1 3.274 12.474l.601.602a.5.5 0 0 1-.707.708l-.746-.746A6.97 6.97 0 0 1 8 16a6.97 6.97 0 0 1-3.422-.892l-.746.746a.5.5 0 0 1-.707-.708l.602-.602A7.001 7.001 0 0 1 7 2.07V1h-.5A.5.5 0 0 1 6 .5zm2.5 5a.5.5 0 0 0-1 0v3.362l-1.429 2.38a.5.5 0 1 0 .858.515l1.5-2.5A.5.5 0 0 0 8.5 9V5.5zM.86 5.387A2.5 2.5 0 1 1 4.387 1.86 8.035 8.035 0 0 0 .86 5.387zM11.613 1.86a2.5 2.5 0 1 1 3.527 3.527 8.035 8.035 0 0 0-3.527-3.527z" />
                                        </svg> Check-in: After 2:00 PM</li>
                                        <li class="list-group-item"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-alarm-fill" viewBox="0 0 16 16">
                                            <path d="M6 .5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1H9v1.07a7.001 7.001 0 0 1 3.274 12.474l.601.602a.5.5 0 0 1-.707.708l-.746-.746A6.97 6.97 0 0 1 8 16a6.97 6.97 0 0 1-3.422-.892l-.746.746a.5.5 0 0 1-.707-.708l.602-.602A7.001 7.001 0 0 1 7 2.07V1h-.5A.5.5 0 0 1 6 .5zm2.5 5a.5.5 0 0 0-1 0v3.362l-1.429 2.38a.5.5 0 1 0 .858.515l1.5-2.5A.5.5 0 0 0 8.5 9V5.5zM.86 5.387A2.5 2.5 0 1 1 4.387 1.86 8.035 8.035 0 0 0 .86 5.387zM11.613 1.86a2.5 2.5 0 1 1 3.527 3.527 8.035 8.035 0 0 0-3.527-3.527z" />
                                        </svg> Checkout: 12:00 PM</li>
                                        <li class="list-group-item"> &#10010;; Additional Requirements</li>
                                        <li class="list-group-item"> &#10010; Additional Requirements</li>
                                    </ul>
                                </Container>
                            </div>

                            <div className='col'>
                                <Container>
                                    <ul class="list-group">
                                        <li class="list-group-item"><h4>Cancellation Policy</h4></li>
                                        <li class="list-group-item"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bookmarks-fill" viewBox="0 0 16 16">
                                            <path d="M2 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v11.5a.5.5 0 0 1-.777.416L7 13.101l-4.223 2.815A.5.5 0 0 1 2 15.5V4z" />
                                            <path d="M4.268 1A2 2 0 0 1 6 0h6a2 2 0 0 1 2 2v11.5a.5.5 0 0 1-.777.416L13 13.768V2a1 1 0 0 0-1-1H4.268z" />
                                        </svg> Cancel before check-in on Jul 17 for a partial refund.</li>
                                    </ul>

                                </Container>
                            </div>
                        </div>
                    </Container>
                </Container>
            </Container>
            <br /><br />
        </div>
    )
}

export default SingleExperience
