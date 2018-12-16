import React, { Component } from "react";
import ReactDOM from "react-dom";
import Total from "./components/Total";
import Card from "./components/Card";
import mock from "./mock";

import "./styles.scss";

class App extends Component {
  constructor(props) {
    super(props);
    this.cardsComponent = React.createRef();
  }
  render() {
    return (
      <div className="app">
        <Total total="130 250, 30 ₽" />
        <div className="cards">
          <CardOperations data={mock} ref={this.cardsComponent} />
        </div>
      </div>
    );
  }
}

class CardOperations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      top: 0,
      cardsBlock: null,
      data: props.data,
      offset: 0
    };
    this.handleScroll = this.handleScroll.bind(this);
  }
  componentDidMount() {
    let cardsBlock = document.querySelector(".cards");
    cardsBlock.addEventListener("scroll", this.handleScroll);
  }
  componentWillUnmount() {
    let cardsBlock = document.querySelector(".cards");
    cardsBlock.removeEventListener("scroll", this.handleScroll);
  }
  handleScroll(event) {
    let cardsVisible = Array.from(
        document.querySelectorAll(".card:not(.hidden)")
      ),
      cardsHidden = Array.from(document.querySelectorAll(".card.hidden")),
      topThirdCard = cardsVisible[3].getBoundingClientRect().top,
      difference = topThirdCard - 15;
    console.log(
      "Разница между первым элементом ",
      cardsVisible[0],
      "и четвертым ",
      cardsVisible[3],
      "равна ",
      difference
    );
    if (this.state.offset > event.currentTarget.scrollTop) {
      this.setState({
        offset: event.currentTarget.scrollTop
      });
      if (difference > 300 && cardsHidden.length > 0) {
        console.log("Видимые карты", cardsVisible);
        console.log("Невидимые карты", cardsHidden);
        this.moveCards(cardsVisible, "down");
        let lastIndex = cardsHidden.length - 1;
        cardsHidden[lastIndex].style.top = "15px";
        cardsHidden[lastIndex].classList.remove("hidden");
        cardsVisible.unshift(cardsHidden.pop());
      }
    } else if (this.state.offset < event.currentTarget.scrollTop) {
      this.setState({
        offset: event.currentTarget.scrollTop
      });
      if (difference < 100) {
        cardsVisible[0].style.top = "30px";
        cardsVisible[0].classList.add("hidden");
        cardsHidden.push(cardsVisible.shift());
        this.moveCards(cardsVisible, "up");
      }
    }
  }
  moveCards(cards, direction) {
    cards.forEach(card => {
      let top = card.style.top;
      let topNumber = Number(top.replace(/[px]/gi, ""));
      if (direction === "up") topNumber = topNumber - 15;
      else if (direction === "down") topNumber = topNumber + 15;
      card.style.top = `${topNumber}px`;
    });
  }
  render() {
    let data = this.state.data;
    let top = this.state.top;
    return data.map(card => {
      top = top + 15;
      return <Card {...card} top={top} key={top} />;
    });
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App name="Uliyan" />, rootElement);
