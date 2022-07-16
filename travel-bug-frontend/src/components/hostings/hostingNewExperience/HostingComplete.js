import React from "react";

import { Link } from "react-router-dom";
import "../cssFiles/HostingComplete.css";
import "../cssFiles/HostingPage1Base.css";

const HostingComplete = (props) => {

    return (
      <div id="body12">
        <div id="container12">
          <div id="center12">
            <h3 id="header12">Your hosting is complete!</h3>
            <p id="para12">Check your listing in your home page.</p>
            <Link to={'/host/home'}><button id="butt12">Home Page</button></Link>
          </div>
        </div>
      </div>
    );
}

export default HostingComplete
