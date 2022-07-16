import React, { useContext, useEffect } from 'react';
import './style.css';
import hostingContext from '../../../context/hostings/hostingContext';
import HostitemCard from './HostitemCard';
import { useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';

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
      
      <br/><br/>
        <h2>My Listings</h2>
        <Container>
        <ul class="list-group">
         <br/>
        {myHostings.map((hostItem) => {
          return <HostitemCard hostItem={hostItem} />;
        })}
        </ul>
        </Container>
      </div>
  )
}

export default Listings
