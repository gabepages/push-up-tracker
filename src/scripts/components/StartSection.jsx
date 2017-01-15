import React from "react";


export default class StartSection extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    if(this.props.stats !== null){
      let newArry = new Array;
      let days = new Array;
      Object.keys(this.props.stats).map(key => newArry.push(this.props.stats[key]))
      newArry = newArry.map(item => {return parseInt(item)});
      let tableBody = newArry.map((item, index) =>{
        return(
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{item}</td>
          </tr>
        )
      });
      let startValue = newArry[0]
      let bestValue = newArry.reduce((previous, current) =>{
        if (current >= previous){
          return current
        }
        return previous
      });
      let averageValue = newArry.reduce((previous, current) =>{return previous + current});
      averageValue = averageValue / newArry.length
      averageValue = Math.round( averageValue * 10 ) / 10;
      return (
        <div className='text-left'>
          <h5>Starting Value: {startValue}</h5>
          <h5>Best Value: {bestValue}</h5>
          <h5>Average Value: {averageValue}</h5>
          <div className='divider margin-tb'></div>
          <h5>Add Push-Ups</h5>
          <form className='inline-form' onSubmit={this.props.setStartValue}>
            <input
              type='text'
              value={this.props.textValue}
              onChange={this.props.updateTextValue}
              placeholder="Today's Push-up Total"
              />
            <input
              type='submit'
              value='Add'
              className='waves-effect waves-light btn cyan darken-2'
              />
          </form>
          <div className='divider margin-tb'></div>
          <table>
            <thead>
              <tr>
                <th data-field="id">Day</th>
                <th data-field="name">Push-Ups</th>
              </tr>
            </thead>
            <tbody>
              {tableBody}
            </tbody>
          </table>
        </div>
      )

    }
    return(
      <form onSubmit={this.props.setStartValue} className='inline-form'>
        <input
          type='text'
          value={this.props.textValue}
          onChange={this.props.updateTextValue}
          placeholder='Staring # of Push-Ups'
          />
        <input
          type='submit'
          value='Add'
          className='waves-effect waves-light btn cyan darken-2'
          />
      </form>
    );
  }
}
