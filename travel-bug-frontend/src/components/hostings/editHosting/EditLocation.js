import React, { useEffect } from "react";

import "./CustomMap.css";
import EditLocationMap from "./EditLocationMap";

function distance(lat1, lon1, lat2, lon2, unit) {
  var radlat1 = (Math.PI * lat1) / 180;
  var radlat2 = (Math.PI * lat2) / 180;
  var theta = lon1 - lon2;
  var radtheta = (Math.PI * theta) / 180;
  var dist =
    Math.sin(radlat1) * Math.sin(radlat2) +
    Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  if (dist > 1) {
    dist = 1;
  }
  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515;
  if (unit == "K") {
    dist = dist * 1.609344;
  }
  if (unit == "N") {
    dist = dist * 0.8684;
  }
  return dist;
}

const EditLocation = (props) => {
  const setExperience = (val) => {
    console.log("val ", val);
    props.setExperience({
      location: {
        latitude: val.y || val.lat,
        longitude: val.x || val.lng,
        address: val.label,
      },
    });
  };

  useEffect(() => {
    console.log("props.experience ", props.experience().location);
  }, [props.experience().location]);

  return (
    <div>
      <br></br>
      <p
        style={{ marginBottom: "5px", marginLeft: "50px", fontWeight: "bold" }}
      >
        Change Location
      </p>
      <br></br>
      <EditLocationMap
        setLatLong={(val) => {
          console.log("x" in val);
          setExperience(val);
        }}
      />
    </div>
  );
};

export default EditLocation;
