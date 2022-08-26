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

    setCurrentlyHosting_(() => {
      var temp_data = data.bookings.filter(
        (item) =>
          item.status === "approved" &&
          Date.parse(item.bookingStartDate) <= Date.now() &&
          Date.parse(item.bookingEndDate) >= Date.now()
      );
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
                      <small>not paid</small>
                    </Link>
                  );
                })}
              </ul>
            </div>
          )
    }
    else {
      return (
        <div>no item in upcoming</div>
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
                      <small>not paid</small>
                    </Link>
                  );
                })}
              </ul>
            </div>
          )
    } else {
      return (
        <div>no item in ariving soon</div>
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
                      <small>not paid</small>
                    </Link>
                  );
                })}
              </ul>
            </div>
          )
    } else {
      return (
        <div>no item in checking out</div>
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
                      <small>not paid</small>
                    </Link>
                  );
                })}
              </ul>
            </div>
          )
    } else {
      return (
        <div>no item in currently hosting</div>
      )
    }
  }



  return (
    <>
      <div id="management-home">
        <Card className="card-style-9">
          <Card.Title className="text-light my-10">
            <div className="container">
              <h3>Today</h3>
            </div>
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
          {listType === "checkingOut" && getCheckingOut()}
          {listType === "currentlyHosting" && getCurrentlyHosting()}
          {listType === "arrivingSoon" &&  getArivingSoon()}
          {listType === "upcoming" && getUpcoming()}
        </div>
      </div>
    </>
  );
};

export default ManagementHome;
