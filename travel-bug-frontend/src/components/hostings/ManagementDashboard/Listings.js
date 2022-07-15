import React, { useContext } from 'react';
import './style.css';
import hostingContext from '../../../context/hostings/hostingContext';
import HostitemCard from './HostitemCard';

const Listings = () => {
  const context = useContext(hostingContext);
  const { myHostings, setMyHostings } = context;
  return (
    <div className="container">
    <div className='row my-3'>
      <h2>My Listings</h2>
      {myHostings.experienceHosting.map((hostItem) => {
        return <HostitemCard hostItem={hostItem} />;
      })}
    </div>
    </div>
  )
}

export default Listings
