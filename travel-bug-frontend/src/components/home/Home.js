import React from "react";
import { Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import guideline from "../../images/guideline.jpg";
import travel from "../../images/travel.jpg";
import './home.css';
const Home = () => {
  let navigate = useNavigate();
  
  return (
    <div className="container">
      <center>
        <Card className="card-style-10">
          <Card.Img variant="top" src={travel} />
          <Card.ImgOverlay>
            <Card.Body><center><h1>Not Sure Where to Go?</h1></center></Card.Body>

          </Card.ImgOverlay>
          </Card>
          <center><Link variant="outline-dark" className="btn btn-lg" to='/experiences'>I'm Flexible</Link></center>
        

        <br />
        <br />

        <Card className="card-style-10">
          <Card.Img variant="top" src={guideline} />
          <Card.ImgOverlay>
            <Card.Footer><center><h1>Need Guideline to Travel?</h1></center></Card.Footer>

          </Card.ImgOverlay>
          </Card>
          <center><Link variant="outline-dark" className="btn btn-lg" to='/transportguidelines' >Go to Transport Guideline</Link></center>
        
      </center>
      <br />
      <br />
      <br />
      <br />

    </div>
  );
};

export default Home;
