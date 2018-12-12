import React, { Component } from "react";
import axios from 'axios';
import { Button } from 'semantic-ui-react';

export default class App extends Component {

  constructor() {
    super();
    this.state = { todos: [] }
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    // const { response: { data } } = await axios.get('/todos');
    // console.log("the data", data);
    // this.setState({ todos: data })
  }

  render () {
    return (
      <div id="main">
        <h1>Running Python and React this is lit as fuckk</h1>
        <Button
          onClick={this.onClick}>
          Click me plz
        </Button>
        <ul>
          { this.state.todos.map(todo => <li>{todo}</li>) }
        </ul>
      </div>
    );
  }
}
