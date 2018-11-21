import React, { Component } from 'react'

class Login extends Component {
  initialState = {
    userName: '',
    password: ''
  }
  state = this.initialState

  onChange = e => {}
  onSubmit = e => {}

  render() {
    return (
      <form>
        <div className="form-group">
          <label for="formGroupExampleInput">Example label</label>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleInput"
            placeholder="Example input"
          />
        </div>
      </form>
    )
  }
}

export default Login
