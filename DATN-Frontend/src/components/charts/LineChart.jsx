/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function LineChart({ chartData, chartOptions }) {
  return <Line data={chartData} options={chartOptions} />;
}

export default LineChart;
