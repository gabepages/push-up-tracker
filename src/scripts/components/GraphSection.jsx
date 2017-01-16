import React from "react";
import Chart from 'chart.js'


export default class GraphSection extends React.Component {
  constructor(props){
    super(props);

  }
  componentDidUpdate(prevProps){
    if(prevProps.stats != this.props.stats ){
      this.createGraph()
    }

  }
  componentDidMount(){
    this.createGraph()
  }
  render(){
      return(
        <div >
          <div className='graph'>
            <canvas id="lineChart"></canvas>
          </div>
          <div className='button-section'>
            <button onClick={this.props.signOutUser} className='waves-effect waves-light btn red lighten-1'>Sign Out <i className='material-icons left'>lock_outline</i></button>
          </div>
        </div>
      );
  }
  createGraph(){
    let arryOfData = []
    let labels = ['0']
    if (this.props.stats != null){
      arryOfData = new Array
      labels = new Array
      Object.keys(this.props.stats).map((key, index) => {
        labels.push(index + 1)
        arryOfData.push(this.props.stats[key])
      })
    }
    var ctx = document.getElementById("lineChart");
    var data = {
      labels: labels,
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
              data: arryOfData,
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
              },
              scales: {
                yAxes: [{
                  ticks: {
                    beginAtZero: true
                  }
                }]
              }
          }
      })
  }
}
