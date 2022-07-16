import ExperienceContext from "./experienceContext";
import { useState } from "react";

const ExperienceState = (props) => {
    const host = 'http://localhost:5000';

    const experiencesInitial = [];
    const [experiences, setExperiences] = useState(experiencesInitial);

    const getAllExperiences = async () => {
        const response = await fetch(`${host}/experience/all`, {
            method: "GET",
        });

        const data = await response.json();
        console.log(data)
        setExperiences(data);
    }

    return (
        <ExperienceContext.Provider value={{ experiences, getAllExperiences }}>
            {props.children}
        </ExperienceContext.Provider>
    )
}

export default ExperienceState;