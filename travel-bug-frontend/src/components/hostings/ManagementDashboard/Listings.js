import React, { useContext, useEffect } from 'react';
import './style.css';
import hostingContext from '../../../context/hostings/hostingContext';
import HostitemCard from './HostitemCard';
import { useNavigate } from 'react-router-dom';

const Listings = () => {
  const context = useContext(hostingContext);
  const { myHostings, getAllMyHostings } = context;
  let navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      getAllMyHostings();
    } else {
      navigate('/login');
    }

  }, []);

  return (
    <div className="container">
      <div className='row my-3'>
        <h2>My Listings</h2>
        {myHostings.map((hostItem) => {
          return <HostitemCard hostItem={hostItem} />;
        })}
      </div>
    </div>
  )
}

export default Listings
