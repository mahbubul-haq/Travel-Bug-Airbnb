import HostingContext from "./hostingContext";
import { useState } from "react";

const HostingState = (props) => {
    const myHostingsInitial = {
        "experienceHosting": [
          {
            "_id": "62d05584c3357ae729d0d491",
            "hostingTitle": "Keokradong Tour",
            "description": "Bandarban to Bogalake to Keokradong to Nilachol",
            "hostingDate": "2022-07-14T17:42:28.712Z",
            "draft": true,
            "totalCost": 25000,
            "itemsToBring": [],
            "maxGroupSize": 5,
            "minAge": 20,
            "additionalRequirements": [],
            "hostingPhotos": [],
            "host": "62c69f9551927847d1cdbcc8",
            "categories": [],
            "activities": [],
            "__v": 0,
            "individualOrTeam": "individual"
          },
          {
            "_id": "62d06411c2710259b39b1a21",
            "hostingTitle": "Keokradong Tour",
            "description": "Bandarban to Bogalake to Keokradong to Nilachol",
            "hostingDate": "2022-07-14T18:44:33.723Z",
            "draft": true,
            "totalCost": 25000,
            "itemsToBring": [],
            "maxGroupSize": 5,
            "minAge": 20,
            "additionalRequirements": [],
            "hostingPhotos": [],
            "host": "62c69f9551927847d1cdbcc8",
            "categories": [],
            "activities": [],
            "__v": 0,
            "individualOrTeam": "individual"
          },
          {
            "_id": "62d06434c2710259b39b1a23",
            "hostingTitle": "Keokradong Tour",
            "description": "Bandarban to Bogalake to Keokradong to Nilachol",
            "hostingDate": "2022-07-14T18:45:08.111Z",
            "draft": true,
            "totalCost": 25000,
            "itemsToBring": [],
            "maxGroupSize": 5,
            "minAge": 20,
            "additionalRequirements": [],
            "hostingPhotos": [],
            "host": "62c69f9551927847d1cdbcc8",
            "categories": [],
            "activities": [],
            "__v": 0,
            "individualOrTeam": "individual"
          },
          {
            "_id": "62d06435c2710259b39b1a27",
            "hostingTitle": "Keokradong Tour",
            "description": "Bandarban to Bogalake to Keokradong to Nilachol",
            "hostingDate": "2022-07-14T18:45:09.323Z",
            "draft": true,
            "totalCost": 25000,
            "itemsToBring": [],
            "maxGroupSize": 5,
            "minAge": 20,
            "additionalRequirements": [],
            "hostingPhotos": [],
            "host": "62c69f9551927847d1cdbcc8",
            "categories": [],
            "activities": [],
            "__v": 0,
            "individualOrTeam": "individual"
          },
          {
            "_id": "62d06435c2710259b39b1a27",
            "hostingTitle": "Keokradong Tour",
            "description": "Bandarban to Bogalake to Keokradong to Nilachol",
            "hostingDate": "2022-07-14T18:45:09.323Z",
            "draft": true,
            "totalCost": 25000,
            "itemsToBring": [],
            "maxGroupSize": 5,
            "minAge": 20,
            "additionalRequirements": [],
            "hostingPhotos": [],
            "host": "62c69f9551927847d1cdbcc8",
            "categories": [],
            "activities": [],
            "__v": 0,
            "individualOrTeam": "individual"
          },
          {
            "_id": "62d06435c2710259b39b1a27",
            "hostingTitle": "Keokradong Tour",
            "description": "Bandarban to Bogalake to Keokradong to Nilachol",
            "hostingDate": "2022-07-14T18:45:09.323Z",
            "draft": true,
            "totalCost": 25000,
            "itemsToBring": [],
            "maxGroupSize": 5,
            "minAge": 20,
            "additionalRequirements": [],
            "hostingPhotos": [],
            "host": "62c69f9551927847d1cdbcc8",
            "categories": [],
            "activities": [],
            "__v": 0,
            "individualOrTeam": "individual"
          }
        ],
        "user": {
          "emergencyContacts": [],
          "_id": "62c69f9551927847d1cdbcc8",
          "email": "kawshik.kumar.paul@gmail.com",
          "firstName": "Kawshik",
          "lastName": "Paul",
          "__v": 0
        }
      }
    
    const [myHostings, setMyHostings] = useState(myHostingsInitial);

    return(
        <HostingContext.Provider value={{myHostings, setMyHostings}}>
            {props.children}
        </HostingContext.Provider>
    )
}

export default HostingState;