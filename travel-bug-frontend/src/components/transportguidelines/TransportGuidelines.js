import React, { useEffect, useState } from 'react';
import CustomMap from './map/CustomMap';
import './map/CustomMap.css';

const TransportGuidelines = () => {
  const [positions, setPositions] = useState([]);
  const [componentNo, setComponentNo] = useState(1);
  const [source, setSource] = useState({ long: ' ? ', lat: ' ? ' });
  const [destination, setDestination] = useState({ long: ' ? ', lat: ' ?' });
  const [guidelineData, setGuidelineData] = useState([]);

  useEffect(() => {
    let long = '?';
    let lat = '?';
    if (positions.length > 0) {
      long = positions[0][0];
      lat = positions[0][1];
      setSource({ long, lat });
    }


    if (positions.length > 1) {
      long = positions[1][0];
      lat = positions[1][1];
      setDestination({ long, lat });
    }
  }, [positions]);

  const nextComponent = () => {
    setComponentNo(componentNo + 1);
  }

  const prevComponent = () => {
    setComponentNo(componentNo - 1);
  }

  const getDetails = async () =>{
    const response = await fetch("http://localhost:5000/transport/getguideline", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "source":{
              "long": source.long,
              "lat": source.lat
          },
          "destination":{
            "long":destination.long,
            "lat":destination.lat
          }
        })
    });
    const json = await response.json();
    console.log("My desired stops");
    console.log(json);
    setGuidelineData(json.guideline);
  }

  const SourceInput = () => {
    let long = ' ? ';
    let lat = ' ? ';

    if (positions.length > 0) {
      long = positions[positions.length - 1][0];
      lat = positions[positions.length - 1][1];
    }
    console.log("long : " + long);
    console.log("lat : " + lat);
    // setSource({long:long,lat:lat});

    return (
      <div>
        <h5>Source LONG:{source.long} , LAT:{source.lat}</h5>
        <h5></h5>
        <button type="button" className="btn btn-primary btn-lg"
          onClick={() => {
            nextComponent();
          }}>
          Next
        </button>
      </div>
    )
  }

  const DestinationInput = () => {
    let long = ' ? ';
    let lat = ' ? ';

    if (positions.length > 1) {
      long = positions[positions.length - 1][0];
      lat = positions[positions.length - 1][1];
    }

    return (
      <div>
        <h3>Destination LONG:{destination.long} , LAT:{destination.lat}</h3>
        {/* <OSM setLatLong={(val)=>{setPosition(val)}} /> */}
        <button type="button" className="btn btn-primary btn-lg mx-1"
          onClick={
            () => {
              prevComponent();
            }
          }>
          Prev
        </button>
        <button type="button" className="btn btn-primary btn-lg mx-1"
          onClick={
            () => {
              nextComponent();
            }
          }>
          Next
        </button>
      </div>
    )
  }

  const ViewInputs = () => {
    return (
      <div>
        <h3>Source LONG:{source.long} | LAT:{source.lat}</h3>
        <h3>Destination LONG:{destination.long} | LAT:{destination.lat}</h3>
        {/* <OSM setLatLong={(val)=>{setPosition(val)}} /> */}
        <button type="button" className="btn btn-primary btn-lg mx-1"
          onClick={
            () => {
              prevComponent();
            }
          }>
          Prev
        </button>
        <button type="button" className="btn btn-primary btn-lg mx-1"
          onClick={
            () => {
              getDetails();
              nextComponent();
            }
          }>
          Get Details
        </button>
      </div>
    )
  }

  const ViewGuidelines = () =>{
    return (
      <div>
        <h3>Guidelines</h3>
        {guidelineData.map((guideline, index) => {
          return (
            <div key={index}>
              <h5>Transport Name: {guideline.transportName}</h5>
              <h5>Transport Category: {guideline.transportCategory}</h5>
              <h5>Total Cost: {guideline.totalCost}</h5>
              <br/>
            </div>
          )
        })}
      </div>
    )
  }

  const renderComponent = () => {
    switch (componentNo) {
      case 1:
        return (
          <center>
            <h2>Step {componentNo} - Enter your source</h2>
            <CustomMap setPositions={(e) => setPositions(e)} />
            {SourceInput()}
          </center>
        );

      case 2:
        return (
          <center>
            <h2>Step {componentNo} - Enter your destination</h2>
            <CustomMap setPositions={(e) => setPositions(e)} />
            {DestinationInput()}
          </center>
        );

      case 3:
        return (
          <center>
            <h2 className='text-center'>Details for you</h2>
            <CustomMap setPositions={(e) => setPositions(e)} />
            {ViewInputs()}
          </center>
        );
      case 4:
        return (
          <center>
            <h2 className='text-center'>Details for you</h2>
            <CustomMap setPositions={(e) => setPositions(e)} />
            {ViewGuidelines()}
          </center>
        )
    };
  }

  return (
    <div className='container'>
      {renderComponent()}
    </div>

  )
}

export default TransportGuidelines;