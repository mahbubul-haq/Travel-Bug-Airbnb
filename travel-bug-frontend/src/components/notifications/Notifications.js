import React, { useEffect, useState } from "react";

import { Container } from "react-bootstrap";

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
          {notifications.map((notification, index) =>
            notification.unread ? (
              <li class="list-group-item list-group-item-dark">
                {notification.notificationTitle}
              </li>
            ) : (
              <li class="list-group-item list-group-item-light">
                Meo meo
                {notification.notificationTitle}
              </li>
            )
          )}
        </ul>
      </Container>
    </div>
  );
};

export default Notifications;
