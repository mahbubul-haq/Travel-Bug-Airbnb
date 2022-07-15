import React, { useState } from "react";
import { Button, Card, Container, Navbar, NavItem } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./style.css";
const ManagementHome = () => {
  const [listType, SetlistType] = useState("");
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
  return (
    <>
      <Card>
        <Card.Title className="text-light my-10">
          <div className="container">
            <h3>Today</h3>
          </div>
        </Card.Title>
        <Card.Body>
          <div className="container">
            <button type="button" class="btn btn-outline-primary btn-lg">
              Complete Your Listing
            </button>
          </div>
        </Card.Body>
      </Card>
      <Navbar bg="dark" variant="dark">
        <Container fluid>
          <ul className="navbar-nav me-auto mb-10 mb-1 text-light">
            <div className="btn-toolbar">
              <NavItem>
                <Button className="mx-3" variant="outline-light" onClick={checkingOut}>
                  Checking Out
                </Button>
              </NavItem>
              <NavItem>
                <Button className="mx-3" variant="outline-light" onClick={currentlyHosting}>
                  Currently Hosting
                </Button>
              </NavItem>
              <NavItem>
                <Button className="mx-3" variant="outline-light" onClick={arrivingSoon}>
                  Arriving Soon
                </Button>
              </NavItem>
              <NavItem>
                <Button className="mx-3" variant="outline-light" onClick={upcoming}>
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
      <Container>
        {listType === "checkingOut" && (
          <div className="container my-10">
            <br />
            <br />
            <ul class="list-group">
              <Link to="#" class="list-group-item list-group-item-info">
                <div class="d-flex w-100 justify-content-between">
                  <h4 className="mb-1">Booked By</h4>
                  <small># of guests</small>
                </div>
                <p class="mb-1">Hosting Title </p>
                <small>paid/partially paid</small>
              </Link>

              <Link to="#" class="list-group-item list-group-item-info">
                <div class="d-flex w-100 justify-content-between">
                  <h4 className="mb-1">Booked By</h4>
                  <small># of guests</small>
                </div>
                <p class="mb-1">Hosting Title </p>
                <small>paid/partially paid</small>
              </Link>
            </ul>
          </div>
        )}
        {listType === "currentlyHosting" && (
          <div className="container my-10">
            <br />
            <br />
            <ul class="list-group">
              <li class="list-group-item list-group-item-info">
                This is a currently hosting
              </li>
            </ul>
          </div>
        )}
        {listType === "arrivingSoon" && (
          <div className="container my-10">
            <br />
            <br />
            <ul class="list-group">
              <li class="list-group-item list-group-item-info">
                This is a arriving soon
              </li>
            </ul>
          </div>
        )}
        {listType === "upcoming" && (
          <div className="container my-10">
            <br /> <br />
            <ul class="list-group">
              <li class="list-group-item list-group-item-info">
                This is a upcoming
              </li>
            </ul>
          </div>
        )}
      </Container>
    </>
  );
};

export default ManagementHome;
