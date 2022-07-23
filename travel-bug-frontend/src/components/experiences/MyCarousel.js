import React, { Component } from "react";
import ReactCardCarousel from "react-card-carousel";

class MyCarousel extends Component {
  static get CONTAINER_STYLE() {
    return {
      position: "relative",
      height: "100vh",
      width: "100%",
      display: "flex",
      flex: 1,
      justifyContent: "center",
      alignItems: "flex-start"
    };
  }

  static get CARD_STYLE() {
    return {
      height: "400px",
      width: "320px",
      textAlign: "center",
      background: "#ffffff",
      color: "#006699",
      fontFamily: "sans-serif",
      fontSize: "16px",
      textTransform: "uppercase",
      borderRadius: "10px",
      boxSizing: "border-box",
      margin: "40px 330px",
      boxShadow: "0px 2px 22px -3px rgba(0,0,0,0.27)"
    };
  }

  static get CARD_STYLE_Heading() {
    return {
      background: "#006699",
      color: "#ffffff",
      fontFamily: "sans-serif",
      fontSize: "18px",
      padding: "20px",
      boxSizing: "border-box",
      borderRadius: "10px 10px 0 0"
    };
  }

  render() {
    return (
      <div style={MyCarousel.CONTAINER_STYLE}>
        <ReactCardCarousel autoplay={false} autoplay_speed={5000}>
          <div style={MyCarousel.CARD_STYLE}>
            <div style={MyCarousel.CARD_STYLE_Heading}>Heading</div>
            First Card
          </div>
          <div style={MyCarousel.CARD_STYLE}>
            <div style={MyCarousel.CARD_STYLE_Heading}>Heading</div>
            Second Card
          </div>
          <div style={MyCarousel.CARD_STYLE}>
            <div style={MyCarousel.CARD_STYLE_Heading}>Heading</div>
            Third Card
          </div>
          <div style={MyCarousel.CARD_STYLE}>
            <div style={MyCarousel.CARD_STYLE_Heading}>Heading</div>
            Fourth Card
          </div>
          <div style={MyCarousel.CARD_STYLE}>
            <div style={MyCarousel.CARD_STYLE_Heading}>Heading</div>
            Fifth Card
          </div>
        </ReactCardCarousel>
      </div>
    );
  }
}

export default MyCarousel;
