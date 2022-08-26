
import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';



const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    fetchNotifications();
  }, []);
  const fetchNotifications = async () => {
    const response = await fetch(
      "http://localhost:5000/booking/getnotifications",
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
    console.log(data);
    if (data.success) {
      setNotifications(data.notifications);
    }
  };
  return (
    <div>
      <br />
      <br />
      <Container>
        <h3>Notifications</h3>
        <br />
        <br />
        <ul class="list-group">

         {notifications.map((notification, index) => (
          notification.unread?(<Link className ="list-group-item list-group-item-dark" to={`/bookingrequest/${notification.bookingID}/${notification._id}/${notification.type}`}>{notification.notificationTitle}</Link>):
        
          <Link className = "list-group-item list-group-item-light" to={`/bookingrequest/${notification.bookingID}/${notification._id}/${notification.type}`}> 
            {notification.notificationTitle}</Link>
         
          ))}

        </ul>
      </Container>
    </div>
  );
};

export default Notifications;
