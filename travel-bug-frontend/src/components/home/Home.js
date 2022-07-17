import React from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import guideline from "../../images/guideline.jpg";
import travel from "../../images/travel.jpg";
import './home.css';
import SearchBar from "../search/SearchBar";
const Home = () => {
  let navigate = useNavigate();
  const handleGuideline = (e) => {
    e.preventDefault();
    navigate("/transportguidelines");
  }
  const handleExperiences = (e) => {
    e.preventDefault();
    navigate("/experiences");
  }
  return (
    <div className="container">
      <br />
      <SearchBar/>
      <br />
      <br />
      <center>
        <Card className="card-style-10">
          <Card.Img variant="top" src={travel} />
          <Card.ImgOverlay>
            <Card.Body><center><h1>Not Sure Where to Go?</h1></center></Card.Body>

          </Card.ImgOverlay>
          <Card.Footer><center><Button variant="outline-dark" className="btn-lg" onClick={handleExperiences}>I'm Flexible</Button></center></Card.Footer>
        </Card>

        <br />
        <br />

        <Card className="card-style-10">
          <Card.Img variant="top" src={guideline} />
          <Card.ImgOverlay>
            <Card.Footer><center><h1>Need Guideline to Travel?</h1></center></Card.Footer>

          </Card.ImgOverlay>
          <Card.Footer><center><Button variant="outline-dark" className="btn-lg" onClick={handleGuideline} >Go to Transport Guideline</Button></center></Card.Footer>
        </Card>
      </center>
      <br />
      <br />
      <br />
      <br />

    </div>
  );
};

export default Home;
