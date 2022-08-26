import React, { useContext, useEffect, useState } from "react";
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import "../../App.css";
import "./search.css";

import experienceContext from "../../context/experiences/experienceContext";

const Experiences = () => {
  const context = useContext(experienceContext);
  const { experiences, getAllExperiences, categories, getAllCategories } = context;

  const [search, setSearch] = useState({ checkin: '', checkout: '', location: '', hostingTitle:'', lguests: '', maxCost: '' });
  const [filteredExperiences, setFilteredExperiences] = useState(experiences);

  const [checkedCategories, setCheckedCategories] = useState([]);


  useEffect(() => {
    getAllExperiences();
    getAllCategories();
  }, []);

  const filterExperiences = async () => {
    //hostingTitle filter
    let updatedExperiences = experiences;
    if (search.hostingTitle !== '') {
      updatedExperiences = updatedExperiences.filter(experience => experience.hostingTitle.toLowerCase().includes(search.hostingTitle.toLowerCase()));
    }
    
    // category filter
    if(checkedCategories.length > 0){
      updatedExperiences = updatedExperiences.filter(experience => {
        for(let i = 0; i < checkedCategories.length; i++){
          for(let j = 0; j < experience.categories.length; j++){
            if(experience.categories[j] === checkedCategories[i]._id){
              return true;
            }
          }
        }
        return false;
      }
      );
      console.log("checkedCategories", checkedCategories);
    }

    //checkin filter
    if (search.checkin !== '') {
      const checkinDate = Date.parse(search.checkin);
      updatedExperiences = updatedExperiences.filter(experience => Date.parse(experience.hostingDate) >= checkinDate);
    }

    //checkout filter
    if (search.checkout !== '') {
      const checkoutDate = Date.parse(search.checkout);
      updatedExperiences = updatedExperiences.filter(experience => Date.parse(experience.hostingDate) <= checkoutDate);
    }

    //lguests filter
    if (search.lguests !== '') {
      updatedExperiences = updatedExperiences.filter(experience => experience.maxGroupSize >= search.lguests);
    }

    //maxCost filter
    if (search.maxCost !== '') {
      updatedExperiences = updatedExperiences.filter(experience => experience.totalCost <= search.maxCost);
    }

    setFilteredExperiences(updatedExperiences);
  }

  useEffect(() => {
    filterExperiences();
  } , [search, checkedCategories]);


  const onChange = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
  }


  const handleChecked = e => {
    const category = categories[e.target.dataset.id];
    let newCheckedCategories = checkedCategories.filter(item => item !== category);
    if (e.target.checked) newCheckedCategories.push(category);
    setCheckedCategories(newCheckedCategories);
  };

  const renderPage = (list) => {
    return (
      <div className="container">
        <div className='container my-3'>
          <form action="" method="get">
            <div className="product-search">
              <div className="search-element">
                <label className="search-label">Checkin Date?</label>
                <input className="search-input" type="date" autocomplete="on" name="checkin" value={search.checkin} onChange={onChange}/>
              </div>
              <div className="search-element">
                <label className="search-label">Checkout Date?</label>
                <input className="search-input" type="date" autocomplete="on" name="checkout" value={search.checkout} onChange={onChange}/>
              </div>
              <div className="search-element">
                <label className="search-label">Where to Go?</label>
                <input className="search-input" type="text" placeholder="Enter Your Location" autocomplete="on" name="location" value={search.location} onChange={onChange} />
              </div>
              <div className="search-element">
                <label className="search-label">Theme of Experience?</label>
                <input className="search-input" type="text" placeholder="Enter theme" autocomplete="on" name="hostingTitle" value={search.hostingTitle} onChange={onChange} />
              </div>
              <div className="search-element">
                <label className="search-label">How Many People?</label>
                <input className="search-input" type="number" placeholder="Enter team size" autocomplete="on" name="lguests" value={search.lguests} onChange={onChange} min="0"/>
              </div>
              <div className="search-element">
                <label className="search-label">Maximum Cost</label>
                <input className="search-input" type="number" placeholder="Enter max cost" autocomplete="on" name="maxCost" value={search.maxCost} onChange={onChange} min="0"/>
              </div>
              {/* <Button type="submit" className="search-button">Search</Button> */}
            </div>
          </form>
        </div>
        <div className="container">
        {categories.map((category, id) => (
        <label key={id}  className="mx-3">
          <input type="checkbox" data-id={id} onClick={handleChecked} /> {category.categoryName}
        </label>
      ))}
        </div>
        <br />
        <h2 className="text-center">Experiences</h2>
        <h5 className="text-center">Searching...  Theme: {search.hostingTitle} | Guest No: {search.lguests} | {checkedCategories.join(", ")}</h5>
        <div className="row my-10">
          {list.map((experience, index) => (
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
    )
  }

  const renderMain = ()=>{
    if(search.hostingTitle === '' && search.checkin === '' && search.checkout === '' && search.lguests === '' && search.maxCost === ''  && checkedCategories.length === 0){
      return renderPage(experiences);
    } else {
      return renderPage(filteredExperiences);
    }
  }

  return (
    <div>
      {/* {search.location === ''  ? renderPage(experiences) : renderPage(filteredExperiences)} */}
      {renderMain()}
    </div>

  );
};

export default Experiences;
