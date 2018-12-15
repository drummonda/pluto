import React, { Component } from "react"
import axios from "axios"
import { Form, Button } from "semantic-ui-react"

export default class CreateForm extends Component {

  constructor() {
    super()
    this.state = {
      input: ""
    }
  }

  async handleChange(evt) {
    const { target: { value } } = evt
    this.setState({ input: value })
  }

  async handleSubmit(evt) {
    evt.preventDefault()
    const { input } = this.state
    const { data } = await axios.post('/api/todos', { name: input })
    this.setState({
      input: ""
    })
    this.props.updateTodos(data)
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit.bind(this)} className="todo-form">
        <Form.Field>
          <label>Add a to-do</label>
          <input
            placeholder="do laundry"
            value={this.state.input}
            onChange={this.handleChange.bind(this)}
          />
        </Form.Field>
      </Form>
    )
  }
}
