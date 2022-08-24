import React from "react";
import "../cssFiles/EditGuestRequirements.css";

const EditGuestRequirements = (props) => {

  const ages = [];
  for (let i = 1; i < 150; i++) {
    ages.push(i);
  }
  const group_sizes = [];
  for (let i = 1; i < 100; i++) {
    group_sizes.push(i);
  }

  return (
    <table id="page8table-edit">
      <tbody className="tbody-requirements-edit">
        <tr className="requiremnts-tr">
          <td className="requirements-edit-td">
            <p className="requirements-edit-headers">Minimum age requirement*</p>
            <select
              className="requirements-edit"
              onChange={(event) => {
                props.setExperience({
                  minAge: event.target.value,
                });
              }}
              value={props.experience().minAge}
            >
              {ages.map((age) => {
                return (
                  <option key={age} value={age}>
                    {age}
                  </option>
                );
              })}
            </select>
            {/* <input
        
                      type="number"
                      className="requirements-edit"
                      onChange={(e) =>
                        props.setMinAgeRequirement(e.target.value)
                      }
                      value={props.minAgeRequirement()}
                    ></input> */}
          </td>
        </tr>
        <tr className="requiremnts-tr">
          <td className="requirements-edit-td">
            <p className="requirements-edit-headers">Maximum group size*</p>

            <select
              className="requirements-edit"
              onChange={(event) => {
                props.setExperience({
                  maxGroupSize: event.target.value,
                });
              }}
              value={props.experience().maxGroupSize}
            >
              {group_sizes.map((size) => {
                return (
                  <option key={size} value={size}>
                    {size}
                  </option>
                );
              })}
            </select>

            {/* <input
                      type="number"
                      className="requirements-edit"
                      onChange={(e) => props.setMaxGroupSize(e.target.value)}
                      value={props.maxGroupSize()}
                    ></input> */}
          </td>
        </tr>
        <tr className="requiremnts-tr">
          <td className="requirements-edit-td">
            <p className="requirements-edit-headers">Items guests need to bring</p>

            <textarea
              type="text"
              className="requirements-edit"
              placeholder="item1
item2"
              onChange={(e) => {
                props.setExperience({
                  itemsToBring: [e.target.value],
                });
              }}
              value={props.experience().itemsToBring[0]}
            ></textarea>
          </td>
        </tr>
        <tr className="requiremnts-tr">
          <td className="requirements-edit-td">
            <p className="requirements-edit-headers">
              Additional requirements for guests
            </p>

            <textarea
              type="text"
              className="requirements-edit"
              placeholder="E.g. No smoking,
Guests should be comfortable around wild animals"
              onChange={(e) =>
                props.setExperience({
                  additionalRequirements: [e.target.value],
                })
              }
              value={props.experience().additionalRequirements[0]}
            ></textarea>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default EditGuestRequirements;
