import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomMap from './map/CustomMap';
import './map/CustomMap.css';

const AddTransport = () => {
  const [transportCategory, setTransportCategory] = useState("Bus");
  const [transportName, setTransportName] = useState("untitled");
  const [categories, setCategories] = useState([]);
  const [slots, setSlots] = useState([]);
  const [count, setCount] = useState(0);
  const [positions, setPositions] = useState([]);
  const [stopages, setStopages] = useState([]);

  const [componentNo, setComponentNo] = useState(1);
  const [source, setSource] = useState({ long: ' ? ', lat: ' ? ' });
  const [destination, setDestination] = useState({ long: ' ? ', lat: ' ?' });
  const [totalCost, setTotalCost] = useState(0);

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
    if (positions.length > 2) {
      //let stopages = [];
      for (let i = 2; i < positions.length; i++) {
        if (stopages[i - 2] !== null || typeof stopages[i - 2] !== "undefined") {
          stopages[i - 2].long = positions[i][0];
          stopages[i - 2].lat = positions[i][1];
        }
        else {
          stopages[i - 2] = { long: positions[i][0], lat: positions[i][1], cost: 0 };
        }
        setStopages(stopages);
        console.log(stopages);

      }
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

  const setComponent = (componentNo) => {
    setComponentNo(componentNo);

  }

  const handleFinish = async () => {
    const hostAddress = 'http://localhost:5000';
    const response = await fetch(`${hostAddress}/transport/addtransport`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({
        transportName: transportName,
        transportCategory: transportCategory,
        timeSlots: slots,
        source: source,
        destination: destination,
        totalCost: parseInt(totalCost),
        stopages: stopages,
      })
    });
    const data = await response.json();
    console.log(data);

    if(data.success){
      alert("Your Input is Successfully Added");
      navigate('/addtransport/completed');
    }
  }

  const SourceInput = () => {
    return (
      <div>
        <h5>Enter your source </h5>
        <br />
        <div className='container'>
          <form>
            <div className="form-group">

              <input type="text" className="form-control" placeholder=" Enter Source" />
            </div>
          </form>
        </div>
        <br />
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


    return (
      <div>
        <h5>Enter your Destination  </h5>
        <br />
        <div className='container'>
          <form>
            <div className='row'>
              <div className='col'>
                <div className="form-group">

                  <input type="text" className="form-control" placeholder=" Enter Destination" />
                </div>
              </div>
              <div className='col'>
                <div className="form-group">

                  <input type="number" className="form-control" placeholder="Enter Total Cost" onChange={(e) => { setTotalCost(e.target.value); }} />

                </div>
              </div>
            </div>
          </form>
        </div>
        <br />
        {/* <OSM setLatLong={(val)=>{setPosition(val)}} /> */}
        <button type="button" className="btn btn-primary btn-lg mx-4"
          onClick={
            () => {
              prevComponent();
            }
          }>
          Prev
        </button>
        <button type="button" className="btn btn-primary btn-lg mx-4"
          onClick={
            () => {
              //let stopages = [...stopages]; 
              stopages.push({ long: '?', lat: '?', cost: 0 });
              setStopages(stopages);
              nextComponent();
            }
          }>
          Add Stopage
        </button>
        <button type="button" className="btn btn-primary btn-lg mx-4"
          onClick={
            () => {handleFinish();}
          }>
          Finish
        </button>
      </div>
    )
  }
  const StopageInput = (index) => {


    return (
      <div>
        <h5>Enter your {index}th Stopage  </h5>

        <br />
        <div className='container'>
          <form>
            <div className='row'>
              <div className='col'>
                <div className="form-group">

                  <input type="text" className="form-control" placeholder="Enter Stopage" />
                </div>
              </div>
              <div className='col'>
                <div className="form-group">

                  <input type="number" className="form-control" placeholder="Enter Total Cost" onChange={(e) => { let stopagesArr = [...stopages]; console.log(stopagesArr); stopagesArr[index - 1].cost = parseInt(e.target.value); setStopages(stopagesArr); }} />
                </div>
              </div>
            </div>
          </form>
        </div>
        <br />
        {/* <OSM setLatLong={(val)=>{setPosition(val)}} /> */}
        <button type="button" className="btn btn-primary btn-lg mx-4"
          onClick={
            () => {
              prevComponent();
            }
          }>
          Prev
        </button>
        <button type="button" className="btn btn-primary btn-lg mx-4"
          onClick={
            () => {
              // let stopages = [...stopages]; 
              stopages.push({ long: '?', lat: '?', cost: 0 });
              setStopages(stopages);
              nextComponent();
            }
          }>
          Add Stopage
        </button>
        <button type="button" className="btn btn-primary btn-lg mx-4"
          onClick={handleFinish}>
          Finish
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
            <input type="text" className="form-control" id="exampleFormControlInput" placeholder="Transport Name" onChange={(e) => { setTransportName(e.target.value) }} />

          </div>
          <br /><br />
          <div className="form-group">
            <label htmlFor="category"><h4>Transport Category</h4></label>
            <select className="form-control" onChange={(e) => { setTransportCategory(e.target.value); console.log(transportCategory) }}>
              {categories.map(category => (
                <option key={category._id} value={category.categoryName}>{category.categoryName}</option>
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


            <CustomMap setPositions={(e) => setPositions(e)} />
            <br /><br />
            {SourceInput()}
            <br /><br /><br /><br />

          </center>
        );

      case 2:
        return (
          <center>
            {MainComponent()}


            <CustomMap setPositions={(e) => setPositions(e)} />
            <br /><br />
            {DestinationInput()}
            <br /><br /><br /><br />
          </center>

        );
      //defa
      default:
        return (
          <center>
            {MainComponent()}

            <CustomMap setPositions={(e) => setPositions(e)} />
            <br /><br />
            {StopageInput(componentNo - 2)}
            <br /><br /><br /><br />
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
