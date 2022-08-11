import React from "react";


const EditCost = (props) => {
  const changeWidth = (value) => {
    console.log("val: " + value);
    var element = document.getElementById("priceValue10");
    value = (value + 2) * 20;
    element.style.width = value + "px";

    console.log("Pp: " + props.experience().partialPayAllowed);
    if (props.experience().partialPayAllowed == 1) {
      document.getElementById("partialPayCheck10").checked = true;
    } else document.getElementById("partialPayCheck10").checked = false;
    if (props.experience().individualOrTeam == "team") {
      document.getElementById("individual10").checked = true;
    } else document.getElementById("individual10").checked = false;
  };

  return (
    <div>
      <div id="price10">
        <button
          className="circular10"
          onClick={() => {
            props.setexperience({});
            changeWidth(String(props.experience().totalCost).length);
          }}
        >
          -
        </button>
        <label id="priceBox10" htmlFor="priceValue10">
          $
          <input
            placeholder="00"
            type="number"
            id="priceValue10"
            name="quantity"
            min="1"
            max="500000000"
            value={props.experience().totalCost}
            onChange={(e) => {
              props.setexperience({});
              changeWidth(e.target.value.length);
            }}
          />
        </label>
        <button
          className="circular10"
          onClick={() => {
            props.setexperience({});
            changeWidth(String(props.experience().totalCost).length);
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
            props.setexperience({});
          }}
        />
        <label htmlFor="partialPayCheck10">Partial pay allowed</label>
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

      <div id="partialPermission10">
        <input
          id="individual10"
          type="checkbox"
          name="individual10"
          onClick={() => {
            props.setexperience({});
          }}
        />
        <label htmlFor="individual10">Hosted by a team</label>
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
            Maximum number of days before arrival to cancel reservation with 50%
            refund
          </div>
        </div>
        <div id="alignRight10">
          <button
            className="circular10small"
            onClick={() => {
              props.setexperience({});
            }}
          >
            -
          </button>
          <div id="count10">{props.experience().MaxRefundDays}</div>
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
  );
};

export default EditCost;
