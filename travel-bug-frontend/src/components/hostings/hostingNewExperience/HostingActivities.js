import React, { useEffect, useState } from "react";

import "../cssFiles/HostingActivities.css";
import "../cssFiles/HostingPage1Base.css";

const HostingActivities = (props) => {
  const [title, setTitle] = useState("");
  const [dayTimeSlot, setDayTimeSlot] = useState({ start: 9, end: 17 });
  const [duration, setDuration] = useState({ days: 1, hours: 0 });
  const [activityCost, setActivityCost] = useState(10);
  const [additionalRequiremnents, setAdditionalRequiremnents] = useState("");
  const [isNewActivity, setIsNewActivity] = useState(false);
  const [index, setIndex] = useState(-1);
  const [_id, setId] = useState(null);

  const setisNewActivity = () => {
    setIsNewActivity(!isNewActivity);
  };
  const saveActivity = () => {
    if (index != -1) 
    {
      props.activities()[index] = {
        title,
        dayTimeSlot,
        duration,
        activityCost,
        additionalRequiremnents,
        _id,
      };
      return;
    }

    props.setActivities({
      _id,
      title,
      dayTimeSlot,
      duration,
      activityCost,
      additionalRequiremnents,
    });
    
  };
  const resetActivity = () => {
    setTitle("");
    setDayTimeSlot({ start: 9, end: 17 });
    setDuration({ days: 1, hours: 0 });
    setActivityCost(10);
    setAdditionalRequiremnents("");
    setIndex(-1);
    setId(null);
  };

  useEffect(() => {
    if (index != -1) {
      setTitle(props.activities()[index].title);
      setDayTimeSlot(props.activities()[index].dayTimeSlot);
      setDuration(props.activities()[index].duration);
      setActivityCost(props.activities()[index].activityCost);
      setAdditionalRequiremnents(props.activities()[index].additionalRequiremnents);
      setId(props.activities()[index]._id);
    }
  } , [index]);

  const removeActivity = (title) => {
    props.removeActivity(title);
  };

  const newActivity = (flag) => {
    if (flag) {
      return (
        <>
          <div className="activity-input">
            <div className="activity-alignment">
              <div id="activity-input-header">Enter activity details</div>
              <div id="activity-inputs">
                <label htmlFor="activity-title">
                  Title <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  maxLength={50}
                  id="activity-title"
                  type="text"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <label htmlFor="activity-cost">
                  Activity Cost <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  id="activity-cost"
                  type="number"
                  placeholder="Cost"
                  value={activityCost == 0? "" : activityCost}
                  onChange={(e) => setActivityCost(Math.max(0, e.target.value))}
                />

                <div className="activity-time-slot">
                  <div id="activity-time-slot-start">
                    <label htmlFor="activity-start-time">
                      Start Time <span style={{ color: "red" }}>*</span>
                    </label>

                    <select
                      id="activity-start-time"
                      value={dayTimeSlot.start}
                      onChange={(e) => {
                        setDayTimeSlot({
                          ...dayTimeSlot,
                          start: e.target.value,
                        });
                      }}
                    >
                      {[...Array(24)].map((_, i) => (
                        <option key={i} value={i}>
                          {i}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div id="activity-time-slot-end">
                    <label htmlFor="activity-end-time">
                      End Time <span style={{ color: "red" }}>*</span>
                    </label>

                    <select
                      id="activity-end-time"
                      value={dayTimeSlot.end}
                      onChange={(e) => {
                        setDayTimeSlot({
                          ...dayTimeSlot,
                          end: e.target.value,
                        });
                      }}
                    >
                      {[...Array(24)].map((_, i) => (
                        <option key={i} value={i}>
                          {i}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="activity-duration">
                  <div id="activity-duration-days-wrapper">
                    <label htmlFor="activity-duration-days">
                      Duration (Days) <span style={{ color: "red" }}>*</span>
                    </label>
                    <select
                      id="activity-duration-days"
                      value={duration.days}
                      onChange={(e) => {
                        setDuration({
                          ...duration,
                          days: e.target.value,
                        });
                      }}
                    >
                      {[...Array(100)].map((_, i) => (
                        <option key={i} value={i}>
                          {i}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div id="activity-duration-hours-wrapper">
                    <label htmlFor="activity-duration-hours">
                      Duration (Hours) <span style={{ color: "red" }}>*</span>
                    </label>
                    <select
                      id="activity-duration-hours"
                      value={duration.hours}
                      onChange={(e) => {
                        setDuration({
                          ...duration,
                          hours: e.target.value,
                        });
                      }}
                    >
                      {[...Array(24)].map((_, i) => (
                        <option key={i} value={i}>
                          {i}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <label htmlFor="activity-requirements">
                  Activity Description
                </label>
                <textarea
                  type="text"
                  id="activity-requirements"
                  placeholder="write description here..."
                  value={additionalRequiremnents}
                  onChange={(e) => setAdditionalRequiremnents(e.target.value)}
                />
              </div>
              <div id="new-activity-bottom">
                <button
                  id="saveButton"
                  onClick={() => {
                    if (title.length > 0 && activityCost > 0) {
                    saveActivity();
                    resetActivity();
                    setisNewActivity();
                    }
                  }}
                >
                  Save
                </button>

                <button
                  id="closeButton"
                  onClick={() => {
                    setisNewActivity();
                    resetActivity();
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </>
      );
    } else {
      return <></>;
    }
  };

  return (
    <>
      <div id="body">
        {newActivity(isNewActivity)}
        <div id="container">
          <div id="left">Lets offer some additional activities!</div>
          <div id="right">
            <div id="top">
              <button id="saveAndExit" onClick={() => props.saveAndExit()}>
                Save and Exit
              </button>
            </div>

            <div id="middle_activities">
              <div id="animation_activities">
                <div id="activities-wrapper">
                  {props.activities().map((activity, index) => {
                    return (
                      <div className="div-activities" key={index}>
                        <div
                          className="title-activities"
                          onClick={() => {
                            setIndex(index);
                            setisNewActivity();
                          }}
                        >
                          {activity.title}
                        </div>
                        <button
                          className="remove-activity"
                          onClick={() => {
                            removeActivity(activity.title);
                          }}
                        >
                          remove
                        </button>
                      </div>
                    );
                  })}
                </div>
                <div id="button-wrapper-activities">
                  <button
                    className="new-activity"
                    onClick={() => {
                      setisNewActivity();
                    }}
                  >
                    Add New Activity
                  </button>
                </div>
              </div>
            </div>

            <div id="bottom">
              <button id="backButton" onClick={() => props.prevPage()}>
                Back
              </button>
              <button
                id="nextButton"
                onClick={() => {
                  props.nextPage();
                }}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HostingActivities;
