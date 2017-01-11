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
    <div className='container'>
      <div className='row'>
        <div className='col l4 offset-l4 s6 offset-s3 margin-tb'>
          <h4>Sign Up</h4>
          <form onSubmit={this.signUp.bind(this)}>
            <input
              type='email'
              value={this.state.SUEmailValue}
              onChange={(e) => this.setState({ SUEmailValue: e.target.value })}
              placeholder='Email'
              />
            <input
              type='password'
              value={this.state.SUPasswordValue}
              onChange={(e) => this.setState({ SUPasswordValue: e.target.value })}
              placeholder='Password'
              />
            <input
              type='submit'
              value='Sign Up'
              className='btn waves-effect waves-light cyan darken-2'
              />
          </form>
        </div>
      </div>
      <div className='row'>
        <div className='col l4 offset-l4 s6 offset-s3 margin-tb'>
          <h4>Login</h4>
            <form onSubmit={this.login.bind(this)}>
              <input
                type='email'
                value={this.state.LIEmailValue}
                onChange={(e) => this.setState({ LIEmailValue: e.target.value })}
                placeholder='Email'
                />
              <input
                type='password'
                value={this.state.LIPasswordValue}
                onChange={(e) => this.setState({ LIPasswordValue: e.target.value })}
                placeholder='Password'
                />
              <input
                type='submit'
                value='Login'
                className='btn waves-effect waves-light cyan darken-2'
                />
            </form>
        </div>
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
