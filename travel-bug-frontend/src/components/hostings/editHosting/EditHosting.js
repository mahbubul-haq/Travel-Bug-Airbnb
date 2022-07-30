import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../cssFiles/EditHosting.css";

const EditHosting = (props) => {
  //const {hostingId} = useParams();

  const [experience, setExperience] = useState({
    hostingTitle: "",
    description: "",
    hostingDate: "",
    category: "",
    subCategory: "",
    totalCost: "",
    maxGroupSize: "",
    minAge: "",
    itemsToBring: [""],
    hostingDuration: { days: "", hours: "" },
    hostAvailability: { start: "", end: "" },
    maxRefundDays: "",
    partialPayAllowed: "",
    additionalRequirements: [""],
    hostingPhotos: [""],
    draft: "",
    individualOrTeam: "",
    location: "",
  });
  const [edit, setEdit] = useState(false);

  const { hostingId } = useLocation().state;
  //console.log(hostingId);

  useEffect(() => {
    fetch(`http://localhost:5000/experience/hostingid/${hostingId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) return res;
        else {
          throw new Error("Something went wrong");
        }
      })
      .then((res) => {
        //console.log(res.json());
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setExperience(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const setexperience = (obj) => {
    setExperience((prevState) => {
      return {
        ...prevState,
        ...obj,
      };
    });
  };

  const showTitle = () => {
    if (edit) {
      return (
        <input
          className="editTitle"
          value={experience.hostingTitle}
          onChange={(e) => setexperience({ hostingTitle: e.target.value })}
        ></input>
      );
    } else {
      return <h1 className="showTitle">{experience.hostingTitle}</h1>;
    }
  };

  const showDescription = () => {
    if (edit) {
      return (
        <textarea
          className="editDescription"
          value={experience.description}
          onChange={(e) => setexperience({ description: e.target.value })}
        ></textarea>
      );
    } else {
      return <p className="showDescription">{experience.description}</p>;
    }
  };

  const showTotalCost = () => {
    if (edit) {
      return (
        <input
          className="editTotalCost"
          value={experience.totalCost}
          onChange={(e) => setexperience({ totalCost: e.target.value })}
        ></input>
      );
    } else {
      return <p className="showTotalCost">{experience.totalCost}</p>;
    }
  };

  const showAdditionalRequirements = () => {
    if (edit) {
      return (
        <input
          className="editAdditionalRequirements"
          value={experience.additionalRequirements[0]}
          onChange={(e) =>
            setexperience({ additionalRequirements: [e.target.value] })
          }
        ></input>
      );
    } else {
      return (
        <p className="showAdditionalRequirements">
          {experience.additionalRequirements[0]}
        </p>
      );
    }
  };

  const showIndividualOrTeam = () => {
    if (edit) {
      return (
        <input
          className="editIndividualOrTeam"
          value={experience.individualOrTeam}
          onChange={(e) => setexperience({ individualOrTeam: e.target.value })}
        ></input>
      );
    } else {
      return (
        <p className="showIndividualOrTeam">{experience.individualOrTeam}</p>
      );
    }
  };
  const showPartialPayAllowed = () => {
    if (edit) {
      return (
        <input
          className="editPartialPayAllowed"
          value={experience.partialPayAllowed}
          onChange={(e) => setexperience({ partialPayAllowed: e.target.value })}
        ></input>
      );
    } else {
      return (
        <p className="showPartialPayAllowed">{experience.partialPayAllowed}</p>
      );
    }
  };
  const showMaxGroupSize = () => {
    if (edit) {
      return (
        <input
          className="editMaxGroupSize"
          value={experience.maxGroupSize}
          onChange={(e) => setexperience({ maxGroupSize: e.target.value })}
        ></input>
      );
    } else {
      return <p className="showMaxGroupSize">{experience.maxGroupSize}</p>;
    }
  };
  const showMinAge = () => {
    if (edit) {
      return (
        <input
          className="editMinAge"
          value={experience.minAge}
          onChange={(e) => setexperience({ minAge: e.target.value })}
        ></input>
      );
    } else {
      return <p className="showMinAge">{experience.minAge}</p>;
    }
  };
  const showItemsToBring = () => {
    if (edit) {
      return (
        <input
          className="editItemsToBring"
          value={experience.itemsToBring[0]}
          onChange={(e) => setexperience({ itemsToBring: [e.target.value] })}
        ></input>
      );
    } else {
      return <p className="showItemsToBring">{experience.itemsToBring[0]}</p>;
    }
  };

  const showMaxRefundDays = () => {
    if (edit) {
      return (
        <input
          className="editMaxRefundDays"
          value={experience.maxRefundDays}
          onChange={(e) => setexperience({ maxRefundDays: e.target.value })}
        ></input>
      );
    } else {
      return <p className="showMaxRefundDays">{experience.maxRefundDays}</p>;
    }
  };

  const hostingDurationDays = () => {
    if (edit) {
      return (
        <input
          className="editHostingDurationDays"
          value={experience.hostingDuration.days}
          onChange={(e) =>
            setexperience({
              hostingDuration: {
                days: e.target.value,
                hours: experience.hostingDuration.hours,
              },
            })
          }
        ></input>
      );
    } else {
      return (
        <p className="showHostingDurationDays">
          {experience.hostingDuration.days}
        </p>
      );
    }
  };

  const hostingDurationHours = () => {
    if (edit) {
      return (
        <input
          className="editHostingDurationHours"
          value={experience.hostingDuration.hours}
          onChange={(e) =>
            setexperience({
              hostingDuration: {
                days: experience.hostingDuration.days,
                hours: e.target.value,
              },
            })
          }
        ></input>
      );
    } else {
      return (
        <p className="showHostingDurationHours">
          {experience.hostingDuration.hours}
        </p>
      );
    }
  };

  const showHostAvailabilityStart = () => {
    if (edit) {
      return (
        <input
          className="editHostAvailabilityStart"
          value={experience.hostAvailability.start}
          onChange={(e) =>
            setexperience({
              hostAvailability: {
                start: e.target.value,
                end: experience.hostAvailability.end,
              },
            })
          }
        ></input>
      );
    } else {
      return (
        <p className="showHostAvailabilityStart">
          {experience.hostAvailability.start}
        </p>
      );
    }
  };

  const showHostAvailabilityEnd = () => {
    if (edit) {
      return (
        <input
          className="editHostAvailabilityEnd"
          value={experience.hostAvailability.end}
          onChange={(e) =>
            setexperience({
              hostAvailability: {
                start: experience.hostAvailability.start,
                end: e.target.value,
              },
            })
          }
        ></input>
      );
    } else {
      return (
        <p className="showHostAvailabilityEnd">
          {experience.hostAvailability.end}
        </p>
      );
    }
  };

  const showPhotos = () => {
    if (edit) {
      return (
        <>
          <div className="editPhotos">
            {experience.hostingPhotos.map((photo, index) => {
              return (
                <div key={index}>
                  <img
                    className="editHostingPhotos"
                    src={photo}
                    alt="experience house"
                  />
                </div>
              );
            })}
          </div>
        </>
      );
    } else {
      return (
        <div className="showPhotos">
          {experience.hostingPhotos.map((photo, index) => {
            return (
              <div key={index}>
                <img
                  className="showHostingPhotos"
                  src={photo}
                  alt="experience place"
                />
              </div>
            );
          })}
        </div>
      );
    }
  };

  const editButton = () => {
    if (edit) {
      return (
        <button className="editButton" onClick={() => setEdit(false)}>
          Cancel
        </button>
      );
    } else {
      return (
        <button className="editButton" onClick={() => setEdit(true)}>
          Edit
        </button>
      );
    }
  };

  return (
    <>
      <div className="editHosting">
        <div className="div-title">{showTitle()}</div>
        <div className="div-photos">{showPhotos()}</div>
        <div className="div-description">{showDescription()}</div>
        {editButton()}

        {showDescription()}
        {showTotalCost()}
        {showAdditionalRequirements()}
        {showIndividualOrTeam()}
        {showPartialPayAllowed()}
        {showMaxGroupSize()}
        {showMinAge()}
        {showItemsToBring()}
        {showMaxRefundDays()}
        {hostingDurationDays()}
        {hostingDurationHours()}
        {showHostAvailabilityStart()}
        {showHostAvailabilityEnd()}
      </div>
    </>
  );
};

export default EditHosting;
