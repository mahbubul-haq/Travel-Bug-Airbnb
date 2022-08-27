import React, { useEffect } from "react";
import "../cssFiles/HostingAvailability.css";

const HostingAvailability = (props) => {
  useEffect(() => {
    console.log("hi hi", props.experience());
    if (!("hostingStartDate" in props.experience())) {
      props.setExperience({
        ...props.experience(),
        hostingStartDate: Date.now(),
        hostingEndDate: Date.now(),
      });
    }
  }, []);

  useEffect(() => {
    console.log("hi hi", props.experience());
  }, [props.experience()]);

  useEffect(() => {
    if ("hostingStartDate" in props.experience()) {
      var element = document.getElementById("availability-start-date-input");
      if (element != null) {
        element.value = props.experience().hostingStartDate.slice(0, 10);
      }
      element = document.getElementById("availability-end-date-input");

      if (element != null) {
        element.value = props.experience().hostingEndDate.slice(0, 10);
      }
    }
  });

  return (
    <div className="hosting-availability">
      <div id="hosting-availability-middle">
        <div id="ins-hosting-availability">
          Provide the information when you are available to host this experience
        </div>
        <div id="availability-start-date">
          <label for="availability-start-date-input">Hosting Start Date</label>
          <input
            id="availability-start-date-input"
            type="date"
            onChange={(e) => {
              props.setExperience({
                ...props.experience(),
                hostingStartDate: e.target.value,
              });
            }}
            value={props.experience().hostingStartDate}
          />
        </div>
        <div id="availability-end-date">
          <label for="availability-end-date-input">Hosting End Date</label>
          <input
            id="availability-end-date-input"
            type="date"
            onChange={(e) => {
              props.setExperience({
                ...props.experience(),
                hostingEndDate: e.target.value,
              });
            }}
            value={props.experience().hostingEndDate}
          />
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default HostingAvailability;
