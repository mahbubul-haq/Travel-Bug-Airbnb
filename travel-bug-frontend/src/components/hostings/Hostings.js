import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HostingActivities from "./hostingNewExperience/HostingActivities";
import HostingCheckEverything from "./hostingNewExperience/HostingCheckEverything";
import HostingComplete from "./hostingNewExperience/HostingComplete";
import HostingGuestRequirements from "./hostingNewExperience/HostingGuestRequirements";

import userContext from "../../context/user/userContext";
import "./cssFiles/HostingPage1Base.css";
import HostingError from "./hostingNewExperience/HostingError";
import HostingPage0 from "./hostingNewExperience/HostingPage0";
import HostingPage1 from "./hostingNewExperience/HostingPage1";
import HostingPage2 from "./hostingNewExperience/HostingPage2";
import HostingPage3 from "./hostingNewExperience/HostingPage3";
import HostingPage4 from "./hostingNewExperience/HostingPage4";
import HostingPage5 from "./hostingNewExperience/HostingPage5";
import HostingPhotoUpload from "./hostingNewExperience/HostingPhotoUpload";
import HostingPricing from "./hostingNewExperience/HostingPricing";
import HostingTitle from "./hostingNewExperience/HostingTitle";

const Hostings = () => {
  const [pageNo, setPageNo] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [location, setLocation] = useState(null);
  const [description, setDescription] = useState(null);
  const [hostingDuration, setHostingDuration] = useState({ days: 0, hours: 2 });
  const [dayTimeSlot, setDayTimeSlot] = useState({ start: 6, end: 18 });
  const [selectedImages, setSelectedImages] = useState([]);
  const [title, setTitle] = useState(null);
  const [minAgeRequirement, setMinAgeRequirement] = useState(1);
  const [maxGroupSize, setMaxGroupSize] = useState(5);
  const [itemsToBring, setItemsToBring] = useState("");
  const [additionalRequirements, setAdditionalRequirements] = useState("");
  const [totalCost, setTotalCost] = useState(25);
  const [partialPayAllowed, setPartialPayAllowed] = useState(false);
  const [maxRefundDays, setMaxRefundDays] = useState(10);
  const [draft, setDraft] = useState(false);
  const [individual, setIndividual] = useState("individual");
  const [activities, setActivities] = useState([]);
  const [experienceId, setExperienceId] = useState(null);
  const [draftExperience, setDraftExperience] = useState(null);
  const [newHostingId, setNewHostingId] = useState(null);

  const context = useContext(userContext);
  const { user, getUser } = context;
  let navigate = useNavigate();

  useEffect(() => {
    console.log(pageNo);
    console.log(selectedCategory);
    console.log(selectedSubCategory);
    console.log(location);
    console.log(description);
    console.log(hostingDuration);
    console.log(dayTimeSlot);
    console.log(selectedImages);
    console.log(title);
    console.log(minAgeRequirement);
    console.log(maxGroupSize);
    console.log(itemsToBring);
    console.log(additionalRequirements);
    console.log(totalCost);
    console.log(partialPayAllowed);
    console.log(maxRefundDays);
    console.log(individual);
    console.log(activities);
    if (location) console.log(typeof location.x);
  });

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getUser();
    }
  }, []);

  useEffect(() => {
    console.log(draftExperience);
    if (draftExperience !== null) {
      // console.log(user._id);
      // const response = async () => {
      //   const result = await fetch(
      //     `http://localhost:5000/experience/hostid/${user._id}`,
      //     {
      //       method: "GET",
      //       headers: {
      //         "Content-Type": "application/json",
      //         "auth-token": localStorage.getItem("token"),
      //       },
      //     }
      //   );
      const data = draftExperience;
      console.log("here bro", data);

      if (data.length == 0) return;
      if (data[0].categories.length > 0 && data[0].categories[0] !== null) {
        setSelectedCategory({
          category: data[0].categories[0].categoryName,
          id: data[0].categories[0]._id,
        });
      }
      if (
        data[0].subCategories.length > 0 &&
        data[0].subCategories[0] !== null
      ) {
        setSelectedSubCategory({
          subCategoryName: data[0].subCategories[0].subCategoryName,
          id: data[0].subCategories[0]._id,
          categoryName: data[0].categories[0].categoryName,
        });
      }
      if (data[0].location !== null) {
        setLocation({
          x: data[0].location.longitude,
          y: data[0].location.latitude,
          label: data[0].location.address,
          id: data[0].location._id,
        });
      }
      setDescription(data[0].description);
      setHostingDuration(data[0].hostingDuration);
      setDayTimeSlot(data[0].hostAvailability);
      setSelectedImages(data[0].hostingPhotos);
      setTitle(data[0].hostingTitle);
      setMinAgeRequirement(data[0].minAge);
      setMaxGroupSize(data[0].maxGroupSize);
      setItemsToBring(data[0].itemsToBring[0]);
      setAdditionalRequirements(data[0].additionalRequirements[0]);
      setTotalCost(data[0].totalCost);
      setPartialPayAllowed(data[0].partialPayAllowed);
      setMaxRefundDays(data[0].maxRefundDays);
      //setDraft(data[0].draft);
      setIndividual(data[0].individualOrTeam);
      setActivities(() => {
        return data[0].activities.map((current_activity) => {
          return {
            title: current_activity.activityTitle,
            dayTimeSlot: current_activity.dayTimeSlots,
            duration: current_activity.activityDuration,
            activityCost: current_activity.activityCost,
            additionalRequirements: current_activity.additionalRequirements[0],
            hostingId: current_activity.hostingId,
            _id: current_activity._id,
          };
        });
      });
      setExperienceId(data[0]._id);
    }
  }, [draftExperience]);

  useEffect(() => {
    console.log("experience Id");
    if (experienceId !== null) {
      if (selectedCategory === null) {
        setPageNo(1);
      } else if (selectedSubCategory === null) {
        setPageNo(2);
      } else if (location === null) {
        setPageNo(3);
      } else if (description === null) {
        setPageNo(4);
      } else {
        setPageNo(5);
      }
    }
  }, [experienceId]);

  useEffect(() => {
    console.log("draft outside");
    if (draft) {
      console.log("draft");
      publishHosting();
    }
  }, [draft]);

  const publishActivity = async (experienceId, activity) => {
    console.log("publishActivity");
    try {
      const response = await fetch(
        `http://localhost:5000/host/experience/activity/${experienceId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify({
            activityTitle: activity.title,
            activityDayTimeSlot: activity.dayTimeSlot,
            activityDuration: activity.duration,
            activityCost: activity.activityCost,
            additionalRequirements: [activity.additionalRequirements],
          }),
        }
      );
      const data = await response.json();
      console.log("activity", data);
    } catch (err) {
      console.log(err);
    }
  };

  const locationState = useLocation().state;
  //setDraftExperience(draft_experience);
  useEffect(() => {
    console.log("draft ------", locationState);
    if (locationState !== null) {
      setDraftExperience(locationState.draft_experience);
    }
  }, [locationState]);

  const saveAndExit = () => {
    console.log("saveAndExit");
    setDraft(true);
  };

  const publishHosting = async () => {
    try {
      const response = await fetch("http://localhost:5000/host/experience", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({
          category: [selectedCategory],
          subCategory: [selectedSubCategory],
          location: location,
          hostingTitle: title,
          description: description,
          duration: hostingDuration,
          dayTimeSlot: dayTimeSlot,
          totalCost: totalCost,
          maxGroupSize: maxGroupSize,
          minAge: minAgeRequirement,
          itemsToBring: [itemsToBring],
          additionalRequirements: [additionalRequirements],
          partialPayAllowed: partialPayAllowed,
          maxRefundDays: maxRefundDays,
          draft: draft,
          hostingPhotos: selectedImages,
          hostingDate: new Date(),
          individualOrTeam: individual,
          id: experienceId,
        }),
      });
      const json = await response.json();
      console.log("got it back");
      console.log(json);
      if (json.success) {
        console.log("sucess");

        for (let i = 0; i < activities.length; i++) {
          publishActivity(json.experienceHosting._id, activities[i]);
        }

        if (draft) {
          navigate("/hostings");
        } else {
          setNewHostingId(json.experienceHosting._id);
          setPageNo(12);
        }
      } else {
        console.log("failure tut");
        setPageNo(13);
      }
    } catch (error) {
      console.log("error fetch");
      setPageNo(13);
    }
  };

  const setmaxRefundDays = (flag) => {
    if (flag) {
      setMaxRefundDays((prev) => {
        return prev + 1;
      });
    } else {
      setMaxRefundDays((prev) => {
        return Math.max(prev - 1, 3);
      });
    }
  };

  const setactivities = (activity) => {
    setActivities((prev) => {
      return [...prev, activity];
    });
  };
  const removeActivity = (title) => {
    setActivities((prev) => {
      return prev.filter((activity) => {
        return activity.title !== title;
      });
    });
  };

  const setpartialPayAllowed = (flag) => {
    setPartialPayAllowed(!partialPayAllowed);
  };

  const setindividual = () => {
    setIndividual((prev) => {
      if (prev == "individual") {
        return "team";
      } else {
        return "individual";
      }
    });
  };

  const settotalCost = (cost, flag) => {
    if (flag == "inc") {
      setTotalCost((totalcost) => {
        return totalcost + 5;
      });
    } else if (flag == "dec") {
      setTotalCost((totalcost) => {
        return Math.max(totalcost - 5, 25);
      });
    } else setTotalCost(parseInt(cost));
  };

  const setitemsToBring = (items) => {
    setItemsToBring(items);
  };

  const setminAgeRequirement = (age) => {
    console.log(typeof age);
    setMinAgeRequirement(Math.max(1, parseInt(age)));
    console.log(typeof parseInt(age));
  };

  const setmaxGroupSize = (size) => {
    setMaxGroupSize(Math.max(1, parseInt(size)));
  };

  const setadditionalRequirements = (addReq) => {
    setAdditionalRequirements(addReq);
  };

  const settitle = (title) => {
    setTitle(title);
  };

  const deleteImage = (img) => {
    setSelectedImages((images) => {
      var newImages = images.filter((image) => image != img);
      console.log("newImages: ", newImages, img);
      return newImages;
    });
  };

  const setselectedImages = (image) => {
    setSelectedImages([...selectedImages, image]);
  };

  const setHostingDurationDays = (flag) => {
    if (flag) {
      setHostingDuration({
        days: hostingDuration.days + 1,
        hours: hostingDuration.hours,
      });
    } else {
      const days = Math.max(0, hostingDuration.days - 1);
      setHostingDuration({ days: days, hours: hostingDuration.hours });
    }
  };

  const setHostingDurationHours = (flag) => {
    if (flag) {
      setHostingDuration({
        days: hostingDuration.days,
        hours: Math.min(hostingDuration.hours + 1, 18),
      });
    } else {
      const hours = Math.max(0, hostingDuration.hours - 1);
      setHostingDuration({ days: hostingDuration.days, hours: hours });
    }
  };

  const setDayTimeSlotStart = (flag) => {
    if (flag) {
      setDayTimeSlot({
        end: dayTimeSlot.end,
        start: Math.min(dayTimeSlot.start + 1, 23),
      });
    } else {
      setDayTimeSlot({
        start: Math.max(dayTimeSlot.start - 1, 0),
        end: dayTimeSlot.end,
      });
    }
  };

  const setDayTimeSlotEnd = (flag) => {
    if (flag) {
      setDayTimeSlot({
        start: dayTimeSlot.start,
        end: Math.min(dayTimeSlot.end + 1, 23),
      });
    } else {
      setDayTimeSlot({
        end: Math.max(dayTimeSlot.end - 1, 0),
        start: dayTimeSlot.start,
      });
    }
  };

  const setdescription = (val) => {
    setDescription(val);
  };

  const setlocation = (val) => {
    setLocation(val);
    if (location !== null) delete location.id;
  };

  const selectSubCategory = (category) => {
    // console.log("cc: " + category);
    setSelectedSubCategory(category);
  };

  const selectCategory = (category) => {
    //console.log("cc: " + category);
    setSelectedCategory(category);
  };

  const nextPage = () => {
    setPageNo((prev) => prev + 1);
  };

  const prevPage = () => {
    setPageNo((prev) => {
      prev = Math.max(prev - 1, 0);
      return prev;
    });
  };

  //console.log(pageNo);
  const getPage = () => {
    if (pageNo == 1) {
      return (
        <div>
          <HostingPage1
            saveAndExit={() => {
              saveAndExit();
            }}
            nextPage={nextPage}
            prevPage={prevPage}
            selectCategory={(category) => {
              selectCategory(category);
            }}
            selectedCategory={() => selectedCategory}
          />
        </div>
      );
    } else if (pageNo == 2) {
      return (
        <div>
          <HostingPage2
            saveAndExit={() => {
              saveAndExit();
            }}
            nextPage={nextPage}
            prevPage={prevPage}
            selectSubCategory={(category) => {
              selectSubCategory(category);
            }}
            selectedCategory={() => selectedCategory}
            selectedSubCategory={() => selectedSubCategory}
          />
        </div>
      );
    } else if (pageNo == 3) {
      return (
        <div>
          <HostingPage3
            saveAndExit={() => {
              saveAndExit();
            }}
            nextPage={nextPage}
            prevPage={prevPage}
            setLocation={(loc) => {
              setlocation(loc);
            }}
            location={() => location}
          />
        </div>
      );
    } else if (pageNo == 4) {
      return (
        <div>
          <HostingPage4
            saveAndExit={() => {
              saveAndExit();
            }}
            nextPage={nextPage}
            prevPage={prevPage}
            setDescription={(desc) => {
              setdescription(desc);
            }}
            description={() => description}
          />
        </div>
      );
    } else if (pageNo == 5) {
      return (
        <div>
          <HostingPage5
            saveAndExit={() => {
              saveAndExit();
            }}
            nextPage={nextPage}
            prevPage={prevPage}
            setHostingDurationDays={(flag) => {
              setHostingDurationDays(flag);
            }}
            setHostingDurationHours={(flag) => {
              setHostingDurationHours(flag);
            }}
            setDayTimeSlotStart={(flag) => {
              setDayTimeSlotStart(flag);
            }}
            setDayTimeSlotEnd={(flag) => {
              setDayTimeSlotEnd(flag);
            }}
            hostingDuration={() => hostingDuration}
            dayTimeSlot={() => dayTimeSlot}
          />
        </div>
      );
    } else if (pageNo == 6) {
      return (
        <div>
          <HostingPhotoUpload
            saveAndExit={() => {
              saveAndExit();
            }}
            nextPage={nextPage}
            prevPage={prevPage}
            setDescription={(desc) => {
              setdescription(desc);
            }}
            description={() => description}
            images={() => selectedImages}
            setSelectedImages={(image) => {
              setselectedImages(image);
            }}
            deleteImage={(image) => {
              deleteImage(image);
            }}
          />
        </div>
      );
    } else if (pageNo == 7) {
      return (
        <div>
          <HostingTitle
            saveAndExit={() => {
              saveAndExit();
            }}
            nextPage={nextPage}
            prevPage={prevPage}
            setTitle={(title) => {
              settitle(title);
            }}
            title={() => title}
          />
        </div>
      );
    } else if (pageNo == 8) {
      return (
        <div>
          <HostingGuestRequirements
            saveAndExit={() => {
              saveAndExit();
            }}
            nextPage={nextPage}
            prevPage={prevPage}
            setMinAgeRequirement={(age) => {
              setminAgeRequirement(age);
            }}
            setMaxGroupSize={(size) => {
              setmaxGroupSize(size);
            }}
            setItemsToBring={(items) => {
              setitemsToBring(items);
            }}
            setAdditionalRequirements={(addReq) => {
              setadditionalRequirements(addReq);
            }}
            maxGroupSize={() => maxGroupSize}
            minAgeRequirement={() => minAgeRequirement}
            itemsToBring={() => itemsToBring}
            additionalRequirements={() => additionalRequirements}
          />
        </div>
      );
    } else if (pageNo == 9) {
      return (
        <div>
          <HostingPricing
            saveAndExit={() => {
              saveAndExit();
            }}
            nextPage={nextPage}
            prevPage={prevPage}
            setTotalCost={(cost, flag) => {
              settotalCost(cost, flag);
            }}
            totalCost={() => totalCost}
            setPartialPayAllowed={(flag) => {
              setpartialPayAllowed(flag);
            }}
            partialPayAllowed={() => partialPayAllowed}
            setIndividual={() => {
              setindividual();
            }}
            individual={() => individual}
            maxRefundDays={() => maxRefundDays}
            setMaxRefundDays={(flag) => {
              setmaxRefundDays(flag);
            }}
          />
        </div>
      );
    } else if (pageNo == 10) {
      return (
        <div>
          <HostingActivities
            saveAndExit={() => {
              saveAndExit();
            }}
            nextPage={nextPage}
            prevPage={prevPage}
            activities={() => activities}
            setActivities={(act) => {
              setactivities(act);
            }}
            removeActivity={(title) => {
              removeActivity(title);
            }}
          />
        </div>
      );
    } else if (pageNo == 11) {
      return (
        <div>
          <HostingCheckEverything
            nextPage={nextPage}
            prevPage={prevPage}
            maxGroupSize={() => maxGroupSize}
            totalCost={() => totalCost}
            minAgeRequirement={() => minAgeRequirement}
            location={() => location}
            description={() => description}
            title={() => title}
            image={() => selectedImages[0]}
            itemsToBring={() => itemsToBring}
            category={() => selectedCategory}
            publishHosting={() => {
              publishHosting();
            }}
            user={() => user}
            activities={() => activities}
          />
        </div>
      );
    } else if (pageNo == 12) {
      return (
        <div>
          <HostingComplete
            nextPage={nextPage}
            prevPage={prevPage}
            hostingId={() => newHostingId}
          />
        </div>
      );
    } else if (pageNo == 13) {
      return (
        <div>
          <HostingError />
        </div>
      );
    }

    return (
      <div>
        <HostingPage0 nextPage={nextPage} prevPage={prevPage} />
      </div>
    );
  };

  const getProgressBar = () => {
    if (pageNo > 0 && pageNo <= 11) {
      var width = (pageNo / 22) * 100;
      width = width + "%";
      return <hr id="progress-bar" style={{ width: width }} />;
    }
  };

  return (
    <>
      {getProgressBar()}
      {getPage()}
    </>
  );
};

export default Hostings;
