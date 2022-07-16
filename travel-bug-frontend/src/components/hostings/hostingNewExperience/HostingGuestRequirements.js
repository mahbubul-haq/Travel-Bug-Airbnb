import React from "react";
import { Link } from 'react-router-dom';


import "../cssFiles/HostingGuestRequirements.css";
import "../cssFiles/HostingPage1Base.css";


const HostingGuestRequirements = (props) => {

    

    return (
      <div id="body">
        <div id="container">
          <div id="left">What are the requirements for the guests?</div>
          <div id="right">
            <div id="top">
              {/* <button id="saveAndExit" onClick={()=>{props.saveAndExit()}}>Save and Exit</button> */}
              
              <Link to="/host/home"><button id="saveAndExit">Exit</button></Link>
            </div>

            <div id="middle55">
                <div>
              <table id = "page8table">
                <tbody>
                    
                  <tr>
                    <td>
                      Minimum age requirement
                      <br></br>
                      <input type="number" id="requiremnents" 
                      onChange={(e) => props.setMinAgeRequirement(e.target.value)}
                      value={props.minAgeRequirement()}></input>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Maximum group size
                      <br></br>
                      <input type="number" id="requiremnents" 
                      onChange={(e) => props.setMaxGroupSize(e.target.value)}
                      value={props.maxGroupSize()}></input>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Items guests need to bring
                      <br></br>
                      <input type="text" id="requiremnents"
                       onChange={(e) => props.setItemsToBring(e.target.value)}
                      value={props.itemsToBring()}></input>
                    </td>
                  </tr>
                  <tr>
                    <td>
                        Additional requirements (optional)
                      <br></br>
                      <input type="text" id="requiremnents"
                       onChange={(e) => props.setAdditionalRequirements(e.target.value)}
                      value={props.additionalRequirements()}></input>
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
      </div>
    );
  
}

export default HostingGuestRequirements;
