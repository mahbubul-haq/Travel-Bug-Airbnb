import React, { useEffect, useState } from 'react';
import CustomMap from './map/CustomMap';
import './map/CustomMap.css';
import RouteCustomMap from './map/RouteCustomMap';

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

  const getDetails = async () => {
    const response = await fetch("http://localhost:5000/transport/getguideline", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "source": {
          "long": source.long,
          "lat": source.lat
        },
        "destination": {
          "long": destination.long,
          "lat": destination.lat
        }
      })
    });
    const json = await response.json();
    // console.log("My desired stops");
    // console.log(json);
    console.log("My stopages", typeof(json.guideline[0].stopages),json.guideline[0].stopages);
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
              console.log("ALL INPUT DONE. Fetching data");
              getDetails();
              console.log("Fetching data done");
              nextComponent();
            }
          }>
          Get Details
        </button>
      </div>
    )
  }

  const ViewGuidelines = () => {
    return (
      <div className='my-4'>
        <h3>Here are the available transports</h3>
        {guidelineData.map((guideline, index) => {
          return (
            <div key={index}>
              {ViewMoreModal(guideline)}
              <br />
            </div>
          )
        })}
      </div>
    )
  }

  const ViewMoreModal = (guideline) => {
    return (
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Transport Name</th>
            <th scope="col">Transport Category</th>
            <th scope="col">Start</th>
            <th scope="col">Gatelock</th>
            <th scope="col">Cost</th>
            <th scope="col">Stopages in Map</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{guideline.transportName}</td>
            <td>{guideline.transportCategory}</td>
            <td>Start Stopage</td>
            <td>End Stopage</td>
            <td>{guideline.totalCost} BDT</td>
            <td><div id='transport-guideline-map'>
              <RouteCustomMap setPositions={(e) => setPositions(e)} stopages={guideline.stopages} />
            </div></td>
          </tr>
        </tbody>
      </table>
    )
  }

  const renderComponent = () => {
    switch (componentNo) {
      case 1:
        return (
          <center>
            <h2>Step {componentNo} - Enter your source</h2>
            <div id='transport-guideline-map'>
              <CustomMap setPositions={(e) => setPositions(e)} />
            </div>
            {SourceInput()}
          </center>
        );

      case 2:
        return (
          <center>
            <h2>Step {componentNo} - Enter your destination</h2>
            <div id='transport-guideline-map'>
              <CustomMap setPositions={(e) => setPositions(e)} />
            </div>
            {DestinationInput()}
          </center>
        );

      case 3:
        return (
          <center>
            <h2 className='text-center'>Details for you</h2>
            <div id='transport-guideline-map'>
              <CustomMap setPositions={(e) => setPositions(e)} />
            </div>
            {ViewInputs()}
          </center>
        );
      case 4:
        return (
          <center>
            <h2 className='text-center'>Details for you</h2>
            <div id='transport-guideline-map'>
              <CustomMap setPositions={(e) => setPositions(e)} />
            </div>
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