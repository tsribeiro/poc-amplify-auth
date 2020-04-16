import React, { Component } from 'react'
import { Auth } from 'aws-amplify';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      passwordNew: '',
      code: '',
      logged: false,
      showCodeConfirmation: false
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleCodeChange = this.handleCodeChange.bind(this)
    this.handlePasswordNewChange = this.handlePasswordNewChange.bind(this)
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleConfirmeSignUp = this.handleConfirmeSignUp.bind(this)
    this.handleChangePassword = this.handleChangePassword.bind(this)
  }

  handleEmailChange(evt) {
    this.setState({ ...this.state, email: evt.target.value });
  }

  handlePasswordChange(evt) {
    this.setState({ ...this.state, password: evt.target.value });
  }

  handlePasswordNewChange(evt) {
    this.setState({ ...this.state, passwordNew: evt.target.value });
  }

  handleCodeChange(evt) {
    this.setState({ ...this.state, code: evt.target.value });
  }

  handleSignIn() {
    //thiago.ribeiro1192@gmail.com
    //Valido@12345
    Auth.signIn(this.state.email, this.state.password)
      .then(({ signInUserSession: { idToken: { jwtToken } } }) => {
        console.log("MeuOvo")
        this.setState({ ...this.state, logged: true })
      })
      .catch(e => {
        console.log(e)
      });
  }

  handleSignUp() {
    Auth.signUp({
      username: this.state.email,
      password: this.state.password
    })
      .then(data => {
        console.log(data)
        this.setState({ ...this.state, showCodeConfirmation: true })
      })
      .catch(err => console.log(err));
  }

  handleConfirmeSignUp() {
    Auth.confirmSignUp(this.state.email, this.state.code)
      .then(data => {
        console.log(data)
        alert('Criado')
      })
      .catch(err => console.log(err));
  }

  handleChangePassword() {
    Auth.currentAuthenticatedUser()
      .then(user => {
        return Auth.changePassword(user, this.state.password, this.state.passwordNew);
      })
      .then(data => {
        console.log(data)
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <fieldset>
          <legend>SignUp:</legend>
          <div>
            <label>
              Email:
              <input type="text" value={this.state.value} onChange={this.handleEmailChange} />
            </label>
          </div>
          <div>
            <label>
              Password:
              <input type="password" value={this.state.value} onChange={this.handlePasswordChange} />
            </label>
          </div>
          {this.state.showCodeConfirmation ? <div>
            <label>
              Codigo:
              <input type="text" value={this.state.value} onChange={this.handleCodeChange} />
            </label>
            <div>
              <input type="submit" value="Confirmar" onClick={this.handleConfirmeSignUp} />
            </div>
          </div> : <div>
              <input type="submit" value="Criar" onClick={this.handleSignUp} />
            </div>}




        </fieldset>
        {!this.state.logged ?
          <fieldset>
            <legend>SignIn:</legend>
            <div>
              <label>
                Email:
              <input type="text" value={this.state.value} onChange={this.handleEmailChange} />
              </label>
            </div>
            <div>
              <label>
                Password:
              <input type="password" value={this.state.value} onChange={this.handlePasswordChange} />
              </label>
            </div>
            <div>
              <input type="submit" value="logar" onClick={this.handleSignIn} />
            </div>
          </fieldset>
          :
          <fieldset>
            <legend>Change Password:</legend>
            <div>
              <label>
                Password Old:
              <input type="password" value={this.state.value} onChange={this.handlePasswordChange} />
              </label>
            </div>
            <div>
              <label>
                Password New:
              <input type="password" value={this.state.value} onChange={this.handlePasswordNewChange} />
              </label>
            </div>
            <div>
              <input type="submit" value="Salvar" onClick={this.handleChangePassword} />
            </div>
          </fieldset>
        }
      </div>
    )

  }
}

export default Login