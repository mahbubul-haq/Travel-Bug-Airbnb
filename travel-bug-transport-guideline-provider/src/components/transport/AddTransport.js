import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomMap from './map/CustomMap';
import './map/CustomMap.css';
const AddTransport = () => {
  const [categories, setCategories] = useState([]);
  const [slots, setSlots] = useState([]);
  const [count, setCount] = useState(0);
  const [positions, setPositions] = useState([]);
  
  let navigate = useNavigate();

  useEffect(() => {

    fetchData();
  }, []);
 
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
  return (
    <center>
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
              <div className="form-group">
                <label htmlFor="exampleFormControlInput1"><h4>Routes</h4></label>
                <CustomMap setPositions={()=>setPositions()}/>
                </div>
        </form>
      </div>
    </center>
  )

}

export default AddTransport
