import React, { useContext, useEffect } from "react";
import { Link } from 'react-router-dom';
import "../../App.css";

import experienceContext from "../../context/experiences/experienceContext";

const Experiences = () => {

  const context = useContext(experienceContext);
  const { experiences, getAllExperiences } = context;

  useEffect(() => {
    getAllExperiences();
    console.log("experiences", experiences);
  }, []);

  return (
    <div>
      <div className="container">
        <br />

        <h1 className="text-center">Experiences</h1>
        <div className="row my-10">
          {experiences.map((experience, index) => (
            <div className="col-lg-4 mb-4">
              <div className="card-style-5 ">
                <img src={experience.hostingPhotos[0]} alt="" className="card-img-top" />


                <div className="card-body">
                  <h5 className="card-title">{experience.hostingTitle}</h5>
                  <p className="card-text">Location (calculated from map)</p>
                  <div className="card-text d-flex w-100 justify-content-between">
                    <h8 className="mb-1"> Cost: {experience.totalCost}</h8>
                    <Link to={`/experiences/${experience._id}`} >
                      <h1 ><strong> &#10132;</strong>
                      </h1>
                    </Link>

                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

  );
};

export default Experiences;
