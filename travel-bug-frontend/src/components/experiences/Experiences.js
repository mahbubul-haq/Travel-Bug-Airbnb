import React, { useContext, useEffect, useState } from "react";
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import "../../App.css";
import "./search.css";

import experienceContext from "../../context/experiences/experienceContext";

const Experiences = () => {
  const context = useContext(experienceContext);
  const { experiences, getAllExperiences } = context;

  const [search, setSearch] = useState({ location: '', checkin: '', checkout: '', lguests: 0 });
  const [filteredExperiences, setFilteredExperiences] = useState(experiences);


  useEffect(() => {
    getAllExperiences();
    console.log("experiences", experiences);
  }, []);

  const filterExperiences = (val) => {
    let temp = [];
    for (let i = 0; i < experiences.length; i++) {
      if (experiences[i].hostingTitle.toLowerCase().includes(val.toLowerCase())) {
        temp.push(experiences[i]);
      }
    }
    setFilteredExperiences(temp);
  }

  const onChange = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
    console.log("my search here = ", e.target.value);
    filterExperiences(e.target.value);
  }

  const renderPage = (list) => {
    return (
      <div className="container">
        <div className='container my-3'>
          <form action="" method="get">
            <div className="product-search">
              <div className="search-element">
                <label className="search-label">What is Your Checkin Date?</label>
                <input className="search-input" type="date" autocomplete="on" name="checkin" />
              </div>
              <div className="search-element">
                <label className="search-label">What is Your Checkout Date?</label>
                <input className="search-input" type="date" autocomplete="on" name="checkout" />
              </div>
              <div className="search-element">
                <label className="search-label">Where to Go?</label>
                <input className="search-input" type="text" placeholder="Enter Your Location" autocomplete="on" name="location" value={search.location} onChange={onChange} />
              </div>
              <div className="search-element">
                <label className="search-label">How Many People?</label>
                <input className="search-input" type="number" placeholder="Enter Your Team Size" autocomplete="on" name="lguests" value={search.lguests} onChange={onChange} />
              </div>
              {/* <Button type="submit" className="search-button">Search</Button> */}
            </div>
          </form>
        </div>
        <br />
        <h2 className="text-center">Experiences</h2>
        <h5 className="text-center">Searching...  Location: {search.location} | Guest No: {search.lguests}</h5>
        <div className="row my-10">
          {list.map((experience, index) => (
            <div className="col-lg-4 mb-4">
              <div className="card-style-5 ">
                <img src={experience.hostingPhotos[0]} alt="" className="card-img-top" />
                <div className="card-body">
                  <h5 className="card-title">{experience.hostingTitle}</h5>
                  <p className="card-text">Location (calculated from map)</p>
                  <div className="card-text d-flex w-100 justify-content-between">
                    <h8 className="mb-1"> Cost: {experience.totalCost}</h8>
                    <Link to={`/experiences/${experience._id}`} >
                      <h1 ><strong> &#10132;</strong>
                      </h1>
                    </Link>

                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div>
      {search.location === '' ? renderPage(experiences) : renderPage(filteredExperiences)}
    </div>

  );
};

export default Experiences;
