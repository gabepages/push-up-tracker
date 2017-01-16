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
          <PushUpTable
            stats={this.props.stats}
            editData={this.props.editData}
            editingData={this.props.editingData}
            updateTextValue={this.props.updateTextValue}
            textValue={this.props.textValue}
            />
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

class PushUpTable extends React.Component {
  constructor(props){
    super(props);
  }
  sendEditedData(data, key){
    console.log(data,key, this.props.textValue);
  }

  render(){
    let tableBody = Object.keys(this.props.stats).map((key, index, array) => {
        return (
            <tr key={index}>
               <td>{index + 1}</td>
               <td>{this.props.stats[key]}</td>
            </tr>
        )
    });
    // if(this.props.editingData != false){
    //   let tableBody = Object.keys(this.props.stats).map((key, index, array) => {
    //       return (
    //           <tr key={index}>
    //              <td>{index + 1}</td>
    //              <td>{this.props.stats[key]}</td>
    //              <td>
    //                <input
    //                type='text'
    //                value={this.props.textValue.key}
    //                onChange={this.props.updateTextValue}
    //                onSubmit={this.sendEditedData.bind(key)}
    //                placeholder='Edit Push-Ups'
    //                />
    //              </td>
    //           </tr>
    //       )
    //   });
    //   return(
    //     <div>
    //       <table>
    //         <thead>
    //           <tr>
    //             <th data-field="id">Day</th>
    //             <th data-field="name">Push-Ups</th>
    //           </tr>
    //         </thead>
    //         <tbody>
    //           {tableBody}
    //         </tbody>
    //       </table>
    //       <div className='button-section'>
    //         <button onClick={this.props.editData} className='waves-effect waves-light btn cyan darken-2'>Done</button>
    //       </div>
    //     </div>
    //   )
    // }

    return(
      <div>
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
        <div className='button-section'>
          <button className='waves-effect waves-light btn cyan darken-2'>Edit Push-Ups <i className='material-icons left'>mode_edit</i></button>
        </div>
      </div>
    )
  }
}
