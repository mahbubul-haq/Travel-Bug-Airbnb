import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
  const [hostingId, setHostingId] = useState(null);
  const [experience, setExperience] = useState({
    hostingTitle: "Title",
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

  const [experienceDocument, setExperienceDocument] = useState({
    hostingTitle: "Title",
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

  //console.log(context);
  const {
    allCategories,
    setAllCategories,
    subCategories,
    setSubCategories,
    subCategoryId,
    setSubCategoryId,
    getExperience,
    getCategories,
  } = context;

  const { expId } = useLocation().state;
  console.log('expId', expId);

  const getExperience1 = async () => {
    const response = await fetch(`http://localhost:5000/experience/hostingid/${hostingId}`, {
      method: "GET",
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });
    const data = await response.json();
    //console.log(data);
    setExperience(data);
    setExperienceDocument(data);
  };

  const updateValue = async (obj) => {
    const response = await fetch(`http://localhost:5000/host/experience/update/${experience._id}`, {
      method: "POST",
      headers: {
        "auth-token": localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        obj: obj,
      }),
    });
    const data = await response.json();
    //alert("Successfully updated");
    //console.log(data);
    // setExperienceDocument(data);
    getExperience1();
  };

  //setHostingId(expId);
  useEffect(() => {
    setHostingId(expId);
  }, []);

  useEffect(() => {
    console.log(expId);
    console.log("hostingId: " + hostingId);
    if (hostingId) {
      getExperience1();
      getCategories();
    }
  }, [hostingId]);

  useEffect(() => {
    console.log('here you go',  hostingId, expId);
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
      element.style.display = "block";

      if (flag) {
        element.innerHTML = `${value} updated successfully`;
        // element.style.color = "green";
        //element.style.backgroundColor = "rgb(191, 252, 237)";
      } else {
        element.innerHTML = `${value} not updated`;
        //element.style.color = "red";
        //element.style.backgroundColor = "rgb(255, 207, 207)";
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
        <b
          style={{
            position: "absolute",
            top: "70px",
            left: "22%",
            display: "block",
          }}
        >
          {" "}
          Hosting Title
        </b>
        <div id="edit-content-wrapper">
          <div id="edit-content-wrapper-inner">
            <div id="update-message"></div>
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

            {errorMessage(
              0,
              "Title length must be between 5 and 50 characters"
            )}

            <div id="charCountEdit">{experience.hostingTitle.length}/50</div>
          </div>
        </div>
        <div id="button-container">
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
        </div>
      </>
    );
  };

  const showDescription = () => {
    return (
      <>
        <b
          style={{
            position: "absolute",
            top: "70px",
            left: "22%",
            display: "block",
          }}
        >
          {" "}
          Hosting Description
        </b>
        <div id="edit-content-wrapper">
          <div id="edit-content-wrapper-inner">
            <div id="update-message"></div>
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
            {errorMessage(
              1,
              "Description length must be more than 200 characters"
            )}

            <div id="charCountEdit">{experience.description.length}/2500</div>
          </div>
        </div>
        <div id="button-container">
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
        </div>
      </>
    );
  };

  const showCategory = () => {
    return (
      <>
        <b
          style={{
            position: "absolute",
            top: "70px",
            left: "22%",
            display: "block",
          }}
        >
          {" "}
          Hosting Category
        </b>
        <div id="edit-content-wrapper">
          <div id="edit-content-wrapper-inner">
            <div id="update-message"></div>
            <EditCategory
              experience={() => experience}
              categories={() => allCategories}
              categoryId={() => experience.categories[0]._id}
              setExperience={(data) => setexperience(data)}
            />
            {errorMessage(2, "Both category and subcategory must be selected")}
          </div>
        </div>
        <div id="button-container">
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
        </div>
      </>
    );
  };

  const showCost = () => {
    return (
      <>
        <b
          style={{
            position: "absolute",
            top: "70px",
            left: "22%",
            display: "block",
          }}
        >
          {" "}
          Cost
        </b>
        <div id="edit-content-wrapper">
          <div id="edit-content-wrapper-inner">
            <div id="update-message"></div>
            <EditCost
              experience={() => experience}
              setExperience={(data) => setexperience(data)}
            />
            {errorMessage(3, "Both category and subcategory must be selected")}
          </div>
        </div>
        <div id="button-container">
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
        </div>
      </>
    );
  };

  const showGuestRequirements = () => {
    return (
      <>
        <b
          style={{
            position: "absolute",
            top: "70px",
            left: "22%",
            display: "block",
          }}
        >
          {" "}
          Guest Requirements
        </b>
        <div id="edit-content-wrapper">
          <div id="edit-content-wrapper-inner">
            <div id="update-message"></div>

            <EditGuestRequirements
              experience={() => experience}
              setExperience={(data) => setexperience(data)}
            />
            {errorMessage(4, "Both category and subcategory must be selected")}
          </div>
        </div>
        <div id="button-container">
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
        </div>
      </>
    );
  };

  const showDuration = () => {
    return (
      <>
        <b
          style={{
            position: "absolute",
            top: "70px",
            left: "22%",
            display: "block",
          }}
        >
          {" "}
          Duration
        </b>
        <div id="edit-content-wrapper">
          <div id="edit-content-wrapper-inner">
            <div id="update-message"></div>

            <EditDuration
              experience={() => experience}
              setExperience={(data) => setexperience(data)}
            />
            {errorMessage(5, "Both category and subcategory must be selected")}
          </div>
        </div>
        <div id="button-container">
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
        </div>
      </>
    );
  };

  const showPhotos = () => {
    return (
      <>
        <b
          style={{
            position: "absolute",
            top: "70px",
            left: "22%",
            display: "block",
          }}
        >
          {" "}
          Hosting Photos
        </b>
        <div id="edit-content-wrapper">
          <div id="edit-content-wrapper-inner">
            <div id="update-message"></div>

            <EditPhotos
              experience={() => experience}
              setExperience={(data) => setexperience(data)}
            />
            {errorMessage(6, "At least 5 photos must be uploaded")}
          </div>
        </div>
        <div id="button-container">
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
        </div>
      </>
    );
  };

  const showLocation = () => {
    return (
      <>
        <b
          style={{
            position: "absolute",
            top: "70px",
            left: "22%",
            display: "block",
          }}
        >
          {" "}
          Hosting Location
        </b>
        <div id="edit-content-wrapper">
          <div id="edit-content-wrapper-inner">
            <div id="update-message"></div>
            <EditLocation
              experience={() => experience}
              setExperience={(data) => setexperience(data)}
            />
            {errorMessage(8, "At least 5 photos must be uploaded")}
          </div>
        </div>
        <div id="button-container">
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
        </div>
      </>
    );
  };

  const showIndividualOrTeam = () => {
    return <FindRoute />;
  };

  const showActivity = () => {
    return (
      <>
        <b
          style={{
            position: "absolute",
            top: "70px",
            left: "22%",
            display: "block",
          }}
        >
          {" "}
          Hosting Activity
        </b>
        <div id="edit-content-wrapper1">
          <div id="edit-content-wrapper-inner">
            <div id="update-message"></div>

            <EditActivity
              experience={() => experience}
              setExperience={(data) => setexperience(data)}
            />
            {errorMessage(7, "At least 5 photos must be uploaded")}
          </div>
        </div>
        <div id="button-container">
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
        </div>
      </>
    );
  };

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

  const changeNavStyle = (index) => {
    var elements = document.getElementsByClassName(
      "edit-container-middle-navitem"
    );

    console.log(index);
    for (var i = 0; i < elements.length; i++) {
      if (i == index) {
        elements[i].style.backgroundColor = "rgb(13, 182, 244)";
        elements[i].style.color = "black";
      } else {
        elements[i].style.backgroundColor = "rgb(12, 8, 46)";
        elements[i].style.color = "white";
        // elements[i].onmouseover = function() {
        //   this.style.backgroundColor = "rgba(89, 95, 121, 0.533)";
        // }
        // elements[i].onmouseout = function() {
        //   this.style.backgroundColor = "rgb(5, 0, 54)";
        // }
      }
    }
  };
  const navigate = useNavigate();
  const deleteHosting = async () => {
    const response = await fetch(`http://localhost:5000/host/experience/delete${hostingId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token"),
      },
    });
    const data = await response.json();
    console.log(data);
    if (data.success) {
      //navigate("/hostings/listings");
    }
    else {
      console.log("failure to delete");
    }
    
  }

  const navigateListings = () => {
    navigate("/hostings/listings");
  }


  return (
    <>
      {changeNavStyle(editNo)}
      <div id="confirm-delete">
        <div id="confirm-middle">
          <div id="confirm-message">Are you sure you want to delete your hosting?</div>
          <button id="confirm-button" onClick={ async () => {
            await deleteHosting();
            navigateListings();
          }}>
            Yes
          </button>
          <button
            id="confirm-cancel"
            onClick={() => {
              var element = document.getElementById("confirm-delete");
              element.style.display = "none";
            }}
          >
            Cancel
          </button>
        </div>
      </div>
      <div id="delete-wrapper">
        <button
          id="delete-button"
          onClick={() => {
            var element = document.getElementById("confirm-delete");
            element.style.display = "flex";
          }}
        >
          Delete
        </button>
      </div>
      <div id="edit-container">
        <div id="edit-container-left">
          <div id="edit-container-left-top">Edit Experience Info Here</div>
          <div id="edit-container-left-middle">
            <div
              className="edit-container-middle-navitem"
              onClick={() => {
                setEditNo(0);
                setExperience(experienceDocument);
                changeNavStyle(0);
              }}
            >
              Hosting Title
            </div>
            <div
              className="edit-container-middle-navitem"
              onClick={() => {
                setEditNo(1);
                setExperience(experienceDocument);
                changeNavStyle(1);
              }}
            >
              Description
            </div>
            <div
              className="edit-container-middle-navitem"
              onClick={() => {
                setEditNo(2);
                setExperience(experienceDocument);
                changeNavStyle(2);
              }}
            >
              Category
            </div>
            <div
              className="edit-container-middle-navitem"
              onClick={() => {
                setEditNo(3);
                setExperience(experienceDocument);
                changeNavStyle(3);
              }}
            >
              Cost
            </div>
            <div
              className="edit-container-middle-navitem"
              onClick={() => {
                setEditNo(4);
                setExperience(experienceDocument);
                changeNavStyle(4);
              }}
            >
              Guest Requirements
            </div>
            <div
              className="edit-container-middle-navitem"
              onClick={() => {
                setEditNo(5);
                setExperience(experienceDocument);
                changeNavStyle(5);
              }}
            >
              Hosting Duration
            </div>
            <div
              className="edit-container-middle-navitem"
              onClick={() => {
                setEditNo(6);
                setExperience(experienceDocument);
                changeNavStyle(6);
              }}
            >
              Hosting Photos
            </div>
            <div
              className="edit-container-middle-navitem"
              onClick={() => {
                setEditNo(7);
                setExperience(experienceDocument);
                changeNavStyle(7);
              }}
            >
              Activities
            </div>
            <div
              className="edit-container-middle-navitem"
              onClick={() => {
                setEditNo(8);
                setExperience(experienceDocument);
                changeNavStyle(8);
              }}
            >
              Location
            </div>
          </div>
        </div>

        <div id="edit-container-right">
          <div className="edit-content">{getEditContent()}</div>
        </div>
      </div>
      {/* <div className="edit-hosting-navbar">
       
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
      </div> */}
    </>
  );
};

export default EditHosting;
