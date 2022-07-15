import React from 'react';
import { Link } from "react-router-dom";
import './style.css';
const Listings = () => {
  return (
    
    <div className='container'>
      <br/><br/>
     <ul class="list-group">
              <Link to="#" class="list-group-item list-group-item-primary">
                <div class="d-flex w-100 justify-content-between">
                  <h2 className="mb-1">Hosting Title</h2>
                  <small>date</small>
                </div>
                <p class="mb-1"><h6>location </h6></p>
              </Link>
              <Link to="#" class="list-group-item list-group-item-primary">
                <div class="d-flex w-100 justify-content-between">
                  <h2 className="mb-1">Hosting Title</h2>
                  <small>date</small>
                </div>
                <p class="mb-1"><h6>location </h6></p>
              </Link>
              <Link to="#" class="list-group-item list-group-item-primary">
                <div class="d-flex w-100 justify-content-between">
                  <h2 className="mb-1">Hosting Title</h2>
                  <small>date</small>
                </div>
                <p class="mb-1"><h6>location </h6></p>
              </Link>
              </ul>
            
    </div>
  )
}

export default Listings
