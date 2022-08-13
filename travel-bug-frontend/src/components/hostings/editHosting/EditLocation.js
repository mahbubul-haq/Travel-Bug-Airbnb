import React from "react";

import CustomMap from "./CustomMap";
import "./CustomMap.css";

const EditLocation = (props) => {
  const [latLong, setLatLong] = React.useState(null);
  return (
    <div>
      <CustomMap
        setLatLong={(val) => {
          setLatLong(val);
        }}
        latLong={latLong}
      />
    </div>
  );
};

export default EditLocation;
