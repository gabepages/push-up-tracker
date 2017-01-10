import React from "react";


export default class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      'SUEmailValue':'',
      'SUPasswordValue':'',
      'LIEmailValue': '',
      'LIPasswordValue': ''
    }
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        props.changeScreenState("dashboard");
      }
    });
  }
 render() {

   return (
    <div>
      <h1>Push-up Tracker</h1>
      <div>
        <h2>Sign Up</h2>
        <form onSubmit={this.signUp.bind(this)}>
          <input
            type='email'
            value={this.state.SUEmailValue}
            onChange={(e) => this.setState({ SUEmailValue: e.target.value })}
            />
          <input
            type='password'
            value={this.state.SUPasswordValue}
            onChange={(e) => this.setState({ SUPasswordValue: e.target.value })}
            />
          <input
            type='submit'
            value='Sign Up'
            />
        </form>
      </div>
      <div>
        <h2>Login</h2>
          <form onSubmit={this.login.bind(this)}>
            <input
              type='email'
              value={this.state.LIEmailValue}
              onChange={(e) => this.setState({ LIEmailValue: e.target.value })}
              />
            <input
              type='password'
              value={this.state.LIPasswordValue}
              onChange={(e) => this.setState({ LIPasswordValue: e.target.value })}
              />
            <input
              type='submit'
              value='Login'
              />
          </form>
      </div>
    </div>
   );
 }
 signUp(e) {
   e.preventDefault();
   var email = this.state.SUEmailValue;
   var password = this.state.SUPasswordValue;
   firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorCode, errorMessage);
  });

 }
 login(e){
    e.preventDefault();
    var email = this.state.LIEmailValue;
    var password = this.state.LIPasswordValue;
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorCode, errorMessage);
    });
 }
}
