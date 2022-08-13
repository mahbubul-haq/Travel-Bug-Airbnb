import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomMap from './map/CustomMap';
import './map/CustomMap.css';

const AddTransport = () => {
  const [categories, setCategories] = useState([]);
  const [slots, setSlots] = useState([]);
  const [count, setCount] = useState(0);
  const [positions, setPositions] = useState([]);

  const [componentNo, setComponentNo] = useState(1);
  const [source, setSource] = useState({ long: ' ? ', lat: ' ? ' });
  const [destination, setDestination] = useState({ long: ' ? ', lat: ' ?' });

  let navigate = useNavigate();

  useEffect(() => {

    fetchData();
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
  const hostAddress = 'http://localhost:5000';
  const fetchData = async () => {
    const response = await fetch(`${hostAddress}/transport/categories`, {
      method: "GET",


    });
    const data = await response.json();
    console.log(data);
    setCategories(data);


  }

  const addSlot = (e) => {

    console.log("Clicked");
    let newSlots = [...slots];

    newSlots.push({
      start: 0,
      end: 0,
      startTag: "AM",
      endTag: "AM",
    });
    setSlots(newSlots);
    setCount(count + 1);
    navigate('/addtransport');
    console.log(slots);

  }

  const nextComponent = () => {
    setComponentNo(componentNo + 1);
  }

  const prevComponent = () => {
    setComponentNo(componentNo - 1);
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
        <h5>Enter your source {source.long} , {source.lat}</h5>
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
        <h3>Enter your Destination  {destination.long} , {destination.lat}</h3>
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

  const MainComponent = () => {
    return (
      <div className='container'>
        <br /><br />
        <form>

          <div className="form-group">
            <label htmlFor="exampleFormControlSelect1"><h4>Transport Name</h4></label>
            <input type="text" className="form-control" id="exampleFormControlInput" placeholder="Transport Name" />

          </div>
          <br /><br />
          <div className="form-group">
            <label htmlFor="category"><h4>Transport Category</h4></label>
            <select className="form-control">
              {categories.map(category => (
                <option key={category._id} value={category._id}>{category.categoryName}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <br /><br />
            <label htmlFor="timeslots"><h4>Time Slots</h4></label>
            <br />
            {Array(count).fill(0).map((_, i) => (

              <div className="row my-2">
                <div className="col">
                  <input type="number" className="form-control" placeholder="Start Time" onChange={(e) => { let slotsArr = [...slots]; slotsArr[i] = { ...slotsArr[i], start: e.target.value }; setSlots(slotsArr); }} />
                </div>
                <div className="col">



                  <select className="form-control" id="tag" onChange={(e) => { let slotsArr = [...slots]; slotsArr[i] = { ...slotsArr[i], startTag: e.target.value }; setSlots(slotsArr); }}>
                    <option value="AM">AM</option>
                    <option value="pM">PM</option>
                  </select>
                </div>
                <div className="col">
                  <input type="number" className="form-control" placeholder="End Time" onChange={(e) => { let slotsArr = [...slots]; slotsArr[i] = { ...slotsArr[i], end: e.target.value }; setSlots(slotsArr); }} />
                </div>
                <div className="col">
                  <select className="form-control" onChange={(e) => { let slotsArr = [...slots]; slotsArr[i] = { ...slotsArr[i], endTag: e.target.value }; setSlots(slotsArr); }}>
                    <option value="AM">AM</option>
                    <option value="pM">PM</option>
                  </select>
                </div>
              </div>
            ))}
            <br />
            <button type="button" className="btn btn-outline-info" onClick={addSlot}><h6>&#43; Add a Slot</h6></button>

          </div>
          <br />
        </form>
      </div>
    )
  }

  const renderComponent = () => {
    switch (componentNo) {
      case 1:
        return (
          <center>
            {MainComponent()}
            <h2>Step {componentNo}</h2>
            <CustomMap setPositions={(e) => setPositions(e)} />
            {SourceInput()}
          </center>
        );

      case 2:
        return (
          <center>
            {MainComponent()}
            <h2>Step {componentNo}</h2>
            <CustomMap setPositions={(e) => setPositions(e)} />
            {DestinationInput()}
          </center>
        );

      case 3:
        return (
          <center>
            {MainComponent()}
            <h2 className='text-center'>Details for you</h2>
            <CustomMap setPositions={(e) => setPositions(e)} />
          </center>
        );
    };
  }

  return (
    <div className='container'>
      {renderComponent()}
    </div>

  )



}

export default AddTransport
