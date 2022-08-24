import React, { useEffect, useState } from "react";

import "../cssFiles/HostingActivities.css";
import "../cssFiles/HostingPage1Base.css";

const EditActivity = (props) => {
  const [title, setTitle] = useState("");
  const [dayTimeSlot, setDayTimeSlot] = useState({ start: 9, end: 17 });
  const [duration, setDuration] = useState({ days: 1, hours: 0 });
  const [activityCost, setActivityCost] = useState(10);
  const [additionalRequiremnents, setAdditionalRequiremnents] = useState("");
  const [isNewActivity, setIsNewActivity] = useState(false);
  const [changed, setChanged] = useState(false);
  const [index, setIndex] = useState(-1);

  const setisNewActivity = () => {
    setIsNewActivity(!isNewActivity);
  };
  const saveActivity = () => {
    if (index != -1) 
    {
      props.experience().activities[index] = {
        activityTitle: title,
        dayTimeSlots: dayTimeSlot,
        activityDuration: duration,
        activityCost: activityCost,
        additionalRequirements: additionalRequiremnents,
      };
      console.log(props.experience().activities[index]);
      console.log(props.experience().activities);
      return;
    }
    props.setExperience({
      activities: [
        ...props.experience().activities,
        {
          activityTitle: title,
          dayTimeSlots: dayTimeSlot,
          activityDuration: duration,
          activityCost: activityCost,
          additionalRequirements: additionalRequiremnents,
        },
      ],
    });
  };
  const resetActivity = () => {
    setTitle("");
    setDayTimeSlot({ start: 9, end: 17 });
    setDuration({ days: 1, hours: 0 });
    setActivityCost(10);
    setAdditionalRequiremnents("");
    setIndex(-1);
  };

  const removeActivity = (title) => {
    props.setExperience({
      activities: props
        .experience()
        .activities.filter((activity) => activity.activityTitle != title),
    });
  };

  useEffect(() => {
    if (index != -1) {
      setTitle(props.experience().activities[index].activityTitle);
      setDayTimeSlot(props.experience().activities[index].dayTimeSlots);
      setDuration(props.experience().activities[index].activityDuration);
      setActivityCost(props.experience().activities[index].activityCost);
      setAdditionalRequiremnents(
        props.experience().activities[index].additionalRequirements
      );
    }
  }, [index]);

  const newActivity = (flag) => {
    if (flag) {
      return (
        <>
          <div className="activity-input-edit">
            <div className="activity-alignment-edit">
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
                  value={activityCost == 0 ? "" : activityCost}
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
    }
      return (
        <>
          <div id="activities-wrapper">
            {props.experience().activities.map((activity, idx) => {
              return (
                <div className="div-activities-edit" key={idx}>
                  <div 
                  className="title-activities"
                  onClick={ () =>
                  {
                    setIndex(idx);
                    setisNewActivity(); 
                  }}>
                    {activity.activityTitle}
                  </div>
                  <button
                    className="remove-activity"
                    onClick={() => {
                      removeActivity(activity.activityTitle);
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
        </>
      );
    
  };

  return <div>{newActivity(isNewActivity)}</div>;
};

export default EditActivity;
