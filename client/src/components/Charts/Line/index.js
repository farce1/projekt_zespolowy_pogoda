import React, { Component } from 'react'
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Label 
} from 'recharts'
import { uniqBy } from 'lodash'

export default class LineChartComponent extends Component {
  state = {
    chartData: []
  }

  componentDidUpdate(prevProps, prevState) {
    const {time, winddir, winddir_avg2m} = this.props.data
    if(prevProps.data.time !== time && winddir !== undefined){
      const sortedChartData = uniqBy([...prevState.chartData, {time, value: winddir_avg2m}], 'time')
      this.state.chartData.length < 20 ?
      this.setState({chartData: sortedChartData}) :
      this.setState({chartData: [{time, value: winddir_avg2m}]})
        }
    }
  

  render () {
    const { chartData } = this.state
    return (
      <div className='line-charts'>
          <LineChart
            width={800} height={600} data={chartData}
            margin={{ top: 40, right: 40, bottom: 20, left: 20 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis dataKey='time'>
            <Label value="Time" offset={0} position="insideBottom" />
            </XAxis>
            <YAxis dataKey='value' domain={['auto', 'auto']} label={{ value: 'Wind Direction Average 2m', angle: -90, position: 'insideLeft' }} />
            <Tooltip
              wrapperStyle={{
                borderColor: 'white',
                boxShadow: '2px 2px 3px 0px rgb(204, 204, 204)'
              }}
              contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
              labelStyle={{ fontWeight: 'bold', color: '#666666' }}
            />
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
          </LineChart>
      </div>
    )
  }
}
