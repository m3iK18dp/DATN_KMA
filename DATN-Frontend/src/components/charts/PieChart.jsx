/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function PieChart({ chartData, chartOptions }) {
  return <Pie data={chartData} options={chartOptions} />;
}

export default PieChart;
