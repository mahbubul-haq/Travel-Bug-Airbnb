import React, { useState } from 'react'
import Maps from '../Maps'
import OSM from '../OSM'

const DestinationInput = (props) => {
  const [position, setPosition] = useState(null);
  return (
    <div>
      Enter your destination
      <OSM setLatLong={(val)=>{setPosition(val)}} />
      <button type="button" className="btn-primary btn-lg"
        onClick={
          () => {
            props.prevComponent();
            props.setDestination(position);
            console.log(position);
          }
        }>
        Prev
      </button>
      <button type="button" className="btn-primary btn-lg"
        onClick={
          () => {
            props.nextComponent();
            props.setDestination(position);
            console.log("MY PRINTING");
            console.log(position);
          }
        }>
        Next
      </button>
    </div>
  )
}

export default DestinationInput
