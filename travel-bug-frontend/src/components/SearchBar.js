import React from 'react'
import { Button } from 'react-bootstrap'
import './search.css'
const SearchBar = () => {
  return (
    <div className='container'>
     <form action="" method="get">
  <div className="product-search">
      <div className="search-element">
        <label className="search-label">What is Your Checkin Date?</label>
        <input className="search-input" type="date" autocomplete="on"  name="checkin"/>
      </div>
      <div className="search-element">
        <label className="search-label">What is Your Checkout Date?</label>
        <input className="search-input" type="date"  autocomplete="on" name="checkout"/>
      </div>
      <div className="search-element">
        <label className="search-label">Where to Go?</label>
        <input className="search-input" type="text"  placeholder="Enter Your Location" autocomplete="on" name="location"/>
      </div>
      <div className="search-element">
        <label className="search-label">How Many People?</label>
        <input className="search-input" type="number"  placeholder="Enter Your Team Size"autocomplete="on" name="lguests"/>
      </div>
      <Button type="submit" className="search-button">Search</Button>
  </div>
</form>
    </div>
  )
}

export default SearchBar
