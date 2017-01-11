import React from "react";

import Header from "./Header.jsx";
import Login from "./Login.jsx";
import Dashboard from "./Dashboard.jsx";

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      "screenState": 'login'
    }
  }
  changeScreenState(screen){
    this.setState({
      screenState: screen
    })
  }
 render() {
   if (this.state.screenState == "login"){
     return (
       <div>
         <Header/>
         <Login
           firebase={this.props.firebase}
           changeScreenState={this.changeScreenState.bind(this)}
         />
       </div>
     );
   }
   return (
     <div>
       <Header/>
       <Dashboard
         firebase={this.props.firebase}
         changeScreenState={this.changeScreenState.bind(this)}
       />
     </div>
   );
 }
}
