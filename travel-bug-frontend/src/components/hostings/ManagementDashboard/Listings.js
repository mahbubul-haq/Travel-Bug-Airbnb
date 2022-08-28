import React, { useContext, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import hostingContext from '../../../context/hostings/hostingContext';
import userContext from "../../../context/user/userContext";
import HostitemCard from './HostitemCard';
import './style.css';


const Listings = () => {
  const context = useContext(hostingContext);
  console.log(context);
  const { myHostings, getAllMyHostings } = context;
  let navigate = useNavigate();
  const context1 = useContext(userContext);
  const {user, getUser} = context1;
  var [hostings, setHostings] = React.useState([]);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      getUser();
      
      
    } else {
      navigate('/login');
    }

    console.log(myHostings);
  }, []);

  useEffect(() => {
    if (user != []) getAllMyHostings();
  }, [user]);

  useEffect(() => {

    console.log(myHostings);
    console.log(user);
    if (myHostings)
        setHostings(myHostings.filter(hosting => {
          if (typeof hosting != "undefined")
            return true;
          else
              return false;
        }));

  } ,[myHostings]);

  return (
    <div className="listings-container">
      <div id="listings-header">My Listings</div>
      <div id="listings-mid">
        <Container>
          <ul class="list-group list-item-listings" id="list-item-listings">
            <br />
            {myHostings.map((hostItem) => {
              return <HostitemCard hostItem={hostItem} />;
            })}
          </ul>
        </Container>
      </div>
    </div>
  );
}

export default Listings
