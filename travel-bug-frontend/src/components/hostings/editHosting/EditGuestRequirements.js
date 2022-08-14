import React from "react";
import "../cssFiles/EditGuestRequirements.css";
import "../cssFiles/HostingGuestRequirements.css";

const EditGuestRequirements = (props) => {
  return (
    <div>
      <br></br>
      <p
        style={{ marginBottom: "5px", marginLeft: "50px", fontWeight: "bold" }}
      >
        Change values and save
      </p>
      <br></br>
      <div id="edit-guest-requirements">
        <table id="edit-page8table">
          <tbody>
            <tr>
              <td>
                Minimum age requirement
                <br></br>
                <input
                  type="number"
                  id="edit-requiremnents"
                  onChange={(e) =>
                    props.setExperience({
                      minAge: Math.max(parseInt(e.target.value), 0),
                    })
                  }
                  value={props.experience().minAge}
                ></input>
              </td>
            </tr>
            <tr>
              <td>
                Maximum group size
                <br></br>
                <input
                  type="number"
                  id="edit-requiremnents"
                  onChange={(e) =>
                    props.setExperience({
                      maxGroupSize: Math.max(parseInt(e.target.value), 1),
                    })
                  }
                  value={props.experience().maxGroupSize}
                ></input>
              </td>
            </tr>
            <tr>
              <td>
                Items guests need to bring
                <br></br>
                <input
                  type="text"
                  id="edit-requiremnents"
                  onChange={(e) =>
                    props.setExperience({ itemsToBring: [e.target.value] })
                  }
                  value={props.experience().itemsToBring[0]}
                ></input>
              </td>
            </tr>
            <tr>
              <td>
                Additional requirements (optional)
                <br></br>
                <input
                  type="text"
                  id="edit-requiremnents"
                  onChange={(e) =>
                    props.setExperience({
                      additionalRequirements: [e.target.value],
                    })
                  }
                  value={props.experience().additionalRequirements[0]}
                ></input>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EditGuestRequirements;
