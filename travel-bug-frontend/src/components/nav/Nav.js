import React, { useContext, useEffect, useState } from "react";

import { Navbar, NavbarBrand, NavItem } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "../../App.css";
import userContext from "../../context/user/userContext";
const Nav = () => {
  const context = useContext(userContext);
  const { user, getUser } = context;
  //useState for notification count
  const [notificationCount, setNotificationCount] = useState(0);
  //find notifcation count
  const findNotificationCount = async () => {
    const response = await fetch(
      "http://localhost:5000/booking/notificationcount/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({}),
      }
    );
    const data = await response.json();
    if (data.success) {
      setNotificationCount(data.count);
    }
  };
  //update notification count after 30s time interval
  useEffect(() => {
    setInterval(() => {
      if (localStorage.getItem("token")) {
        findNotificationCount();
      }
    }, 3000);
  }, []);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getUser();
    }
  }, []);

  let navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("isHost");
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleSwitchToHosting = (e) => {
    e.preventDefault();
    localStorage.setItem("isHost", true);
    navigate("/hostings");
  };

  const handleSwitchToClient = (e) => {
    e.preventDefault();
    localStorage.removeItem("isHost");
    navigate("/");
  };

  const handleMessages = (e) => {
    e.preventDefault();
    navigate("/messages");
  };

  const handleNotifications = (e) => {
    e.preventDefault();
    navigate("/notifications");
  };

  const handleBookings = (e) => {
    e.preventDefault();
    navigate("/bookings");
  };

  const handleAccount = (e) => {
    e.preventDefault();
    navigate("/account");
  };
  return (
    <div>
      <Navbar bg="custom" variant="light">
        <div className="container ">
          <NavbarBrand>
            <strong>Travel Bug</strong>
          </NavbarBrand>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {
                localStorage.getItem("isHost")
                  ? <NavItem>
                    <Link
                      className="nav-link text-dark"
                      to="/hostings"
                    >
                      Home
                    </Link>
                  </NavItem>
                  :
                  <NavItem>
                    <Link
                      className="nav-link active text-dark"
                      aria-current="page"
                      to="/"
                    >
                      Home
                    </Link>
                  </NavItem>
              }

              {
                localStorage.getItem("isHost")
                  ? <NavItem>
                    <Link
                      className="nav-link text-dark"
                      to="/hostings/listings"
                    >
                      Listings
                    </Link>
                  </NavItem>
                  : <></>
              }
              <NavItem>
                <Link
                  className="nav-link text-dark"
                  to={
                    localStorage.getItem("isHost")
                      ? "/newlisting"
                      : "/experiences"
                  }
                >
                  {localStorage.getItem("isHost")
                    ? "Create New Listing"
                    : "Experiences"}
                </Link>
              </NavItem>
              {
                localStorage.getItem("isHost")
                  ? <NavItem>
                    <Link
                      className="nav-link text-dark"
                      to="/messages"
                    >
                      Inbox
                    </Link>
                  </NavItem>
                  : <></>
              }
              {
                !localStorage.getItem("isHost")
                  ? <NavItem>
                    <Link
                      className="nav-link text-dark"
                      to="/transportguidelines"
                    >
                      Transport Guidelines
                    </Link>
                  </NavItem>
                  : <></>
              }

            </ul>
            {!localStorage.getItem("token") ? (
              <form className="d-flex" role="button">
                <Link
                  className="btn btn-primary mx-2"
                  to="/signup"
                  role="button"
                >
                  Signup
                </Link>
                <Link
                  className="btn btn-secondary mx-2"
                  to="/login"
                  role="button"
                >
                  Login
                </Link>
              </form>
            ) : (
              <form className="d-flex" role="button">
                {localStorage.getItem("isHost") ? (
                  <button
                    className="btn btn-outline-dark mx-3"
                    onClick={handleSwitchToClient}
                  >
                    Switch to Client
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-dark mx-3"
                    onClick={handleSwitchToHosting}
                  >
                    Switch to Hosting
                  </button>
                )}
                <div className="btn-group">
                  <button
                    type="button"
                    className="btn btn-dark dropdown-toggle"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {user.firstName + " " + user.lastName}
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={handleMessages}
                      >
                        Messages
                      </button>
                    </li>
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={handleNotifications}
                      >
                        Notifications <strong>({notificationCount})</strong>
                      </button>
                    </li>
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={handleBookings}
                      >
                        Bookings
                      </button>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <button className="dropdown-item" onClick={handleAccount}>
                        Account
                      </button>
                    </li>
                    <li>
                      <button className="dropdown-item" onClick={handleLogout}>
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </form>
            )}
          </div>
        </div>
      </Navbar>
    </div>
  );
};

export default Nav;
