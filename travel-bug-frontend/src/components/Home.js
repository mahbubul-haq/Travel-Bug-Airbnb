import React from "react";
import "../App.css";
const Home = () => {
  return (
    <div className="container">
      <br />
      <br />
      <center>
        <form className="d-flex">
          <div className="form-group mb-2">
            <input type="text" className="form-control" placeholder="Search" />
          </div>
          <button type="submit" className="btn btn-primary mb-2">
            Search
          </button>
        </form>
      </center>
    </div>
  );
};

export default Home;
