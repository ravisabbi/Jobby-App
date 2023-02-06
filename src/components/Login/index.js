import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', errorMessage: '', showErrorMsg: false}

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({errorMessage: errorMsg, showErrorMsg: true})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state

    const url = 'https://apis.ccbp.in/login'

    const userDetails = {username, password}

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onChangeUserName = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {username, password, errorMessage, showErrorMsg} = this.state

    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="log-in-container">
        <form onSubmit={this.submitForm} className="login-form">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
          />
          <div className="field-container">
            <label className="label-element" htmlFor="username">
              USERNAME
            </label>
            <input
              placeholder="USERNAME"
              type="text"
              id="username"
              value={username}
              className="input-element"
              onChange={this.onChangeUserName}
            />
          </div>
          <div className="field-container">
            <label className="label-element" htmlFor="password">
              PASSWORD
            </label>
            <input
              placeholder="PASSWORD"
              type="password"
              id="password"
              value={password}
              className="input-element"
              onChange={this.onChangePassword}
            />
          </div>
          <button className="login-btn" type="submit">
            Login
          </button>
          {showErrorMsg ? (
            <p className="error-message">*{errorMessage}</p>
          ) : null}
        </form>
      </div>
    )
  }
}

export default Login
