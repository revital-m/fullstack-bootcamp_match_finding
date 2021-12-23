import React, { Component } from "react";
import images from "./api/images";
import "./App.css";
import Button from "./components/Button/Button";
import Spinner from "./components/Spinner/Spinner";
import Card from "./components/Card/Card";

class App extends Component {
  state = {
    data: null,
    isError: false,
    isLoading: false,
    counterLike: 0,
    counterDislike: 0,
    dataIdx: 0,
  };

  getData = async () => {
    try {
      const res = await images.get("/animal");
      this.setState({ data: res.data, isLoading: false });
    } catch (error) {
      this.errMsg(error.message);
    }
  };

  errMsg = (error) => {
    this.setState({ isError: true });
    return <p>{error}</p>;
  };

  componentDidMount() {
    this.setState({ isLoading: true });
    this.getData();
  }

  displayCard = () => {
    return (
      <Card
        id={this.state.data[this.state.dataIdx].id}
        imgSrc={this.state.data[this.state.dataIdx].imgUrl}
        title={this.state.data[this.state.dataIdx].name}
      />
    );
  };

  handleClick = (e) => {
    console.log(e.target);
    if (this.state.dataIdx < this.state.data.length - 1) {
      this.setState((prevState) => {
        return {
          dataIdx: prevState.dataIdx + 1,
          counterLike:
            e.target.name === "like"
              ? prevState.counterLike + 1
              : prevState.counterLike,
          counterDislike:
            e.target.name === "dislike"
              ? prevState.counterDislike + 1
              : prevState.counterDislike,
        };
      });
    } else {
      this.setState((prevState) => {
        return {
          dataIdx: 0,
          counterLike:
            e.target.name === "like"
              ? prevState.counterLike + 1
              : prevState.counterLike,
          counterDislike:
            e.target.name === "dislike"
              ? prevState.counterDislike + 1
              : prevState.counterDislike,
        };
      });
    }
  };

  render() {
    return (
      <div className="container">
        {this.state.isError && this.errMsg}
        <div className="counters-container">
          <div className="counters__info">
            <i className="fas fa-frown"></i>
            <p>{this.state.counterDislike}</p>
          </div>
          <div className="counters__info">
            <p>{this.state.counterLike}</p>
            <i className="fas fa-grin-hearts"></i>
          </div>
        </div>
        <main className="card-container">
          {this.state.isLoading && <Spinner />}
          {this.state.data && this.displayCard()}
        </main>
        <div className="btns-container">
          <Button
            categoryBtnClass="btn-red"
            handleClick={this.handleClick}
            name="dislike"
          />
          <Button
            categoryBtnClass="btn-green"
            handleClick={this.handleClick}
            name="like"
          />
        </div>
      </div>
    );
  }
}

export default App;
