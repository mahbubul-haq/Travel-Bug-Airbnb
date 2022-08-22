import React from "react";
import { useNavigate } from "react-router-dom";

import "../cssFiles/HostingComplete.css";
import "../cssFiles/HostingPage1Base.css";

const HostingError = (props) => {

    const navigate = useNavigate();

  return (
    <div id="body13">
      <div id="container13">
        <div id="center13">
          <h3 id="header13">Error occured during hosting!</h3>
          <p id="para13">Hosting information is not saved.</p>

          <button
            id="butt13"
            onClick={() => {
                navigate("/");
            }}
          >
            Home Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default HostingError;
