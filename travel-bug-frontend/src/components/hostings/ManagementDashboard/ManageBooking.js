import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import "./ManageBooking.css";

const ManageBooking = () => {
  const location = useLocation().state;
  const { item, listType } = location;

  const navigate = useNavigate();

  console.log(item);
  console.log(listType);
  useEffect(() => {
    console.log(item);
  }, [item]);

  const deleteBooking = async () => {
    const booking = await fetch(
      `http://localhost:5000/booking/rejected/${item._id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({}),
      }
    );
    const result = await booking.json();
    console.log(result);
    if (result.success) {
      navigate("/hostings");
    } else {
      console.log(result.error);
      alert("Booking not deleted");
    }
  };

  const completeHosting = async () => {
    const hosting = await fetch(
      `http://localhost:5000/booking/completed/${item._id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({}),
      }
    );
    const result = await hosting.json();
    console.log(result);
    if (result.success) {
      navigate("/hostings");
    } else {
      console.log(result.error);
      alert("Booking not deleted");
    }
  };

  const getButton = () => {
    console.log(listType);
    if (listType === "upcoming" || listType === "arrivingSoon") {
      return (
        <>
          <button
            className="btn btn-primary"
            id="m-b-delete-button"
            onClick={() => {
              deleteBooking();
            }}
          >
            Delete
          </button>
        </>
      );
    } else if (listType === "currentlyHosting" || listType === "checkingOut") {
      return (
        <>
          <button
            className="btn btn-primary"
            id="m-b-complete-button"
            onClick={() => {
              completeHosting();
            }}
          >
            Complete
          </button>
        </>
      );
    }
  };

  return (
    <div>
      <div id="manage-booking-container">
        <div id="manage-booking-inner">
          <div id="manage-booking-title">
            <Link
              to={`/host/experience/${item.hostingID._id}`}
              state={{ expId: item.hostingID._id }}
            >
              {item.hostingID.hostingTitle}
            </Link>
          </div>
          <div id="manage-booking-user">
            Booked By {item.user.firstName} {item.user.lastName}
          </div>
          <div id="manage-booking-more">
            <div id="manage-booking-date">
              <div id="manage-booking-start-date">
                Booking start date : {item.bookingStartDate.slice(0, 10)}
              </div>
              <div id="manage-booking-end-date">
                Booking end date : {item.bookingEndDate.slice(0, 10)}
              </div>
            </div>
            <div id="m-b-cost">
              <div id="m-b-total-cost">Total Cost : ${item.cost}</div>
              <div id="m-b-no-of-guests">No of guests : {item.noOfGuests}</div>
            </div>
          </div>
          <div id="m-b-paid">
            {"paymentID" in item && <div style={{ color: "green" }}>PAID</div>}
            {!("paymentID" in item) && (
              <div style={{ color: "red" }}>NOT PAID</div>
            )}
          </div>

          <div id="m-b-activities">
            <h3>selected activities</h3>
            <ul>
             <li>No activity selected</li>
              </ul>
          </div>
          <div id="m-b-buttons">
            <button
              className="btn btn-primary"
              id="m-b-back-button"
              onClick={() => {
                navigate("/hostings");
              }}
            >
              Back
            </button>
            {getButton()}
            <button onClick={() => {
              navigate("/messages", {state: {"receiverId": item.user._id, "receiverName": item.user.firstName + " " + item.user.lastName}})
            }} className="btn btn-primary" id="m-b-contact-button">
              Contact User
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageBooking;
