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
  componentWillMount(){
    this.checkForStats();
  }
 render() {
   if(this.state.user){
     return(
       <div>
         <StartValue
           updateTextValue={(e) => this.setState({textValue: e.target.value})}
           textValue={this.state.textValue}
           setStartValue={this.setStartValue.bind(this)}
           stats={this.state.stats}
           setStats={this.setStats}
           database={this.state.database}
           />
         <button onClick={this.signOutUser.bind(this)} className='waves-effect waves-light btn cyan darken-2'>Sign Out <i className='material-icons left'>lock_outline</i></button>
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
   });
   this.checkForStats();
 }
 checkForStats(){
   this.state.database.once("value").then((snapshot) => {
     if(snapshot.val() != null){
       this.setState({
         stats: snapshot.val()
       });
     }
   });
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
          className='waves-effect waves-light btn cyan darken-2'
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
          className='waves-effect waves-light btn cyan darken-2'
          />
      </form>
    );
  }
}
