import React, { Component } from "react";
import axios from 'axios';
import { Button } from 'semantic-ui-react';
import CreateForm from './createForm'
import Todo from './todo'

export default class App extends Component {

  constructor() {
    super()
    this.state = { todos: [] }
    this.updateTodos = this.updateTodos.bind(this)
  }

  async componentDidMount() {
    const { data } = await axios.get('/api/todos')
    this.setState({ todos: data })
  }

  updateTodos(todos) {
    this.setState({ todos })
  }

  render () {
    return (
      <div id="main">
        <h1>My Fuckin' Todos:</h1>
        <div id="todos">
          {
            this.state.todos.map(todo => (
              <Todo
                key={todo.id}
                todo={todo}
                updateTodos={this.updateTodos}
              />
            ))
          }
        </div>
        <CreateForm updateTodos={this.updateTodos} />
      </div>
    );
  }
}
