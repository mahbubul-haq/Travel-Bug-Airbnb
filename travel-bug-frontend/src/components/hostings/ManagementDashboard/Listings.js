import React from 'react';
import { Link } from "react-router-dom";
import './style.css';
const Listings = () => {
  return (
    
    <div className='container'>
      <br/><br/>
     <ul className="list-group">
              <Link to="#" className="list-group-item list-group-item-primary">
                <div className="d-flex w-100 justify-content-between">
                  <h2 className="mb-1">Hosting Title</h2>
                  <small>date</small>
                </div>
                <p className="mb-1"><h6>location </h6></p>
              </Link>
              <Link to="#" className="list-group-item list-group-item-primary">
                <div className="d-flex w-100 justify-content-between">
                  <h2 className="mb-1">Hosting Title</h2>
                  <small>date</small>
                </div>
                <p className="mb-1"><h6>location </h6></p>
              </Link>
              <Link to="#" className="list-group-item list-group-item-primary">
                <div className="d-flex w-100 justify-content-between">
                  <h2 className="mb-1">Hosting Title</h2>
                  <small>date</small>
                </div>
                <p className="mb-1"><h6>location </h6></p>
              </Link>
              </ul>
            
    </div>
  )
}

export default Listings
