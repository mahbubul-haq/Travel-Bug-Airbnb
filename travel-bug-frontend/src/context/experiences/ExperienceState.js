import ExperienceContext from "./experienceContext";
import { useState } from "react";

const ExperienceState = (props) => {
    const host = 'http://localhost:5000';

    const experiencesInitial = [];
    const [experiences, setExperiences] = useState(experiencesInitial);
    const [categories, setCategories] = useState([]);

    const getAllExperiences = async () => {
        const response = await fetch(`${host}/experience/all`, {
            method: "GET",
        });

        const data = await response.json();
        console.log(data)
        setExperiences(data);
    }

    const getAllCategories = async () => {
        const response = await fetch(`${host}/experience/categories`, {
          method: "GET",
        });

        const data = await response.json();
        // console.log("categories", data);
        setCategories(data);
    }

    return (
        <ExperienceContext.Provider value={{ experiences, getAllExperiences, categories, getAllCategories }}>
            {props.children}
        </ExperienceContext.Provider>
    )
}

export default ExperienceState;