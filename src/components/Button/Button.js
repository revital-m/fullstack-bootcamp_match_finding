import React, { Component } from "react";
import "./Button.css";

class Button extends Component {
  render() {
    return (
      <div className="btn-container">
        <button
          className={`btn ${this.props.categoryBtnClass}`}
          onClick={this.props.handleClick}
          name={this.props.name}
        ></button>
      </div>
    );
  }
}

export default Button;
