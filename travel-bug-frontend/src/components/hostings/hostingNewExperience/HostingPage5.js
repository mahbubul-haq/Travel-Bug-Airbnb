import React from "react";
import { Link } from 'react-router-dom';


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
              
              <Link to="/host/home"><button id="saveAndExit">Exit</button></Link>
            </div>

            <div id="middle5">
              <table id = "page5table">
                <tbody>
                    
                  <tr>
                    <td>
                      Please specify the duration of hosting
                      <br></br><br></br>
                      days:
                      <div className="increment5">
                        <button className="circular5" 
                        onClick={()=>{props.setHostingDurationDays(false)}}>-</button>
                        <div id="count5">{props.hostingDuration().days}</div>
                        <button className="circular5" onClick={()=>{props.setHostingDurationDays(true)}}>+</button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      hours:
                      <div className="increment5">
                        <button className="circular5" onClick={()=>{props.setHostingDurationHours(false)}}>-</button>
                        <div id="count5">{props.hostingDuration().hours}</div>
                        <button className="circular5" onClick={()=>{props.setHostingDurationHours(true)}}>+</button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                        When are you availabe in a day (for this experience)?
                        <br></br><br></br>
                        
                      starts:
                      <div className="increment5">
                        <button className="circular5" onClick={()=>{props.setDayTimeSlotStart(false)}}>-</button>
                        <div id="count5">{props.dayTimeSlot().start}</div>
                        <button className="circular5" onClick={()=>{props.setDayTimeSlotStart(true)}}>+</button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      ends:
                      <div className="increment5">
                        <button className="circular5" onClick={()=>{props.setDayTimeSlotEnd(false)}}>-</button>
                        <div id="count5">{props.dayTimeSlot().end}</div>
                        <button className="circular5" onClick={()=>{props.setDayTimeSlotEnd(true)}}>+</button>
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
  
}

export default HostingPage5;
