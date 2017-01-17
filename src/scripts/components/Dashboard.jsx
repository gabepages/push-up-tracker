import React from "react";

//file imports
import StartSection from "./StartSection.jsx"
import GraphSection from "./GraphSection.jsx"

export default class Dashboard extends React.Component {
  constructor(props){
    super(props);
    let user = props.firebase.auth().currentUser;
    let database = props.firebase.database().ref('users/' + user.uid + "/pushUpStats");
    this.state = {
      user: user,
      textValue:'',
      database: database,
      stats: null,
      editingData: false
    }
  }
  componentWillMount(){
    this.checkForStats();
  }
  updateTextValue(name, e){
    if(typeof name == "string"){
      this.setState({[name]: e.target.value})
    }else{
      this.setState({textValue: name.target.value})
    }
  }
 render() {
   if(this.state.user){
     return(
       <div className='container'>
         <div className="row dashboard">
           <div className='col s12 m4'>
             <StartSection
               updateTextValue={this.updateTextValue.bind(this)}
               textValue={this.state.textValue}
               setStartValue={this.setStartValue.bind(this)}
               stats={this.state.stats}
               setStats={this.setStats}
               database={this.state.database}
               editData={(e) => this.setState({editingData: !this.state.editingData})}
               editingData={this.state.editingData}
               state={this.state}
               checkForStats={this.checkForStats.bind(this)}
               clearField={this.clearField.bind(this)}
               />

           </div>
           <div className='col s12 m8'>
             <GraphSection
               signOutUser={this.signOutUser.bind(this)}
               stats={this.state.stats}
               database={this.state.database}
               />

           </div>
         </div>
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
   this.state.database.push(this.state.textValue);
   this.setState({textValue: ''})
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
 clearField(field){
   this.setState({[field]: ''})
 }
}
