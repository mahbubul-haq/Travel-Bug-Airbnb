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


  const deleteBooking = async (id) => {}

  const getButton = () => {
    if (listType === "upcoming" || listType === "arivingSoon") {
        return (
            <>
            <button className="btn btn-primary" id="m-b-delete-button">
                Delete 
            </button>
            </>
        )
    }
    else if (listType === "currentlyHosting" || listType === "checkingOut") {
        return (
          <>
            <button className="btn btn-primary" id="m-b-complete-button">
              Complete
            </button>
          </>
        );
    }
}

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
            Hosted By {item.user.firstName} {item.user.lastName}
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

          <div id="m-b-activities">
            <h3>selected activities</h3>
          </div>
          <div id="m-b-buttons">
            <button className="btn btn-primary" id="m-b-back-button"
            onClick={() => {
                navigate('/hostings');
            }
            }
            >
                Back
            </button>
            {getButton()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageBooking;
