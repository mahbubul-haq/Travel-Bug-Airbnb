import React, { useEffect } from "react";

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

  return (
    <div>
      <div className="hosting-availability">
        <div id="hosting-availability-middle">
          <div id="availability-start-date">
            <label for="avialibility-start-date">Hosting Start Date</label>
            <input
              id="avialibility-start-date"
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
            <label for="avialibility-end-date">Hosting End Date</label>
            <input
                id="avialibility-end-date"
                type="date"
                onChange={(e) => {
                    props.setExperience({
                        ...props.experience(),
                        hostingEndDate: e.target.value,
                    });
                }
            }
            value={props.experience().hostingEndDate}   
            />
            </div>
        </div>
      </div>
    </div>
  );
};

export default HostingAvailability;
