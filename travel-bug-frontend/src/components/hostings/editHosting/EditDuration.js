import React from "react";
import "../cssFiles/EditDuration.css";

const EditDuration = (props) => {
  return (
    <div id="edit-duration">
      <table id="page5table">
        <tbody>
          <tr>
            <td>
              <span id="text-5">Please specify the duration of hosting</span>
              <br></br>
              <br></br>
              Days
              <div className="increment5">
                <button
                  className="circular5"
                  onClick={() => {
                    props.setExperience({
                      hostingDuration: {
                        days: Math.max(
                          props.experience().hostingDuration.days - 1,
                          0
                        ),
                        hours: props.experience().hostingDuration.hours,
                      },
                    });
                  }}
                >
                  -
                </button>
                <div id="count5">{props.experience().hostingDuration.days}</div>
                <button
                  className="circular5"
                  onClick={() => {
                    props.setExperience({
                      hostingDuration: {
                        days: Math.min(
                          props.experience().hostingDuration.days + 1,
                          100
                        ),
                        hours: props.experience().hostingDuration.hours,
                      },
                    });
                  }}
                >
                  +
                </button>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              Hours
              <div className="increment5">
                <button
                  className="circular5"
                  onClick={() => {
                    props.setExperience({
                      hostingDuration: {
                        hours: Math.max(
                          props.experience().hostingDuration.hours - 1,
                          0
                        ),
                        days: props.experience().hostingDuration.days,
                      },
                    });
                  }}
                >
                  -
                </button>
                <div id="count5">
                  {props.experience().hostingDuration.hours}
                </div>
                <button
                  className="circular5"
                  onClick={() => {
                    props.setExperience({
                      hostingDuration: {
                        hours: Math.min(
                          props.experience().hostingDuration.hours + 1,
                          23
                        ),
                        days: props.experience().hostingDuration.days,
                      },
                    });
                  }}
                >
                  +
                </button>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <span id="text-5">
                When are you availabe in a day (for this experience)?
              </span>
              <br></br>
              <br></br>
              Starts
              <div className="increment5">
                <button
                  className="circular5"
                  onClick={() => {
                    props.setExperience({
                      hostAvailability: {
                        start: Math.max(
                          0,
                          props.experience().hostAvailability.start - 1
                        ),
                        end: props.experience().hostAvailability.end,
                      },
                    });
                  }}
                >
                  -
                </button>
                <div id="count5">
                  {props.experience().hostAvailability.start}
                </div>
                <button
                  className="circular5"
                  onClick={() => {
                    props.setExperience({
                      hostAvailability: {
                        start: Math.min(
                          23,
                          props.experience().hostAvailability.start + 1
                        ),
                        end: props.experience().hostAvailability.end,
                      },
                    });
                  }}
                >
                  +
                </button>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              Ends
              <div className="increment5">
                <button
                  className="circular5"
                  onClick={() => {
                    props.setExperience({
                      hostAvailability: {
                        end: Math.max(
                          0,
                          props.experience().hostAvailability.end - 1
                        ),
                        start: props.experience().hostAvailability.start,
                      },
                    });
                  }}
                >
                  -
                </button>
                <div id="count5">{props.experience().hostAvailability.end}</div>
                <button
                  className="circular5"
                  onClick={() => {
                    props.setExperience({
                      hostAvailability: {
                        end: Math.min(
                          23,
                          props.experience().hostAvailability.end + 1
                        ),
                        start: props.experience().hostAvailability.start,
                      },
                    });
                  }}
                >
                  +
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default EditDuration;
