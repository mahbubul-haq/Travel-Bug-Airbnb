import React, { useEffect, useState } from 'react';
import CustomMap from './map/CustomMap';
import './map/CustomMap.css';
import RouteCustomMap from './map/RouteCustomMap';
import { Navigate } from 'react-router-dom';

const TransportGuidelines = () => {
  const [positions, setPositions] = useState([]);
  const [componentNo, setComponentNo] = useState(1);
  const [source, setSource] = useState({ long: ' ? ', lat: ' ? ' });
  const [destination, setDestination] = useState({ long: ' ? ', lat: ' ?' });
  const [guidelineData, setGuidelineData] = useState([]);

  const [tempLocationName, setTempLocationName] = useState('');

  const GEOCODE_URL =
  "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode?f=pjson&langCode=EN&location=";

  const reverseGeoCoding = async (coordinates) => {
    console.log("coordinates", coordinates);
    // Here the coordinates are in LatLng Format
    // if you wish to use other formats you will have to change the lat and lng in the fetch URL
    const data = await (
      await fetch(GEOCODE_URL + `${coordinates[1]},${coordinates[0]}`)
    ).json();
    console.log("did we get it?", data.address);

    const addressLabel =
      typeof data.address !== "undefined"
        ? data.address.LongLabel
        : "Location name not found";
    console.log(addressLabel);
    return await addressLabel;
  };

  useEffect(() => {
    (async () => {
      const data = await reverseGeoCoding([23.4444, 90.00]);
      console.log("location name ", data);
    })()
    
  }, []);

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
    console.log("My stopages", typeof (json.guideline[0].stopages), json.guideline[0].stopages);

    const temp = json.guideline;

    for(let i = 0; i < json.guideline.length; i++){
        const srcdata = await reverseGeoCoding([json.guideline[i].source.long, json.guideline[i].source.lat]);
        temp[i].sourceLocationName = srcdata;

        const destdata = await reverseGeoCoding([json.guideline[i].destination.long, json.guideline[i].destination.lat]);
        temp[i].destinationLocationName = destdata;
    }
    console.log("temp", temp);
    setGuidelineData(temp);
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
            <td>{guideline.sourceLocationName}</td>
            <td>{guideline.destinationLocationName}</td>
            <td>{guideline.totalCost} BDT</td>
            <td rowSpan={guideline.timeSlots.length + 2}><div id='transport-guideline-map'>
              <RouteCustomMap setPositions={(e) => setPositions(e)} source={guideline.source} destination={guideline.destination} stopages={guideline.stopages} />
            </div></td>
          </tr>
          <tr>
            <th scope="col">Time Slot</th>
            <th scope="col">Start Time</th>
            <th scope="col">Arrival Time</th>
          </tr>

            {guideline.timeSlots.map((time, index) => {
              return (
                <tr key={index}>
                <td>{index + 1}</td>
                <td> {time.start} {time.startTag.toLowerCase()} </td>
                <td> {time.end} {time.endTag.toLowerCase()} </td>
                </tr>
              )
            })}
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
      {localStorage.getItem("token") ? renderComponent() : <Navigate to="/login" />}
    </div>
  )
}

export default TransportGuidelines;