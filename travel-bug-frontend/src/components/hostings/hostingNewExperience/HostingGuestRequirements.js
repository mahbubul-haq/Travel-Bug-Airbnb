import React from "react";

import "../cssFiles/HostingGuestRequirements.css";
import "../cssFiles/HostingPage1Base.css";

const HostingGuestRequirements = (props) => {
  const ages = [];
  for (let i = 1; i < 150; i++) {
    ages.push(i);
  }
  const group_sizes = [];
  for (let i = 1; i < 100; i++) {
    group_sizes.push(i);
  }

  return (
    <div id="body">
      <div id="container">
        <div id="left">What are the requirements for the guests?</div>
        <div id="right">
          <div id="top">
            {/* <button id="saveAndExit" onClick={()=>{props.saveAndExit()}}>Save and Exit</button> */}

            <button id="saveAndExit" onClick={() => props.saveAndExit()}>
              Save and Exit
            </button>
          </div>

          <div id="middle55">
            <table id="page8table">
              <tbody className="tbody-requirements">
                <tr className="requiremnts-tr">
                  <td className="requirements-td">
                    <p className="requirements-headers">
                      Minimum age requirement*
                    </p>
                    <select
                      className="requirements"
                      onChange={(event) => {
                        props.setMinAgeRequirement(event.target.value);
                      }}
                    >
                      {ages.map((age) => {
                        return (
                          <option key={age} value={age}>
                            {age}
                          </option>
                        );
                      })}
                    </select>
                    {/* <input
        
                      type="number"
                      className="requirements"
                      onChange={(e) =>
                        props.setMinAgeRequirement(e.target.value)
                      }
                      value={props.minAgeRequirement()}
                    ></input> */}
                  </td>
                </tr>
                <tr>
                  <td>
                    <p className="requirements-headers">Maximum group size*</p>
                    
                    <select
                      className="requirements"
                      onChange={(event) => {
                        props.setMaxGroupSize(event.target.value);
                      }}
                    >
                      {group_sizes.map((size) => {
                        return (
                          <option key={size} value={size}>
                            {size}
                          </option>
                        );
                      })}
                    </select>

                    {/* <input
                      type="number"
                      className="requirements"
                      onChange={(e) => props.setMaxGroupSize(e.target.value)}
                      value={props.maxGroupSize()}
                    ></input> */}
                  </td>
                </tr>
                <tr>
                  <td>
                    <p className="requirements-headers">
                      Items guests need to bring
                    </p>

                    <textarea
                      type="text"
                      className="requirements"
                      placeholder="item1
item2"
                      onChange={(e) => props.setItemsToBring(e.target.value)}
                      value={props.itemsToBring()}
                    ></textarea>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p className="requirements-headers">
                      Additional requirements for guests
                    </p>

                    <textarea
                      type="text"
                      className="requirements"
                      placeholder="E.g. No smoking,
Guests should be comfortable around wild animals"
                      onChange={(e) =>
                        props.setAdditionalRequirements(e.target.value)
                      }
                      value={props.additionalRequirements()}
                    ></textarea>
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

export default HostingGuestRequirements;
