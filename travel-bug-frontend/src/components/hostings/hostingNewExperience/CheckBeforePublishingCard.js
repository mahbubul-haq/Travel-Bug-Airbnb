import React, { useEffect, useState } from "react";

import "../cssFiles/CheckBeforePublishingCard.css";

const CheckBeforePublishingCard = (props) => {
  const [itemsToBring, setItemsToBring] = useState([]);

  useEffect(() => {
    setItemsToBring([]);
    setItemsToBring((items) => {
      return [...items, props.itemsToBring];
    });
  }, []);

  const showLocation = () => {
    if (props.location.label) {
      return (
        <>
          <div className="card_location11">
            <h3>Location</h3>
            {props.location.label}
          </div>
        </>
      );
    } else {
      return <div className="card_location11"> Location not found </div>;
    }
  };

  const showActivities = () => {
    console.log(props.activities.length);
    if (props.activities.length > 0) {
      return (
        <>
          <hr className="hrCard" />
          <div className="card-activities">
            <h3>Activities</h3>
            <ul>
              {props.activities.map((activity, index) => {
                return (
                  <li className="card-activity-title" key={index}>
                    {activity.title}
                  </li>
                );
              })}
            </ul>
          </div>
        </>
      );
    } else {
      return <></>;
    }
  };

  return (
    <>
      <div className="card_container11">
        <div className="image_container11">
          <img src={props.img} alt="travel" className="card_image11" />
        </div>
        <div className="card_title11">
          <h1>{props.label}</h1>
        </div>
        <hr className="hrCard" />
        <div className="card_owner11">
          The Experience is hosted by {props.user.firstName}{" "}
          {props.user.lastName}
        </div>
        <hr className="hrCard" />
        <div className="card_text11">
          <div>
            <p>Category</p> <p>{props.category} </p>
          </div>
          <div>
            <p>Minimum Age</p> <p>{props.minAgeRequirement} years </p>
          </div>
          <div>
            <p>Maximum Group size</p>
            <p> {props.maxGroupSize} </p>
          </div>
          <div>
            <p>Total Cost</p> <p>${props.totalCost} </p>
          </div>
        </div>
        <hr className="hrCard" />
        <div className="card_description11">{props.description}</div>
        <hr className="hrCard" />
        {showLocation()}
        {showActivities()}
      </div>
    </>
  );
};
export default CheckBeforePublishingCard;
