import React from "react";


export default class Dashboard extends React.Component {
  constructor(props){
    super(props);
    let user = props.firebase.auth().currentUser;
    let database = props.firebase.database().ref('users/' + user.uid + "/pushUpStats");
    this.state = {
      user: user,
      textValue:'',
      database: database,
      stats: null
    }
  }
  componentDidMount(){
    this.state.database.once("value").then((snapshot) => {
      if(snapshot.val() != null){
        this.setState({
          stats: snapshot.val()
        });
      }
    });
  }
 render() {
   if(this.state.user){
     return(
       <div>
         <h1>Push-Up Tracker</h1>
         <h3>Welcome {this.state.user.email}</h3>
         <button onClick={this.signOutUser.bind(this)}>Sign Out</button>
         <StartValue
           updateTextValue={(e) => this.setState({textValue: e.target.value})}
           textValue={this.state.textValue}
           setStartValue={this.setStartValue.bind(this)}
           stats={this.state.stats}
           setStats={this.setStats}
           database={this.state.database}
           />
       </div>
     );
   }
   return  <div></div>;
 }
 signOutUser(){
   let self = this;
   firebase.auth().signOut().then(function() {
      self.props.changeScreenState('login');
    }, function(error) {
      alert(error);
    });
 }
 setStartValue(e){
   e.preventDefault()
   this.state.database.set({
     startingPushUp: this.state.textValue
   }).then(() => this.forceUpdate())
 }
}


class StartValue extends React.Component {
  constructor(props){
    super(props);
  }
  render(){

    if(this.props.stats !== null){
      return <h3>Starting Value: {this.props.stats.startingPushUp}</h3>
    }
    return(
      <form onSubmit={this.props.setStartValue}>
        <input
          type='text'
          value={this.props.textValue}
          onChange={this.props.updateTextValue}
          placeholder='Staring # of Push-Ups'
          />
        <input
          type='submit'
          value='Set'
          />
      </form>
    );
  }
}

class LastValue extends React.Component {
  constructor(props){
    super(props);
  }
  render(){

    if(this.props.stats !== null){
      return <h3>Starting Value: {this.props.stats.startingPushUp}</h3>
    }
    return(
      <form onSubmit={this.props.setStartValue}>
        <input
          type='text'
          value={this.props.textValue}
          onChange={this.props.updateTextValue}
          placeholder='Staring # of Push-Ups'
          />
        <input
          type='submit'
          value='Set'
          />
      </form>
    );
  }
}
