import React, { useEffect } from "react";
import "../cssFiles/EditCost.css";


const EditCost = (props) => {

    useEffect(() => {
    changeWidth(String(props.experience().totalCost).length);
  }, [props.experience().totalCost]);

  const changeWidth = (value) => {
    console.log("val: " + value);
    var element = document.getElementById("edit-priceValue10");
    value = (value + 2) * 20;
    element.style.width = value + "px";

    console.log("Pp: " + props.experience().partialPayAllowed);
    if (props.experience().partialPayAllowed == 1) {
      document.getElementById("edit-partialPayCheck10").checked = true;
    } else document.getElementById("edit-partialPayCheck10").checked = false;
    if (props.experience().individualOrTeam == "team") {
      document.getElementById("edit-individual10").checked = true;
    } else document.getElementById("edit-individual10").checked = false;
  };

  return (
    <div>

      <div id="edit-price10">
        <button
          className="edit-circular10"
          onClick={() => {
            props.setExperience({totalCost: Math.max(props.experience().totalCost - 5, 25)});
            changeWidth(String(props.experience().totalCost).length);
          }}
        >
          -
        </button>
        <label id="edit-priceBox10" htmlFor="edit-priceValue10">
          $
          <input
            placeholder="00"
            type="number"
            id="edit-priceValue10"
            name="edit-quantity"
            min="1"
            max="500000000"
            value={props.experience().totalCost}
            onChange={(e) => {
              props.setExperience({totalCost: Math.max(0, Math.min(300000000,parseInt(e.target.value)))});
              changeWidth(e.target.value.length);
            }}
          />
        </label>
        <button
          className="edit-circular10"
          onClick={() => {
            props.setExperience(
              {totalCost: Math.min(props.experience().totalCost + 5, 2500000000)}
            )
            changeWidth(String(props.experience().totalCost).length);
          }}
        >
          +
        </button>
      </div>
      <div id="edit-perNight10">Total Cost</div>
      <div id="edit-partialPermission10">
        <input
          id="edit-partialPayCheck10"
          type="checkbox"
          name="edit-partialPay10"
          onClick={() => {
            props.setExperience({partialPayAllowed: !props.experience().partialPayAllowed});
          }}
        />
        <label htmlFor="edit-partialPayCheck10">Partial pay allowed</label>
      </div>

      <div id="edit-partialPermission10">
        <input
          id="edit-individual10"
          type="checkbox"
          name="edit-individual10"
          onClick={() => {
            if (props.experience().individualOrTeam == "team")
              props.setExperience({individualOrTeam: "individual"});
            else props.setExperience({individualOrTeam: "team"})
          }}
        />
        <label htmlFor="edit-individual10">Hosted by a team</label>
        
      </div>

      <div id="edit-instruction10">Cancellation policy:</div>
      <div id="edit-cancellationPolicy10">
        <div id="edit-alignText10">
          <div id="edit-cancellationText10">
            Maximum number of days before arrival to cancel reservation with 50%
            refund
          </div>
        </div>
        <div id="edit-alignRight10">
          <button
            className="edit-circular10small"
            onClick={() => {
              props.setExperience({maxRefundDays: Math.max(3, props.experience().maxRefundDays - 1)});
            }}
          >
            -
          </button>
          <div id="edit-count10">{props.experience().maxRefundDays}</div>
          <button
            className="edit-circular10small"
            onClick={() => {
              props.setExperience({maxRefundDays: Math.min(30, props.experience().maxRefundDays + 1)});

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
