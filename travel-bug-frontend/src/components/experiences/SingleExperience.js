import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import reservationContext from '../../context/booking/reservationContext';
import userContext from '../../context/user/userContext';
import './experience.css';

const SingleExperience = () => {
  let navigate = useNavigate();
  const [experience, setExperience] = useState({
    'hostingPhotos': ['', '', '', '', '', ''],
  });

  const [host, setHost] = useState({});
  const context = useContext(reservationContext);
  const { reservation, setReservation } = context;
  const context1 = useContext(userContext);
  const { user, getUser } = context1;
  const [activities, setActivities] = useState([]);
  //const { cardIter, setCardIter } = useState(0);
  //get current id of url    
  const { id } = useParams();

  //console.log(reservation);


  // fetch the experience data from the server
  useEffect(() => {
    if (id) {
      fetchData();
      // fetchActivities();
      var reservationCopy = {
        hostingID: "",
        bookingStartDate: "",
        bookingEndDate: "",
        noOfGuests: 1,
        user: "",
        paymentInfo: "",
        selectedActivities: [],

      };
      reservationCopy.hostingID = id;
      reservationCopy.user = user._id;

      setReservation(reservationCopy);
      //console.log(reservation);



    }
  }, []);
  const onChange = (e) => {
    setReservation({ ...reservation, [e.target.name]: e.target.value })
    console.log(reservation);
  }
  const handleViewMoreDetails = (e) => {
    e.preventDefault();
    navigate('/bookingdetails/' + id);
  }
  const hostAddress = 'http://localhost:5000';
  const fetchData = async () => {
    const response = await fetch(`${hostAddress}/experience/hostingid/${id}`, {
      method: "GET",


    });
    const data = await response.json();
    console.log(data);
    setExperience((prev) => {
      return { ...prev, ...data };
    });
    console.log("single +", experience);
    console.log(experience)
    setHost(data.host);
    setActivities(data.activities);
    setReservation({ ...reservation, cost: data.totalCost });
    //setReservation({...reservation,host: data.host._id});
    console.log("my something");
    console.log(activities);


  }
  /*const fetchActivities = async () => {
      const response = await fetch(`${hostAddress}/host/experience/activity/${id}`, {
          method: "GET",
      });
      const data = await response.json();
      console.log(data);
      setActivities(data);


  }*/

  const handleContactHost = (e) => {
    e.preventDefault();
    navigate('/messages/');
  }


  return (
    <div>
      <Container>
        <br /> <br />
        <Container>
          <h1>
            <strong> {experience.hostingTitle}</strong>
          </h1>
          <h5>Location</h5>
        </Container>
        <Container>
          <div className="card-group">
            <div className="row">
              <div className="card-style-1 col">
                <Card.Img
                  variant="top"
                  src={experience && experience.hostingPhotos[0]}
                />
              </div>
              <div className="col-md-4">
                <div className="row my-10">
                  <div className="card-style-2 col">
                    <Card.Img
                      variant="top"
                      src={experience && experience.hostingPhotos[1]}
                    />
                  </div>
                  <div className="card-style-2 col">
                    <Card.Img
                      variant="top"
                      src={experience && experience.hostingPhotos[2]}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="card-style-2 col">
                    <Card.Img
                      variant="top"
                      src={experience && experience.hostingPhotos[3]}
                    />
                  </div>
                  <div className="card-style-2 col">
                    <Card.Img
                      variant="top"
                      src={experience && experience.hostingPhotos[4]}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Container>
            <br />
            <h4>Hosted By {host.firstName + " " + host.lastName}</h4>
            <small>
              {" "}
              Maximum {experience.maxGroupSize} Guests{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-suit-diamond-fill"
                viewBox="0 0 16 16"
              >
                <path d="M2.45 7.4 7.2 1.067a1 1 0 0 1 1.6 0L13.55 7.4a1 1 0 0 1 0 1.2L8.8 14.933a1 1 0 0 1-1.6 0L2.45 8.6a1 1 0 0 1 0-1.2z" />
              </svg>{" "}
              Minimum Age {experience.minAge} Years Old
            </small>
          </Container>
          <Container>
            <br />
            <br />
            <div className="card border-info mb-3 md-10">
              <div className="card-body text-dark">
                <h5 className="card-title">Description</h5>
                <p className="card-text">{experience.description}</p>
              </div>
            </div>
          </Container>
          <Container>
            <div className="row ">
              <div className="col-style-3 ">
                <h4>Activities</h4>
                <br />
                <Row>
                  {activities.map((activity) => (
                    <Col className="md-0.01 ">
                      <Card className="card-style-13 md-2">
                        <center>
                          <Card.Body>
                            <h3>{activity.activityTitle}</h3>
                            <h6>Start : {activity.dayTimeSlots.start}</h6>
                            <h6>End : {activity.dayTimeSlots.end}</h6>
                            <h6>Cost : {activity.activityCost}</h6>
                          </Card.Body>
                        </center>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </div>
              <div className="col form-style-17">
                <h2>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-currency-dollar"
                    viewBox="0 0 16 16"
                  >
                    <path d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718H4zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73l.348.086z" />
                  </svg>{" "}
                  {experience.totalCost}
                </h2>

                <div className="form-group">
                  <div className="mb-3">
                    <label htmlFor="checkin">Check In </label>
                    <input
                      type="date"
                      className="form-control"
                      id="bookingStartDate"
                      name="bookingStartDate"
                      aria-describedby="emailHelp"
                      onChange={onChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <div className="mb-3">
                    <label htmlFor="noOfGuests">No Of Guests</label>
                    <input
                      type="number"
                      className="form-control"
                      id="noOfGuests"
                      name="noOfGuests"
                      placeholder="Enter No Of Guests"
                      onChange={onChange}
                      min="1"
                      value={reservation.noOfGuests}


                    />
                  </div>
                </div>
                <div className="mb-3">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg"
                    onClick={handleViewMoreDetails}
                  >
                    View More Details
                  </button>
                </div>
              </div>
            </div>
          </Container>
          <Container>
            <div className="card-style-6 mb-3">
              <div className="row no-gutters">
                <div className="col-md-4">
                  <img src={host.profilePictureLink} className="card-img" alt="..." />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">
                      Hosted By {host.firstName + " " + host.lastName}{" "}
                    </h5>
                    <p className="card-text">Host Description: {host.userDetails}</p>

                    <p className="card-text">
                      <small className="text-muted">
                        Hosting Date : {moment(experience.hostingDate).format("MMMM Do YYYY")}
                      </small>
                    </p>
                    <button type="button" className="btn btn-outline-primary" onClick={handleContactHost}>
                      Contact Host
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Container>
          <Container>
            <br />
            <br />
            <div className="row md-6">
              <h2>Things to Know</h2>

              <div className="col">
                <Container>
                  <br />
                  <br />

                  <ul className="list-group">
                    <li className="list-group-item">
                      <h4>Additional Info</h4>
                    </li>
                    <li className="list-group-item">
                      <small> {" "} <svg width="20px" height="20px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M184 88C184 118.9 158.9 144 128 144C97.07 144 72 118.9 72 88C72 57.07 97.07 32 128 32C158.9 32 184 57.07 184 88zM208.4 196.3C178.7 222.7 160 261.2 160 304C160 338.3 171.1 369.8 192 394.5V416C192 433.7 177.7 448 160 448H96C78.33 448 64 433.7 64 416V389.2C26.16 371.2 0 332.7 0 288C0 226.1 50.14 176 112 176H144C167.1 176 190.2 183.5 208.4 196.3V196.3zM64 245.7C54.04 256.9 48 271.8 48 288C48 304.2 54.04 319.1 64 330.3V245.7zM448 416V394.5C468 369.8 480 338.3 480 304C480 261.2 461.3 222.7 431.6 196.3C449.8 183.5 472 176 496 176H528C589.9 176 640 226.1 640 288C640 332.7 613.8 371.2 576 389.2V416C576 433.7 561.7 448 544 448H480C462.3 448 448 433.7 448 416zM576 330.3C585.1 319.1 592 304.2 592 288C592 271.8 585.1 256.9 576 245.7V330.3zM568 88C568 118.9 542.9 144 512 144C481.1 144 456 118.9 456 88C456 57.07 481.1 32 512 32C542.9 32 568 57.07 568 88zM256 96C256 60.65 284.7 32 320 32C355.3 32 384 60.65 384 96C384 131.3 355.3 160 320 160C284.7 160 256 131.3 256 96zM448 304C448 348.7 421.8 387.2 384 405.2V448C384 465.7 369.7 480 352 480H288C270.3 480 256 465.7 256 448V405.2C218.2 387.2 192 348.7 192 304C192 242.1 242.1 192 304 192H336C397.9 192 448 242.1 448 304zM256 346.3V261.7C246 272.9 240 287.8 240 304C240 320.2 246 335.1 256 346.3zM384 261.7V346.3C393.1 335 400 320.2 400 304C400 287.8 393.1 272.9 384 261.7z" /></svg>
                      </small> Hosted by {experience.individualOrTeam}
                    </li>
                    <li className="list-group-item">
                      {" "}
                      <svg width="20px" height="20px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M288 0C305.7 0 320 14.33 320 32V96C320 113.7 305.7 128 288 128H208V160H424.1C456.6 160 483.5 183.1 488.2 214.4L510.9 364.1C511.6 368.8 512 373.6 512 378.4V448C512 483.3 483.3 512 448 512H64C28.65 512 0 483.3 0 448V378.4C0 373.6 .3622 368.8 1.083 364.1L23.76 214.4C28.5 183.1 55.39 160 87.03 160H143.1V128H63.1C46.33 128 31.1 113.7 31.1 96V32C31.1 14.33 46.33 0 63.1 0L288 0zM96 48C87.16 48 80 55.16 80 64C80 72.84 87.16 80 96 80H256C264.8 80 272 72.84 272 64C272 55.16 264.8 48 256 48H96zM80 448H432C440.8 448 448 440.8 448 432C448 423.2 440.8 416 432 416H80C71.16 416 64 423.2 64 432C64 440.8 71.16 448 80 448zM112 216C98.75 216 88 226.7 88 240C88 253.3 98.75 264 112 264C125.3 264 136 253.3 136 240C136 226.7 125.3 216 112 216zM208 264C221.3 264 232 253.3 232 240C232 226.7 221.3 216 208 216C194.7 216 184 226.7 184 240C184 253.3 194.7 264 208 264zM160 296C146.7 296 136 306.7 136 320C136 333.3 146.7 344 160 344C173.3 344 184 333.3 184 320C184 306.7 173.3 296 160 296zM304 264C317.3 264 328 253.3 328 240C328 226.7 317.3 216 304 216C290.7 216 280 226.7 280 240C280 253.3 290.7 264 304 264zM256 296C242.7 296 232 306.7 232 320C232 333.3 242.7 344 256 344C269.3 344 280 333.3 280 320C280 306.7 269.3 296 256 296zM400 264C413.3 264 424 253.3 424 240C424 226.7 413.3 216 400 216C386.7 216 376 226.7 376 240C376 253.3 386.7 264 400 264zM352 296C338.7 296 328 306.7 328 320C328 333.3 338.7 344 352 344C365.3 344 376 333.3 376 320C376 306.7 365.3 296 352 296z" /></svg>
                      {" "}
                      {experience.partialPayAllowed && "Partial Payment allowed"}
                      {experience.partialPayAllowed == false && "Partial Payment not allowed"}

                    </li>
                    {experience.itemsToBring && (
                      experience.itemsToBring.map((item) => (

                        <li className="list-group-item">
                          {" "}
                          &#10010; You have to bring {item}.
                        </li>
                      ))
                    )}{
                      experience.additionalRequirements && (
                        experience.additionalRequirements.map((item) => (

                          <li className="list-group-item">
                            {" "}<svg width="20px" height="19px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"> <path d="M464 96h-192l-64-64h-160C21.5 32 0 53.5 0 80v352C0 458.5 21.5 480 48 480h416c26.5 0 48-21.5 48-48v-288C512 117.5 490.5 96 464 96zM336 311.1h-56v56C279.1 381.3 269.3 392 256 392c-13.27 0-23.1-10.74-23.1-23.1V311.1H175.1C162.7 311.1 152 301.3 152 288c0-13.26 10.74-23.1 23.1-23.1h56V207.1C232 194.7 242.7 184 256 184s23.1 10.74 23.1 23.1V264h56C349.3 264 360 274.7 360 288S349.3 311.1 336 311.1z" /></svg>
                            {"  "}{item}
                          </li>
                        ))
                      )

                    }


                  </ul>
                </Container>
              </div>

              <div className="col">
                <Container>
                  <br />
                  <br />

                  <ul className="list-group">
                    <li className="list-group-item">
                      <h4>Cancellation Policy</h4>
                    </li>
                    <li className="list-group-item">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-bookmarks-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M2 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v11.5a.5.5 0 0 1-.777.416L7 13.101l-4.223 2.815A.5.5 0 0 1 2 15.5V4z" />
                        <path d="M4.268 1A2 2 0 0 1 6 0h6a2 2 0 0 1 2 2v11.5a.5.5 0 0 1-.777.416L13 13.768V2a1 1 0 0 0-1-1H4.268z" />
                      </svg>{" "}
                      Cancel before {experience.maxRefundDays} days for a partial refund.
                    </li>
                  </ul>
                </Container>
              </div>
            </div>
          </Container>
        </Container>
      </Container>
      <br />
      <br />
    </div>
  );
}

export default SingleExperience
