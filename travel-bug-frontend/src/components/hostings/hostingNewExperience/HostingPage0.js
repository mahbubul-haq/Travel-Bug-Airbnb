import React from 'react';

import '../cssFiles/HostingPage1.css';
import '../cssFiles/HostingPage1Base.css';

const HostingPage1 = (props) => {
  
      return (
        <div id="body">
          <div id="container">
            <div id="left0">
                Travel Bug is an amazing place to Host
                <div id="left00">You can host anything, anywhere!</div>
                </div>
            
            <div id="right">
              <div id="top">
                
                
              </div>

              <div id="middle">
                
              </div>

              <div id="bottom">
                <button id="backButton" onClick={props.prevPage}>Back</button>

                <button id="nextButton" onClick={props.nextPage}>Next</button>
              </div>
            </div>
          </div>
        </div>
      );
    
}

export default HostingPage1
