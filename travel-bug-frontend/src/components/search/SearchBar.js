import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import './search.css'
const SearchBar = (props) => {
  const [search, setSearch] = useState({ location:'' });

  const onChange = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
    props.setSearch(search);
    props.filterExperiences();
  }

  return (
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
            <input className="search-input" type="number" placeholder="Enter Your Team Size" autocomplete="on" name="lguests" />
          </div>
          {/* <Button type="submit" className="search-button">Search</Button> */}
        </div>
      </form>
    </div>
  )
}

export default SearchBar
