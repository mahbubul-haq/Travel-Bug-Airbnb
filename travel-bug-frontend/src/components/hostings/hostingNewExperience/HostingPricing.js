import React, { useEffect } from "react";
import { Link } from 'react-router-dom';


import "../cssFiles/HostingPage1Base.css";
import "../cssFiles/HostingPricing.css";

const HostingPricing = (props) => {
    

  useEffect(() => {
    changeWidth(String(props.totalCost()).length);
  }, [props.totalCost()]);


  const changeWidth = (value) => {
    console.log("val: " + value);
    var element = document.getElementById("priceValue10");
    value = (value + 2) * 20;
    element.style.width = value + "px";

    console.log("Pp: " + props.partialPayAllowed());
    if (props.partialPayAllowed() == 1) {
      document.getElementById("partialPayCheck10").checked = true;
    } else document.getElementById("partialPayCheck10").checked = false;
    // if (props.hostPermission() == 1) {
    //   document.getElementById("hostPermission10").checked = true;
    // } else document.getElementById("hostPermission10").checked = false;
  }


    return (
      <div id="body">
        <div id="container">
          <div id="left">The fun part - set your price.</div>
          <div id="right">
            <div id="top">
              {/* <button id="saveAndExit" onClick={()=>{props.saveAndExit()}}>Save and Exit</button> */}
              
              <Link to="/host/home"><button id="saveAndExit">Exit</button></Link>
            </div>

            <div id="middle10">
              <div id="animation10">
                <div id="price10">
                  <button
                    className="circular10"
                    onClick={() => {
                      props.setTotalCost('', "dec");
                      changeWidth(
                        String(props.totalCost()).length
                      );
                    }}
                  >
                    -
                  </button>
                  <label id="priceBox10" for="priceValue10">
                    $
                    <input
                      placeholder="00"
                      type="number"
                      id="priceValue10"
                      name="quantity"
                      min="1"
                      max="500000000"
                      value={props.totalCost()}
                      onChange={(e) => {
                        props.setTotalCost(e.target.value, "");
                        changeWidth(e.target.value.length);
                      }}
                    />
                  </label>
                  <button
                    className="circular10"
                    onClick={() => {
                     props.setTotalCost('', "inc");
                      changeWidth(
                        String(props.totalCost()).length
                      );
                    }}
                  >
                    +
                  </button>
                </div>
                <div id="perNight10">Total Cost</div>
                <div id="partialPermission10">
                  <input
                    id="partialPayCheck10"
                    type="checkbox"
                    name="partialPay10"
                    onClick={() => {
                      props.setPartialPayAllowed(false);
                    }}
                  />
                  <label for="partialPayCheck10">Partial pay allowed</label>
                  {/* <br />
                  <input
                    id="hostPermission10"
                    type="checkbox"
                    name="hostPermission10"
                    onClick={() => {
                      props.changeHostPermission();
                    }}
                  />
                  <label for="hostPermission10">Host permission required</label> */}
                </div>
                <div id="instruction10">Cancellation policy:</div>
                <div id="cancellationPolicy10">
                  <div id="alignText10">
                    <div id="cancellationText10">
                      Maximum number of days before arrival to cancel
                      reservation with 50% refund
                    </div>
                  </div>
                  <div id="alignRight10">
                    <button
                      className="circular10small"
                      onClick={() => {
                        props.setMaxRefundDays(false);
                      }}
                    >
                      -
                    </button>
                    <div id="count10">{props.maxRefundDays()}</div>
                    <button
                      className="circular10small"
                      onClick={() => {
                        props.setMaxRefundDays(true);
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
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

export default HostingPricing
