import { useState } from "react";
import EditHostingContext from "./editHostingContext";

const EditHostingState = (props) => {
  const host = "http://localhost:5000";

  const [hostingId, setHostingId] = useState(null);
  const [experienceDocument, setExperienceDocument] = useState({
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
  const [allCategories, setAllCategories] = useState(null);
  const [subCategoryId, setSubCategoryId] = useState(null);
  const [subCategories, setSubCategories] = useState(null);

  const getExperience = async () => {
    const response = await fetch(`${host}/experience/hostingid/${hostingId}`, {
      method: "GET",
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });
    const data = await response.json();
    //console.log(data);
    setExperienceDocument(data);
  };

  const getCategories = async () => {
    const response = await fetch(`${host}/experience/categories`, {
      method: "GET",
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });
    const data = await response.json();
    //console.log(data);
    setAllCategories(data);
  };

  const updateValue = async (obj, id) => {
    const response = await fetch(`${host}/host/experience/update/${id}`, {
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
    getExperience();
  }

  return (
    <EditHostingContext.Provider
      value={{
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
      }}
    >
      {props.children}
    </EditHostingContext.Provider>
  );
};

export default EditHostingState;
