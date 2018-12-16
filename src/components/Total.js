import React, { Component } from "react";

export default class Total extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: props.total
    };
  }
  render() {
    return (
      <div className="total">
        <h1>{this.state.total}</h1>
      </div>
    );
  }
}
