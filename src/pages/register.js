import React, { Component } from 'react'
import SignUpForm from '../components/Auth/SignUpForm'
import Layout from 'components/Layout'

class Register extends Component {
  render() {
    const { location, data } = this.props

    return (
      <div>
        <Layout location={location}>
          <h1>Register Page:</h1>
          <SignUpForm />
        </Layout>
      </div>
    )
  }
}

export default Register
