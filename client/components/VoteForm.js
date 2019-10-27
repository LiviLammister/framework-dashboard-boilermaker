import axios from 'axios'
import React, {Component} from 'react'
import {Form, Dropdown} from 'formsy-semantic-ui-react'
import {Label} from 'semantic-ui-react'

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
    const {email, vote} = this.state
    await axios.put('/api/user', {email, vote})
  }

  render() {
    const {email, vote} = this.state
    const errorLabel = <Label color="red" pointing />
    return (
      <div>
        <h1>Submit Your Vote</h1>
        <Form onValidSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Input
              required
              name="email"
              placeholder="Enter Your Email"
              validations="isEmail"
              validationErrors={{
                isEmail: 'This is not a valid email',
                isDefaultRequiredValue: 'Email is Required'
              }}
              value={email}
              onChange={this.handleChange}
            />
            <Dropdown
              name="vote"
              placeholder="Select Framework"
              label="Framework"
              required
              search
              selection
              validationErrors={{
                isDefaultRequiredValue: 'You need to select a product'
              }}
              errorLabel={errorLabel}
              options={FRAMEWORK_OPTIONS}
              value={vote}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Button content="Submit" color="green" />
        </Form>

        {/* <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Input
              placeholder="Enter Your Email"
              name="email"
              label="Email"
              validations="isEmail"
              validationErrors={{
                isEmail: 'This is not a valid email',
                isDefaultRequiredValue: 'Email is Required',
              }}
              errorLabel={ errorLabel }
              value={email}
              onChange={this.handleChange}
            />
            <Select
              name="vote"
              value={vote}
              options={FRAMEWORK_OPTIONS}
              onChange={this.handleChange}
            />
            <Button content="Submit" type="submit" />
          </Form.Group>
        </Form> */}
      </div>
    )
  }
}
