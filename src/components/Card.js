import React, { Component } from "react";

export default class Card extends Component {
  constructor(props) {
    super(props);
    const { date, operations, top } = { ...props };
    this.state = { date, operations, top };
  }
  render() {
    return this.state.operations != null ? (
      <div className="card" style={{ top: this.state.top }}>
        <span>{this.state.date}</span>
        <ListOperation operations={this.state.operations} />
      </div>
    ) : (
      <div className="card empty">
        <h1>Спиоск операций пуст</h1>
      </div>
    );
  }
}

function ListOperation(props) {
  return props.operations.map((operation, index) => (
    <span key={index}>{operation}</span>
  ));
}
