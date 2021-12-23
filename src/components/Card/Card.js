import React, { Component } from "react";
import "./Card.css";

class Card extends Component {
  render() {
    return (
      <div className="card">
        <img
          className="cardImg"
          src={this.props.imgSrc}
          alt={this.props.title}
        ></img>
        <div className="cardInfo">
          <h1>{this.props.title}</h1>
        </div>
      </div>
    );
  }
}

export default Card;
