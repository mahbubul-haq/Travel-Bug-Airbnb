import React, { useContext, useEffect, useState } from "react";
import Nav from "react-bootstrap/Nav";
import { useLocation } from "react-router-dom";
import editHostingContext from "../../../context/hostings/editHostingContext";
import "../cssFiles/EditHosting.css";
import EditCategory from "./EditCategory";
import EditLocation from "./EditLocation";
import EditCost from "./EditCost";

const EditHosting = (props) => {
  //const {hostingId} = useParams();
  const [edit, setEdit] = useState(false);
  const [editNo, setEditNo] = useState(0);
  const [experience, setExperience] = useState({
    hostingTitle: "",
    description: "",
    hostingDate: "",
    categories: ["0"],
    subCategories: ["0"],
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
  const context = useContext(editHostingContext);

  console.log(context);
  const {
    hostingId,
    setHostingId,
    experienceDocument,
    setExperienceDocument,
    allCategories,
    setAllCategories,
    subCategories,
    setSubCategories,
    subCategoryId,
    setSubCategoryId,
    getExperience,
    getCategories,
    updateValue,
  } = context;

  const { expId } = useLocation().state;
  console.log(expId);
  //setHostingId(expId);
  useEffect(() => {
    setHostingId(expId);
  }, []);

  useEffect(() => {
    console.log(expId);
    console.log("hostingId: " + hostingId);
    if (hostingId) {
      getExperience();
      setExperience(experienceDocument);
      getCategories();
    }
  }, [hostingId]);

  useEffect(() => {
    setExperience(experienceDocument);
  }, [experienceDocument]);

  const setexperience = (data) => {
    console.log(data);
    setExperience((prev) => {
      return { ...prev, ...data };
    });
  };

  const errorMessage = (pageNo, message) => {
    if (pageNo === 0) {
      if (
        experience.hostingTitle.length < 5 ||
        experience.hostingTitle.length > 50
      ) {
        return <div className="error-message">{message}</div>;
      }
    } else if (pageNo === 1) {
      if (
        experience.description.length < 200 ||
        experience.description.length > 2500
      ) {
        return <div className="error-message">{message}</div>;
      }
    }
    else if (pageNo === 2)
    {
      if (experience.subCategories[0] === "0" || experience.categories[0] === "0")
      {
        return <div className="error-message">{message}</div>
      }
    }
    
  };

  const valueUpdatedMessage = (pageNo, value, flag) => {
    if (pageNo === 0 || pageNo === 1 || pageNo === 2 || pageNo == 3) {
      const element = document.getElementById("update-message");
      element.style.display = "inline-block";

      if (pageNo == 3) {
        element.style.marginLeft= "60px";
      }
      if (flag) {
        element.innerHTML = `${value} updated successfully`;
        element.style.color = "green";
        element.style.backgroundColor = "rgb(191, 252, 237)";
      } else {
        element.innerHTML = `${value} not updated`;
        element.style.color = "red";
        element.style.backgroundColor = "rgb(255, 207, 207)";
      }
      setTimeout(() => {
        element.style.display = "none";
        element.style.marginLeft ="0";
      }, 3000);
    }
  };

  const showTitle = () => {
    return (
      <>
        <br></br>
        <br></br>
        <br></br>

        <b> Edit Hosting Title</b>
        <textarea
          maxLength={50}
          id="descriptionBox9"
          placeholder="Walking through ancient relics in ... with ..."
          onChange={(event) => {
            setexperience({ hostingTitle: event.target.value });
          }}
          value={experience.hostingTitle}
          style={{ fontSize: "20px" }}
        ></textarea>
        {errorMessage(0, "Title length must be between 5 and 50 characters")}
        <div id="message-containder">
          <div id="update-message"></div>
        </div>
        <div id="charCountEdit">{experience.hostingTitle.length}/50</div>
        <button
          id="saveEdit"
          onClick={() => {
            if (
              experience.hostingTitle.length >= 5 &&
              experience.hostingTitle.length <= 50
            ) {
              updateValue({ hostingTitle: experience.hostingTitle });
              valueUpdatedMessage(0, "Title", true);
            } else {
              valueUpdatedMessage(0, "Title", false);
            }
          }}
        >
          Save
        </button>
      </>
    );
  };

  const showDescription = () => {
    return (
      <>
        <br></br>
        <br></br>
        <br></br>
        <b> Edit Experience Description</b>
        <textarea
          maxLength={2500}
          id="descriptionBox9"
          placeholder="We will be visiting the ruins of the ancient city of ... with ..."
          onChange={(event) => {
            setexperience({ description: event.target.value });
          }}
          value={experience.description}
          style={{ fontSize: "16px" }}
        ></textarea>
        {errorMessage(1, "Description length must be more than 200 characters")}
        <div id="message-containder">
          <div id="update-message"></div>
        </div>
        <div id="charCountEdit">{experience.description.length}/2500</div>
        <button
          id="saveEdit"
          onClick={() => {
            if (
              experience.description.length >= 200 &&
              experience.description.length <= 2500
            ) {
              updateValue({ description: experience.description });
              valueUpdatedMessage(1, "Description", true);
            } else {
              valueUpdatedMessage(1, "Description", false);
            }
          }}
        >
          Save
        </button>
      </>
    );
  };

  const showCategory = () => {
    return (
      <>
        <EditCategory
          experience={() => experience}
          categories={() => allCategories}
          categoryId={() => experience.categories[0]._id}
          setExperience={(data) => setexperience(data)}
        />
        {errorMessage(2, "Both category and subcategory must be selected")}
        <div id="message-containder">
          <div id="update-message"></div>
        </div>
        <button
          id="saveEdit"
          onClick={() => {
            if (
              experience.categories[0] !== "0" &&
              experience.subCategories[0] !== "0"
            ) {
              updateValue({
                categories: experience.categories,
                subCategories: experience.subCategories,
              });
              valueUpdatedMessage(2, "Category", true);
            } else {
              valueUpdatedMessage(2, "Category", false);
            }
          }}
        >
          Save
        </button>
      </>
    );
  };

  const showCost = () => {
    return (
      <>
        <EditCost
          experience={() => experience}
          setExperience={(data) => setexperience(data)}
        />
        {errorMessage(3, "Both category and subcategory must be selected")}
        <div id="message-containder">
          <div id="update-message"></div>
        </div>
        <button
          id="saveEdit"
          onClick={() => {
            if (
              true
            ) {
              updateValue({
                partialPayAllowed: experience.partialPayAllowed,
                totalCost: experience.totalCost,
                maxRefundDays: experience.maxRefundDays,
                individualOrTeam: experience.individualOrTeam,
              });
              valueUpdatedMessage(3, "Values", true);
            } else {
              valueUpdatedMessage(3, "Values", false);
            }
          }}
        >
          Save
        </button>
      </>
    )
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

  const showLocation = () => {
    return (
      <EditLocation experience={experience} setexperience={setexperience} />
    )
  }

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

  const getEditContent = () => {
    //setExperience(experienceDocument);
    if (editNo == 0) {
      return showTitle();
    } else if (editNo == 1) {
      return showDescription();
    } else if (editNo == 2) {
      return showCategory();
    }
    else if (editNo == 3)
    {
      return showCost();
    }
    else if (editNo == 8)
    {
      return showLocation();
    }
  };
  return (
    <>
      <div className="edit-hosting-navbar">
        {/* <Navbar.Brand href="">Navbar</Navbar.Brand> */}
        <Nav variant="tabs" defaultActiveKey="link-1">
          <Nav.Item className="edit-hosting-navitem">
            <Nav.Link
              className="edit-hosting-navlink"
              eventKey="link-1"
              onClick={() => {
                setEditNo(0);
                setExperience(experienceDocument);
              }}
            >
              Title
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className="edit-hosting-navitem">
            <Nav.Link
              className="edit-hosting-navlink"
              eventKey="link-2"
              onClick={() => {
                setEditNo(1);
                setExperience(experienceDocument);
              }}
            >
              Description
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className="edit-hosting-navitem">
            <Nav.Link
              className="edit-hosting-navlink"
              eventKey="link-3"
              onClick={() => {
                setEditNo(2);
                setExperience(experienceDocument);
                console.log(experience);
              }}
            >
              Category
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className="edit-hosting-navitem">
            <Nav.Link
              className="edit-hosting-navlink"
              eventKey="link-4"
              onClick={() => {
                setEditNo(3);
                setExperience(experienceDocument);
                console.log(experience);
              }}
            >
              Cost
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className="edit-hosting-navitem">
            <Nav.Link
              className="edit-hosting-navlink"
              eventKey="link-5"
              onClick={() => setEditNo(0)}
            >
              Guest Requirements
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className="edit-hosting-navitem">
            <Nav.Link
              className="edit-hosting-navlink"
              eventKey="link-6"
              onClick={() => setEditNo(0)}
            >
              Duration
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className="edit-hosting-navitem">
            <Nav.Link
              className="edit-hosting-navlink"
              eventKey="link-7"
              onClick={() => setEditNo(0)}
            >
              Photos
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className="edit-hosting-navitem">
            <Nav.Link
              className="edit-hosting-navlink"
              eventKey="link-8"
              onClick={() => setEditNo(0)}
            >
              Activities
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className="edit-hosting-navitem">
            <Nav.Link
              className="edit-hosting-navlink"
              eventKey="link-9"
              onClick={() => setEditNo(8)}
            >
              Location
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </div>

      <div className="edit-content">
        <div className="edit-content-middle">{getEditContent()}</div>
      </div>
    </>
  );
};

export default EditHosting;
