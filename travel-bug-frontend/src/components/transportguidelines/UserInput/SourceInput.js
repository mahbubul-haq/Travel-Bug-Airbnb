import React, { useState } from 'react'
import Maps from '../Maps'
import OSM from '../OSM'

const SourceInput = (props) => {
  const [position, setPosition] = useState(null);
  return (
    <div>
      <h3>Enter your source</h3>
      {/* <Maps/> */}
      <OSM setLatLong={(val)=> {setPosition(val)}} />
      <button type="button" className="btn-primary btn-lg"
        onClick={() => {
          props.nextComponent();
          props.setSource(position);
          console.log("MY PRINTING");
          console.log(position);
        }}>
        Next
      </button>
    </div>
  )
}

export default SourceInput
