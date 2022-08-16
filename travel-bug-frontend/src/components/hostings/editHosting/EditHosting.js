import React, { useContext, useEffect, useState } from "react";
import Nav from "react-bootstrap/Nav";
import { useLocation } from "react-router-dom";
import editHostingContext from "../../../context/hostings/editHostingContext";
import "../cssFiles/EditHosting.css";
import EditActivity from "./EditActivity";
import EditCategory from "./EditCategory";
import EditCost from "./EditCost";
import EditDuration from "./EditDuration";
import EditGuestRequirements from "./EditGuestRequirements";
import EditLocation from "./EditLocation";
import EditPhotos from "./EditPhotos";
import FindRoute from "./FindRoute";

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
    activities: [],
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
    } else if (pageNo === 2) {
      if (
        experience.subCategories[0] === "0" ||
        experience.categories[0] === "0"
      ) {
        return <div className="error-message">{message}</div>;
      }
    } else if (pageNo == 6) {
      if (experience.hostingPhotos.length < 5) {
        return <div className="error-message">{message}</div>;
      }
    }
  };

  const valueUpdatedMessage = (pageNo, value, flag) => {
    if (pageNo <= 8) {
      const element = document.getElementById("update-message");
      element.style.display = "inline-block";

      if (pageNo == 3) {
        element.style.marginLeft = "60px";
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
        element.style.marginLeft = "0";
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
            if (true) {
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
    );
  };

  const showGuestRequirements = () => {
    return (
      <>
        <EditGuestRequirements
          experience={() => experience}
          setExperience={(data) => setexperience(data)}
        />
        {errorMessage(4, "Both category and subcategory must be selected")}
        <div id="message-containder">
          <div id="update-message"></div>
        </div>
        <button
          id="saveEdit"
          onClick={() => {
            if (true) {
              updateValue({
                minAge: experience.minAge,
                maxGroupSize: experience.maxGroupSize,
                additionalRequirements: experience.additionalRequirements,
                itemsToBring: experience.itemsToBring,
              });
              valueUpdatedMessage(4, "Values", true);
            } else {
              valueUpdatedMessage(4, "Values", false);
            }
          }}
        >
          Save
        </button>
      </>
    );
  };

  const showDuration = () => {
    return (
      <>
        <EditDuration
          experience={() => experience}
          setExperience={(data) => setexperience(data)}
        />
        {errorMessage(5, "Both category and subcategory must be selected")}
        <div id="message-containder">
          <div id="update-message"></div>
        </div>
        <button
          id="saveEdit"
          onClick={() => {
            if (true) {
              updateValue({
                hostingDuration: experience.hostingDuration,
                hostAvailability: experience.hostAvailability,
              });
              valueUpdatedMessage(5, "Values", true);
            } else {
              valueUpdatedMessage(5, "Values", false);
            }
          }}
        >
          Save
        </button>
      </>
    );
  };

  const showPhotos = () => {
    return (
      <>
        <EditPhotos
          experience={() => experience}
          setExperience={(data) => setexperience(data)}
        />
        {errorMessage(6, "At least 5 photos must be uploaded")}
        <div id="message-containder">
          <div id="update-message"></div>
        </div>
        <button
          id="saveEdit"
          onClick={() => {
            if (experience.hostingPhotos.length >= 5) {
              updateValue({
                hostingPhotos: experience.hostingPhotos,
              });
              valueUpdatedMessage(6, "Photos", true);
            } else {
              valueUpdatedMessage(6, "Photos", false);
            }
          }}
        >
          Save
        </button>
      </>
    );
  };

  const showLocation = () => {
    return (
      <>
      <EditLocation
        experience={() => experience}
        setExperience={(data) => setexperience(data)}
        />
        {errorMessage(8, "At least 5 photos must be uploaded")}
        <div id="message-containder">
          <div id="update-message"></div>
        </div>
        <button
          id="saveEdit"
          onClick={() => {
            if (true) {
              updateValue({
                location: experience.location,
              });
              valueUpdatedMessage(8, "Location", true);
            } else {
              valueUpdatedMessage(8, "Location", false);
            }
          }}
        >
          Save
        </button>
      </>
    );
  };


  const showIndividualOrTeam = () => {
    return <FindRoute />;
  };
  
  const showActivity = () => {
    return (
      <>
        <EditActivity
          experience={() => experience}
          setExperience = {(data) => setexperience(data)}
        />
        {errorMessage(7, "At least 5 photos must be uploaded")}
        <div id="message-containder">
          <div id="update-message"></div>
        </div>
        <button
          id="saveEdit"
          onClick={() => {
            if (true) {
              updateValue({
                activities: experience.activities,
              });
              valueUpdatedMessage(7, "Activities", true);
            } else {
              valueUpdatedMessage(7, "Activities", false);
            }
          }}
        >
          Save
        </button>
      </>
    );
  }


  const getEditContent = () => {
    //setExperience(experienceDocument);
    if (editNo == 0) {
      return showTitle();
    } else if (editNo == 1) {
      return showDescription();
    } else if (editNo == 2) {
      return showCategory();
    } else if (editNo == 3) {
      return showCost();
    } else if (editNo == 4) {
      return showGuestRequirements();
    } else if (editNo == 5) {
      return showDuration();
    } else if (editNo == 6) {
      return showPhotos();
    } else if (editNo == 8) {
      return showLocation();
    } else if (editNo == 7) {
      return showActivity();
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
              onClick={() => {
                setEditNo(4);
                setExperience(experienceDocument);
                console.log(experience);
              }}
            >
              Guest Requirements
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className="edit-hosting-navitem">
            <Nav.Link
              className="edit-hosting-navlink"
              eventKey="link-6"
              onClick={() => {
                setEditNo(5);
                setExperience(experienceDocument);
                console.log(experience);
              }}
            >
              Duration
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className="edit-hosting-navitem">
            <Nav.Link
              className="edit-hosting-navlink"
              eventKey="link-7"
              onClick={() => {
                setEditNo(6);
                setExperience(experienceDocument);
                console.log(experience);
              }}
            >
              Photos
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className="edit-hosting-navitem">
            <Nav.Link
              className="edit-hosting-navlink"
              eventKey="link-8"
              onClick={() => {
                setExperience(experienceDocument);
                console.log("experience", experience);
                console.log("document", experienceDocument);
                setEditNo(7);
                
                console.log(experience);
              }}
            >
              Activities
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className="edit-hosting-navitem">
            <Nav.Link
              className="edit-hosting-navlink"
              eventKey="link-9"
              onClick={() => {
                setExperience(experienceDocument);
                console.log(experienceDocument);
                console.log(experience);
                setEditNo(8);
                
                
              }}
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
