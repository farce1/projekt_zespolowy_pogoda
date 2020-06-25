import React from "react";
import useChartConfig from "../../../hooks/useChartConfig";
import Box from "../../Box";
import { Chart } from "react-charts";

export default class Line extends React.Component {
  state = {
    chartData: [
      {
        label: "Series 1",
        data: [
          { x: 1, y: 10 },
          { x: 2, y: 10 },
          { x: 3, y: 10 },
        ],
      },
    ],
    series: {
      showPoints: true,
    },
    axes: [
      { primary: true, type: "time", position: "bottom" },
      { type: "linear", position: "left" },
    ],
  };

  render() {
    const { chartData, series, axes } = this.state;
    return (
      <div>
        <Box resizable>
          <Chart data={chartData} series={series} axes={axes} tooltip />
        </Box>
      </div>
    );
  }
}
