import React from "react";
import "../App.css";
import greece from "../images/greece.jpg";
import maldives from "../images/maldives.jpg";
import paragliding from "../images/paragliding.jpg";
const Experiences = () => {
  return (
    <div>
      <div className="container">
        <br />
        <br />
        <div className="row my-10">
          <div className="col-lg-4 mb-4">
            <div className="card-style-5">
              <img src={paragliding} alt="" className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">Location</h5>
                <p className="card-text">Durotto (calculated from map)</p>
                <small className="card-text">
                  <h8>Cost</h8>
                </small>
              </div>
            </div>
          </div>
          <div className="col-lg-4 mb-4">
            <div className="card-style-5">
              <img src={maldives} alt="" className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">Location</h5>
                <p className="card-text">Durotto (calculated from map)</p>
                <small className="card-text">
                  <h8>Cost</h8>
                </small>
              </div>
            </div>
          </div>
          <div className="col-lg-4 mb-4">
            <div className="card-style-5">
              <img src={greece} alt="" className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">Location</h5>
                <p className="card-text">Durotto (calculated from map)</p>
                <small className="card-text">
                  <h8>Cost</h8>
                </small>
              </div>
            </div>
            </div>
            <div className="col-lg-4 mb-4">
            <div className="card-style-5">
              <img src={paragliding} alt="" className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">Location</h5>
                <p className="card-text">Durotto (calculated from map)</p>
                <small className="card-text">
                  <h8>Cost</h8>
                </small>
              
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experiences;
