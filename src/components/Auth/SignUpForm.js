import React, { Component } from 'react'
import { connect } from 'react-redux'
import { register } from '../../state/auth'

class SignUpForm extends Component {
  initialState = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  }
  state = this.initialState

  onChange = name => e => {
    this.setState({ [name]: e.target.value })
  }
  onSubmit = e => {
    e.preventDefault()
    const newUser = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password
    }
    this.props.register(newUser)
  }
  render() {
    return (
      <form style={{ padding: 50 }}>
        <div className="form-group">
          <label for="firstName">First Name</label>
          <input
            onChange={this.onChange('firstName')}
            type="text"
            className="form-control"
            placeholder="Ex: Oscar"
          />
        </div>
        <div className="form-group">
          <label for="lastName">Last Name</label>
          <input
            onChange={this.onChange('lastName')}
            type="text"
            className="form-control"
            id="inputAddress2"
            placeholder="Ex: Mejia"
          />
        </div>
        <div className="form-group">
          <label for="email">Email</label>
          <input
            onChange={this.onChange('email')}
            type="text"
            className="form-control"
            placeholder="example@mail.com"
          />
        </div>
        <div className="form-group">
          <label for="password">Password</label>
          <input
            onChange={this.onChange('password')}
            type="text"
            className="form-control"
            placeholder="password"
          />
        </div>
        <button
          onClick={this.onSubmit}
          type="submit"
          className="btn btn-primary"
        >
          Register
        </button>
      </form>
    )
  }
}
const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(
  mapStateToProps,
  { register }
)(SignUpForm)
