import axios from 'axios'
import React, {Component} from 'react'
import {Button, Form, Input, Select} from 'semantic-ui-react'

const FRAMEWORK_OPTIONS = [
  {text: 'Angular', value: 'angular'},
  {text: 'Ember', value: 'ember'},
  {text: 'React', value: 'react'},
  {text: 'Vue', value: 'vue'}
]

export default class VoteForm extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      vote: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange = (e, {name, value}) => this.setState({[name]: value})

  handleSubmit = async e => {
    e.preventDefault()
    const {email, vote} = this.state
    await axios.put('/api/user', {email, vote})
  }

  render() {
    const {email, vote} = this.state
    return (
      <div>
        <h1>Submit Your Vote</h1>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Input
              placeholder="Enter Your Email"
              name="email"
              value={email}
              onChange={this.handleChange}
            />
            <Select
              placeholder="Select Your Framework"
              name="vote"
              value={vote}
              options={FRAMEWORK_OPTIONS}
              onChange={this.handleChange}
            />
            <Button content="Submit" type="submit" />
          </Form.Group>
        </Form>
      </div>
    )
  }
}
