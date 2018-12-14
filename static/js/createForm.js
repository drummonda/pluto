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
    console.log("input", input)
    const { data } = await axios.post('/api/todos', { name: input })
    window.alert(`created todo = ${input}`)
    this.setState({
      input: ""
    })
    this.props.updateTodos(data)
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit.bind(this)}>
        <Form.Field>
          <label>Todo Name</label>
          <input
            placeholder="Make a todo"
            value={this.state.input}
            onChange={this.handleChange.bind(this)}
          />
          <Button type="submit">
            Create!!!
          </Button>
        </Form.Field>
      </Form>
    )
  }
}
