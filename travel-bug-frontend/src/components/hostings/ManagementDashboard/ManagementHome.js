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
    console.log(data);
    for (let i = 0; i < data.bookings.length; i++) {
      data.bookings[i].bookingStartDate = data.bookings[
        i
      ].bookingStartDate.slice(0, 10);
      //console.log(data.bookings[i].bookingStartDate);
      //console.log(typeof data.bookings[i].bookingStartDate);
      //console.log(typeof new Date(data.bookings[i].bookingStartDate).getTime());
      //console.log(new Date("2020-12-20"));
      //console.log(typeof Date.now());
      const first = new Date(data.bookings[i].bookingStartDate).getTime();
      const second = Date.now();
      var diffTime = first - second;

      if (first < second) {
        continue;
      }

      // let time = moment("2020-09-15T20:05:28.000Z")
      //   .utc()
      //   .format("ddd MMM DD GGGG, h:mm A");

      // console.log(time);
      const days = diffTime / (1000 * 60 * 60 * 24);
      console.log(days);
      if (days <= 7) {
        setArivingSoon((prev) => {
          return [...prev, data.bookings[i]];
        });
        console.log("ariving soon");
      } else if (days > 7) {
        setUpComing((prev) => {
          return [...prev, data.bookings[i]];
          });
        console.log("upcoming");
      }
    }
    setBookings(data.bookings);
  };

  useEffect(() => {
    getAllHostings();
    getAllDrafts();
    
  }, []);

  useEffect(() => {
    getAllBookings();
  } , []);

  useEffect(() => {
  console.log(upComing);
  console.log(arivingSoon);
  }, [upComing, arivingSoon]);

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
                  <h4 style={{ color: "white", textAlign: "center" }}>
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
          {listType === "checkingOut" && (
            <div className="container my-10">
              <br />
              <br />
              <ul className="list-group">
                <Link to="#" className="list-group-item list-group-item-info">
                  <div className="d-flex w-100 justify-content-between">
                    <h4 className="mb-1">Booked By</h4>
                    <small># of guests</small>
                  </div>
                  <p className="mb-1">Hosting Title </p>
                  <small>paid/partially paid</small>
                </Link>

                <Link to="#" className="list-group-item list-group-item-info">
                  <div className="d-flex w-100 justify-content-between">
                    <h4 className="mb-1">Booked By</h4>
                    <small># of guests</small>
                  </div>
                  <p className="mb-1">Hosting Title </p>
                  <small>paid/partially paid</small>
                </Link>
              </ul>
            </div>
          )}
          {listType === "currentlyHosting" && (
            <div className="container my-10">
              <br />
              <br />
              <ul className="list-group">
                <li className="list-group-item list-group-item-info">
                  This is a currently hosting
                </li>
              </ul>
            </div>
          )}
          {listType === "arrivingSoon" && (
            <div className="container my-10">
              <br />
              <br />
              <ul className="list-group">
                <li className="list-group-item list-group-item-info">
                  This is a arriving soon
                </li>
              </ul>
            </div>
          )}
          {listType === "upcoming" && (
            <div className="container my-10">
              <br /> <br />
              <ul className="list-group">
                <li className="list-group-item list-group-item-info">
                  This is a upcoming
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ManagementHome;
