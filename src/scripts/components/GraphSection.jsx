import React from "react";
import Chart from 'chart.js'


export default class GraphSection extends React.Component {
  constructor(props){
    super(props);

  }
  componentDidMount(){
    var ctx = document.getElementById("lineChart");
    var data = {
      labels: ['1','2','3','4','5'],
      datasets: [
          {
              fill: false,
              lineTension: 0.1,
              backgroundColor: "rgba(75,192,192,0.4)",
              borderColor: "rgba(75,192,192,1)",
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: "rgba(75,192,192,1)",
              pointBackgroundColor: "#fff",
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "rgba(75,192,192,1)",
              pointHoverBorderColor: "rgba(220,220,220,1)",
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: [106, 170, 120, 130, 100],
              spanGaps: false,
          }
        ]
      };
      var LineChart = new Chart(ctx, {
          type: 'line',
          data: data,
          options: {
              legend: {
                  display: false
              },
              tooltips: {
                  callbacks: {
                     label: function(tooltipItem) {
                            return tooltipItem.yLabel;
                     }
                  }
              }
          }
      });
  }
  render(){
    return(
      <div>
        <div className='graph'>
          <canvas id="lineChart" ></canvas>
        </div>
        <div className='button-section'>
          <button className='waves-effect waves-light btn cyan darken-2'>Edit Push-Ups <i className='material-icons left'>mode_edit</i></button>
          <button onClick={this.props.signOutUser} className='waves-effect waves-light btn red lighten-1'>Sign Out <i className='material-icons left'>lock_outline</i></button>
        </div>
      </div>

    );
  }
}
