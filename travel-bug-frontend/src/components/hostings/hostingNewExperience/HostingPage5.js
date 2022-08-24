import React from "react";

import "../cssFiles/HostingPage1Base.css";
import "../cssFiles/HostingPage5.css";

const HostingPage5 = (props) => {
  return (
    <div id="body">
      <div id="container">
        <div id="left">What is the duration of hosting?</div>
        <div id="right">
          <div id="top">
            {/* <button id="saveAndExit" onClick={()=>{props.saveAndExit()}}>Save and Exit</button> */}

            <button id="saveAndExit" onClick={() => props.saveAndExit()}>
              Save and Exit
            </button>
          </div>

          <div id="middle5">
            <table id="page5table">
              <tbody>
                <tr>
                  <td>
                    <span id="text-5">
                      Please specify the duration of hosting
                    </span>
                    <br></br>
                    <br></br>
                    Days
                    <div className="increment5">
                      <button
                        className="circular5"
                        onClick={() => {
                          props.setHostingDurationDays(false);
                        }}
                      >
                        -
                      </button>
                      <div id="count5">{props.hostingDuration().days}</div>
                      <button
                        className="circular5"
                        onClick={() => {
                          props.setHostingDurationDays(true);
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
                          props.setHostingDurationHours(false);
                        }}
                      >
                        -
                      </button>
                      <div id="count5">{props.hostingDuration().hours}</div>
                      <button
                        className="circular5"
                        onClick={() => {
                          props.setHostingDurationHours(true);
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
                          props.setDayTimeSlotStart(false);
                        }}
                      >
                        -
                      </button>
                      <div id="count5">{props.dayTimeSlot().start}</div>
                      <button
                        className="circular5"
                        onClick={() => {
                          props.setDayTimeSlotStart(true);
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
                          props.setDayTimeSlotEnd(false);
                        }}
                      >
                        -
                      </button>
                      <div id="count5">{props.dayTimeSlot().end}</div>
                      <button
                        className="circular5"
                        onClick={() => {
                          props.setDayTimeSlotEnd(true);
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

          <div id="bottom">
            <button id="backButton" onClick={() => props.prevPage()}>
              Back
            </button>
            <button id="nextButton" onClick={() => props.nextPage()}>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostingPage5;
