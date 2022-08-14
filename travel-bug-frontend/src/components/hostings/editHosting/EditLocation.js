import React, { useEffect } from "react";

import CustomMap from "./CustomMap";
import "./CustomMap.css";

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
  const [latLong, setLatLong] = React.useState(null);
  const [positions, setPositions] = React.useState([]);

  useEffect(() => {
    console.log("latLong", latLong);
    console.log("positions", positions);
    console.log(positions.length);
    for (var i = 0; i < positions.length; i++) {
      if (positions[i] == null) continue;
      console.log(distance(positions[0][0], positions[0][1], positions[i][0], positions[i][1], "K"));
    }
  } , [positions]);

  return (
    <div>
      <CustomMap
        setLatLong={(val) => {
          setLatLong(val);
        }}
        latLong={latLong}
        setPositions={(positions) => setPositions(positions)}
      />
    </div>
  );
};

export default EditLocation;
