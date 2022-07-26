import React, { useState } from 'react';

import "../cssFiles/HostingActivities.css";
import "../cssFiles/HostingPage1Base.css";

const HostingActivities = (props) => {
    const [title, setTitle] = useState('');
    const [dayTimeSlot, setDayTimeSlot] = useState({start: 9, end: 17});
    const [duration, setDuration] = useState({days:1, hours:0});
    const [activityCost, setActivityCost] = useState(10);
    const [additionalRequiremnents, setAdditionalRequiremnents] = useState('');
    const [isNewActivity, setIsNewActivity] = useState(false);


    const setisNewActivity = () => {
        setIsNewActivity(!isNewActivity);
    }
    const saveActivity = () => {
        props.setActivities({title, dayTimeSlot, duration, activityCost, additionalRequiremnents});
    }
    const resetActivity = () => {
        setTitle('');
        setDayTimeSlot({start: 9, end: 17});
        setDuration({days:1, hours:0});
        setActivityCost(10);
        setAdditionalRequiremnents('');
    }

    const removeActivity = (title) => {
        props.removeActivity(title);
    }

    const newActivity = (flag) => {
        if (flag)
        {
            return (
                <>
                <div className="activity-input">
                    <div className='activity-alignment'>
                    <label htmlFor='activity-title'>Title</label>
                <input 
                id="activity-title"
                type="text" 
                placeholder="Title" 
                value = {title}
                onChange={(e) => setTitle(e.target.value)} 
                />
                 <label htmlFor='activity-cost'>Activity Cost</label>
                <input 
                id="activity-cost"
                type="number" 
                placeholder="Cost" 
                value={activityCost} 
                onChange={(e) => setActivityCost(e.target.value)} 
                />
                 <label htmlFor='activity-requirements'>Activity Requirements</label>
                <input type="text" 
                id="activity-requirements"
                placeholder="Additional Requirements" 
                value={additionalRequiremnents} 
                onChange={(e) => setAdditionalRequiremnents(e.target.value)} />
                <div className="activity-time-slot">
                    <label htmlFor='activity-start-time'>Start Time</label>
                    <input  id="activity-start-time" type="number" 
                    placeholder="Start Time" value={dayTimeSlot.start} 
                    onChange={(e) => setDayTimeSlot({...dayTimeSlot, start: e.target.value})} />
                    <label htmlFor='activity-end-time'>End Time</label>
                    <input  id="activity-end-time" type="number"
                    placeholder="End Time" value={dayTimeSlot.end}
                    onChange={(e) => setDayTimeSlot({...dayTimeSlot, end: e.target.value})} />
                </div>
                <div className="activity-duration">
                    <label htmlFor='activity-duration-days'>Duration (Days)</label>
                    <input  id="activity-duration-days" type="number"
                    placeholder="Duration (Days)" value={duration.days}
                    onChange={(e) => setDuration({...duration, days: e.target.value})} />
                    <label htmlFor='activity-duration-hours'>Duration (Hours)</label>
                    <input  id="activity-duration-hours" type="number"
                    placeholder="Duration (Hours)" value={duration.hours}
                    onChange={(e) => setDuration({...duration, hours: e.target.value})} />
                </div>
                <button id="closeButton" onClick={() => {setisNewActivity()}}>Close</button>
                <button id ="saveButton" onClick={() => {
                    saveActivity();
                    resetActivity();
                    setisNewActivity();
                }}>Save</button>
                </div>
                </div>
                </>
                
            )
        }
        else {
            return (
                <>
                <div id="container">
                <div id="left">Lets offer some additional activities!</div>
          <div id="right">
            <div id="top">
              {/* <button id="saveAndExit" onClick={props.saveAndExit()}>Save and Exit</button> */}
              
              
            </div>

            <div id="middle_activities">
              <div id="animation_activities">
                <button className = "new_activity" onClick={() => {setisNewActivity()}}> Add New Activity </button>
                {

                    props.activities().map((activity) => {
                        return (
                            <div className="div_activities">
                                <div className="title_activities">
                                {activity.title}
                                </div>
                                <button className="remove_activity" onClick={
                                    () => {
                                        removeActivity(activity.title);
                                    }
                                }>remove</button>
                            </div>
                        )
                        }
                    )
                }
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
          </>
            )
        }
    }

  return (
      <div id="body">
       
            {newActivity(isNewActivity)}
          
        
      </div>
    );
}

export default HostingActivities
