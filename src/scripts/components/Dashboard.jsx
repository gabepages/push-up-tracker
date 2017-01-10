import React from "react";


export default class Dashboard extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      currentUser: null,
      database: null,
      inputStartValue:undefined,
      hasStartValue:false
    }
  }
  componentDidMount(){
    let firebase = this.props.firebase;
    let user = firebase.auth().currentUser;
    var database = firebase.database();
    let startValue, hasStartValue;
    firebase.database().ref('users/' + user.uid).once('value', function(snapshot) {
      startValue = snapshot.val().pushUpStartValue;
    });
    if(startValue == null){
      hasStartValue = false
    }else {
      hasStartValue = true
    }
    this.setState({
      currentUser: user,
      database: database,
      hasStartValue: hasStartValue,
      startValue: startValue
    });
  }
 render() {
   if(this.state.currentUser){
     let user = this.state.currentUser
     console.log(this.state);
     return (
       <div>
         <h1>Push-Up Tracker</h1>
         <h3>Welcome {user.email}</h3>
         <StartValue startValue={this.state.startValue} hasStartValue={this.state.hasStartValue} setStartValue={this.setStartValue.bind(this)} handleValueChange={this.handleValueChange.bind(this)}/>
       </div>
     ) ;
   }
   return  <div></div>;
 }
 handleValueChange(e){
   this.setState({inputStartValue : e.target.value })
 }
 setStartValue(e){
   e.preventDefault()
   let uid = this.state.currentUser.uid;
    this.state.database.ref('users/' + uid).set({
      pushUpStartValue: this.state.inputStartValue
    });
    this.setState({
      hasStartvalue:true,
      startValue: this.state.inputStartValue
    })
 }
}


class StartValue extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    console.log('hasStartvalue', this.props.hasStartValue);
    if (this.props.hasStartValue == true){
      return <h3>Start Value: {this.props.startValue}</h3>
    }
    return(
      <form onSubmit={this.props.setStartValue}>
        <input
          type='text'
          value={this.props.inputStartValue}
          onChange={this.props.handleValueChange}
          />
        <input
          type='submit'
          value='Set'
          />
      </form>
    );
  }
}
