import React from "react";


export default class App extends React.Component {
 render() {
  return <h1 onClick={this.logHello}>Hello world.</h1>;
 }
 logHello(){
   console.log('Hello');
 }
}
