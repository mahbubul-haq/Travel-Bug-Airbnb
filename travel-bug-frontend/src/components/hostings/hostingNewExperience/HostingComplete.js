import React from "react";
import { Link, useNavigate } from "react-router-dom";

import "../cssFiles/HostingComplete.css";
import "../cssFiles/HostingPage1Base.css";

const HostingComplete = (props) => {

  const navigate = useNavigate();
  return (
    <div id="body12">
      <div id="container12">
        <div id="center12">
          <h3 id="header12">Your hosting is complete!</h3>
          <p id="para12">
            Set hosting Availability 
            <Link id="link12"
            to={`/host/experience/${props.hostingId()}`}
            state={{ expId: props.hostingId() }}>
               here 
            </Link>
             and get started!
          </p>
            <button id="butt12" onClick={() => {
              navigate('/hostings');
            }}>Home Page</button>
          
        </div>
      </div>
    </div>
  );
};

export default HostingComplete;
