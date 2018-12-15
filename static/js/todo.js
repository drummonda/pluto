import React, { Component } from "react"
import axios from "axios"
import { Form, Button } from "semantic-ui-react"

export default class Todo extends Component {

  constructor() {
    super()
    this.state = {
      completed: false
    }
    this.toggleCompleted = this.toggleCompleted.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  async toggleCompleted(id) {
    this.setState({ completed: !this.state.completed })
    const { data } = await axios.put(`/api/todos/${id}/complete`)
    this.props.updateTodos(data)
  }

  async handleDelete(id) {
    const { data } = await axios.delete(`/api/todos/${id}`)
    this.props.updateTodos(data)
  }

  render() {
    const { todo } = this.props
    const { completed } = this.state
    return (
        <div className={completed ? "completed-todo" : "todo"}>
          <h3 className={completed ? 'completed' : ''} >
            {todo.name}
          </h3>
          <div className="images">
            <img
              src={completed ? "../dist/completed_delete.png" : "../dist/delete.png"}
              onClick={() => this.handleDelete(todo.id)}
            />
            <img
              src={completed ? "../dist/completed_check.png" : "../dist/checked.png"}
              onClick={() => this.toggleCompleted(todo.id)}
            />
          </div>
        </div>
    )
  }
}
