import React, { useEffect, useState } from "react";
import { Button, Card, Container, Navbar, NavItem } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";

const ManagementHome = () => {
  const [listType, SetlistType] = useState("");

  const [hostings, setHostings] = useState([]);
  const [drafts, setDrafts] = useState([]);
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();
  const [arivingSoon, setArivingSoon] = useState([]);
  const [upComing, setUpComing] = useState([]);
  const [currentlyHosting_, setCurrentlyHosting_] = useState([]);
  const [checkingOut_, setCheckingOut_] = useState([]);

  const getAllHostings = async () => {
    const res = await fetch("http://localhost:5000/host/experience/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const data = await res.json();
    console.log(data);
    setHostings(data.experienceHosting);
  };
  const getAllDrafts = async () => {
    const res = await fetch("http://localhost:5000/host/experience/drafts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const data = await res.json();
    console.log(data);
    if (data.experienceHosting.length > 0)
      setDrafts([data.experienceHosting[data.experienceHosting.length - 1]]);
  };

  const getAllBookings = async () => {
    const res = await fetch("http://localhost:5000/booking/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const data = await res.json();
    console.log("----------", data);

    setCurrentlyHosting_( () => {
      var temp_data = data.bookings.filter(
        (item) =>
          item.status === "approved" &&
          Date.parse(item.bookingStartDate) <= Date.now() &&
          Date.parse(item.bookingEndDate) >= Date.now()
      );

      console.log("temp data", temp_data);
        return temp_data;
    });

    setCheckingOut_(() => {
      var temp_data = data.bookings.filter(
        (item) =>
          item.status === "approved" &&
          Date.parse(item.bookingStartDate) <= Date.now()
          && Date.parse(item.bookingEndDate) >= Date.now()
          && (Date.parse(item.bookingEndDate) - Date.now()) /
            (1000 * 60 * 60 * 24) <=
            3
      );
      return temp_data;
    });

    setArivingSoon(() => {
      var temp_data = data.bookings.filter(
        (item) =>
          item.status === "approved" &&
          Date.parse(item.bookingStartDate) > Date.now()
          && (Date.parse(item.bookingStartDate) - Date.now()) /
            (1000 * 60 * 60 * 24) <=
            7
      );
      return temp_data;
    });
    setUpComing(() => {
      var temp_data = data.bookings.filter(
        (item) =>
          item.status === "approved" &&
          Date.parse(item.bookingStartDate) > Date.now()
          &&
          (Date.parse(item.bookingStartDate) - Date.now()) /
            (1000 * 60 * 60 * 24) >
            7
      );
      return temp_data;
    });

    setBookings(data.bookings);
  };

  useEffect(() => {
    getAllHostings();
    getAllDrafts();
  }, []);

  useEffect(() => {
    getAllBookings();
  }, []);

  const getPaymentInfo = async (id) => {
    const res = await fetch(`http://localhost:5000//payment/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const data = await res.json();
    console.log(data);
    return data;
  }



  useEffect(() => {
    console.log("upcoming", upComing);
    console.log("ariving", arivingSoon);
    console.log("currently Hosting", currentlyHosting_);
    console.log("checking out", checkingOut_);
  }, [upComing, arivingSoon, currentlyHosting_, checkingOut_]);

  const checkingOut = () => {
    SetlistType("checkingOut");
  };
  const currentlyHosting = () => {
    SetlistType("currentlyHosting");
  };
  const arrivingSoon = () => {
    SetlistType("arrivingSoon");
  };
  const upcoming = () => {
    SetlistType("upcoming");
  };

  const completeListing = () => {
    navigate("/newlisting", { state: { draft_experience: [drafts[0]] } });
  };

  const getUpcoming = () => {
    if (upComing.length > 0) {
      return (
            <div className="container my-10">
              <br />
              <br />
              <ul className="list-group">
                {upComing.map((item, index) => {
                  return (
                    <Link
                      key={index}
                      to={`/hostings/booking/${item._id}`}
                      state={{ item: item, listType: listType }}
                      className="list-group-item list-group-item-info"
                    >
                      <div className="d-flex w-100 justify-content-between">
                        <h4 className="mb-1">
                          {item.user.firstName} {item.user.lastName}
                        </h4>
                        <small>{item.noOfGuests} Guests</small>
                      </div>
                      <p className="mb-1">
                        Hosting Title: {item.hostingID.hostingTitle}
                      </p>
                      {"paymentID" in item && (
                        <small>Paid</small>
                      )}
                      {!("paymentID" in item) && (
                        <small>Not Paid</small>
                        )}
                    </Link>
                  );
                })}
              </ul>
            </div>
          )
    }
    else {
      return (
        <div><br/><br/><h4><center><svg height="20px" width="20px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM99.5 144.8C77.15 176.1 64 214.5 64 256C64 362 149.1 448 256 448C297.5 448 335.9 434.9 367.2 412.5L99.5 144.8zM448 256C448 149.1 362 64 256 64C214.5 64 176.1 77.15 144.8 99.5L412.5 367.2C434.9 335.9 448 297.5 448 256V256z"/>
        </svg>no item in Upcoming</center></h4></div>
      )
    }
  };

  const getArivingSoon = () => {
    if (arivingSoon.length > 0) {
      return (
            <div className="container my-10">
              <br />
              <br />
              <ul className="list-group">
                {arivingSoon.map((item, index) => {
                  return (
                    <Link
                      key={index}
                      to={`/hostings/booking/${item._id}`}
                      state={{ item: item, listType: listType }}
                      className="list-group-item list-group-item-info"
                    >
                      <div className="d-flex w-100 justify-content-between">
                        <h4 className="mb-1">
                          {item.user.firstName} {item.user.lastName}
                        </h4>
                        <small>{item.noOfGuests} Guests</small>
                      </div>
                      <p className="mb-1">
                        Hosting Title: {item.hostingID.hostingTitle}
                      </p>
                      {"paymentID" in item && <small>Paid</small>}
                      {!("paymentID" in item) && <small>Not Paid</small>}
                    </Link>
                  );
                })}
              </ul>
            </div>
          )
    } else {
      return (
        <div><br/><br/><h4><center><svg height="20px" width="20px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM99.5 144.8C77.15 176.1 64 214.5 64 256C64 362 149.1 448 256 448C297.5 448 335.9 434.9 367.2 412.5L99.5 144.8zM448 256C448 149.1 362 64 256 64C214.5 64 176.1 77.15 144.8 99.5L412.5 367.2C434.9 335.9 448 297.5 448 256V256z"/>
        </svg>no item in Arriving Soon</center></h4></div>
      )
    }
  }

  const getCheckingOut = () => {
    if (checkingOut_.length > 0) {
      return (
            <div className="container my-10">
              <br />
              <br />
              <ul className="list-group">
                {checkingOut_.map((item, index) => {
                  return (
                    <Link
                      key={index}
                      to={`/hostings/booking/${item._id}`}
                      state={{ item: item, listType: listType }}
                      className="list-group-item list-group-item-info"
                    >
                      <div className="d-flex w-100 justify-content-between">
                        <h4 className="mb-1">
                          {item.user.firstName} {item.user.lastName}
                        </h4>
                        <small>{item.noOfGuests} Guests</small>
                      </div>
                      <p className="mb-1">
                        Hosting Title: {item.hostingID.hostingTitle}
                      </p>
                      {"paymentID" in item && <small>Paid</small>}
                      {!("paymentID" in item) && <small>Not Paid</small>}
                    </Link>
                  );
                })}
              </ul>
            </div>
          )
    } else {
      return (
        <div><br/><br/><h4><center><svg height="20px" width="20px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM99.5 144.8C77.15 176.1 64 214.5 64 256C64 362 149.1 448 256 448C297.5 448 335.9 434.9 367.2 412.5L99.5 144.8zM448 256C448 149.1 362 64 256 64C214.5 64 176.1 77.15 144.8 99.5L412.5 367.2C434.9 335.9 448 297.5 448 256V256z"/>
        </svg>no item in Checking Out</center></h4></div>
      )
    }
  }

  const getCurrentlyHosting = () => {
    if (currentlyHosting_.length > 0) {
      return (
            <div className="container my-10">
              <br />
              <br />
              <ul className="list-group">
                {currentlyHosting_.map((item, index) => {
                  return (
                    <Link
                      key={index}
                      to={`/hostings/booking/${item._id}`}
                      state={{ item: item, listType: listType }}
                      className="list-group-item list-group-item-info"
                    >
                      <div className="d-flex w-100 justify-content-between">
                        <h4 className="mb-1">
                          {item.user.firstName} {item.user.lastName}
                        </h4>
                        <small>{item.noOfGuests} Guests</small>
                      </div>
                      <p className="mb-1">
                        Hosting Title: {item.hostingID.hostingTitle}
                      </p>
                      {"paymentID" in item && <small>Paid</small>}
                      {!("paymentID" in item) && <small>Not Paid</small>}
                    </Link>
                  );
                })}
              </ul>
            </div>
          )
    } else {
      return (
        <div><br/><br/><h4><center><svg height="20px" width="20px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM99.5 144.8C77.15 176.1 64 214.5 64 256C64 362 149.1 448 256 448C297.5 448 335.9 434.9 367.2 412.5L99.5 144.8zM448 256C448 149.1 362 64 256 64C214.5 64 176.1 77.15 144.8 99.5L412.5 367.2C434.9 335.9 448 297.5 448 256V256z"/>
        </svg>no item in currently hosting</center></h4></div>
      )
    }
  }



  return (
    <>
      <div id="management-home">
        <Card className="card-style-9">
          <Card.Title className="text-light my-10">
            
          </Card.Title>
          {drafts.length == 0 && (
            <Card.Body>
              <div className="container">
                <div id="no-draft">
                  <h4 style={{ color: "black", textAlign: "center" }}>
                    Booking Management Dashboard
                  </h4>
                </div>
              </div>
            </Card.Body>
          )}
          {drafts.length > 0 && (
            <Card.Body>
              <div className="container">
                <button
                  type="button"
                  className="btn btn-outline-primary btn-lg"
                  onClick={() => {
                    completeListing();
                  }}
                >
                  Complete Your Listing
                </button>
              </div>
            </Card.Body>
          )}
        </Card>
        <Navbar bg="dark" variant="dark">
          <Container fluid>
            <ul className="navbar-nav me-auto mb-10 mb-1 text-light">
              <div className="btn-toolbar">
                <NavItem>
                  <Button
                    className="mx-3"
                    variant="outline-light"
                    onClick={checkingOut}
                  >
                    Checking Out
                  </Button>
                </NavItem>
                <NavItem>
                  <Button
                    className="mx-3"
                    variant="outline-light"
                    onClick={currentlyHosting}
                  >
                    Currently Hosting
                  </Button>
                </NavItem>
                <NavItem>
                  <Button
                    className="mx-3"
                    variant="outline-light"
                    onClick={arrivingSoon}
                  >
                    Arriving Soon
                  </Button>
                </NavItem>
                <NavItem>
                  <Button
                    className="mx-3"
                    variant="outline-light"
                    onClick={upcoming}
                  >
                    Upcoming
                  </Button>
                </NavItem>
              </div>
            </ul>

            <NavItem>
              <Link className="nav-link text-light" to="/hostings">
                All Reservations
              </Link>
            </NavItem>
          </Container>
        </Navbar>
        <div id="home-bottom-container">
          <div id="management-bottom-inner">
            {listType === "checkingOut" && getCheckingOut()}
            {listType === "currentlyHosting" && getCurrentlyHosting()}
            {listType === "arrivingSoon" && getArivingSoon()}
            {listType === "upcoming" && getUpcoming()}
          </div>
        </div>
      </div>
    </>
  );
};

export default ManagementHome;
