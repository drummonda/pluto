import React, { Component } from "react";
import axios from 'axios';
import { Button } from 'semantic-ui-react';
import CreateForm from './createForm'

export default class App extends Component {

  constructor() {
    super()
    this.state = { todos: [] }
    this.handleDelete = this.handleDelete.bind(this)
    this.updateTodos = this.updateTodos.bind(this)
  }

  async componentDidMount() {
    const { data } = await axios.get('/api/todos')
    this.setState({ todos: data })
  }

  async handleDelete(id) {
    // const { data } = await axios.delete(`/api/todos/${id}`)
    // this.setState({ todos: data })
    window.alert(`deleted!! id= ${id}`)
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
              <div key={todo.id}>
                <h3>{todo.name}</h3>
                <Button
                  onClick={() => this.handleDelete(todo.id)}
                >
                  Delete!
                </Button>
              </div>
            ))
          }
        </div>
        <CreateForm updateTodos={this.updateTodos} />
      </div>
    );
  }
}
