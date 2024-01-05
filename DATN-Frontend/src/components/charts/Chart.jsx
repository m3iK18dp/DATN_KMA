/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import Chart from "chart.js/auto";
import { useEffect, useState } from "react";
import { Doughnut, Line, Pie } from "react-chartjs-2";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { RiLuggageDepositFill } from "react-icons/ri";
import { BiMoneyWithdraw } from "react-icons/bi";
import { TbTransitionLeft, TbTransitionRight } from "react-icons/tb";
import statisticService from "../../services/StatisticService";
import { useNavigate } from "react-router-dom";
const CustomChart = ({ transactions = [], currentAccount = {}, params }) => {
  const [data, setData] = useState({ datasets: [] });
  const [statistics, setStatistics] = useState([]);
  const [statisticBalance, setStatisticBalance] = useState([]);
  const [statisticMonth, setStatisticMonth] = useState([]);
  const [dataUse, setDataUse] = useState({ datasets: [] });
  const [options, setOptions] = useState(null);
  const [options2, setOptions2] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (params._account_number) {
      statisticService
        .getStatistics(params, navigate)
        .then((res) => {
          setStatistics(res.data);
        });

    }
  }, [navigate, params]);
  const convertVND = (value) => {
    return value.toLocaleString('vi-VN', {
      style: 'currency',
      currency: 'VND',
    })
  }
  useEffect(() => {
    if (params._account_number) {
      statisticService
        .getStatisticBalance(
          { _account_number: params._account_number },
          navigate
        )
        .then((res) => setStatisticBalance(res.data));
      statisticService
        .getStatisticMonth(
          { _account_number: params._account_number },
          navigate
        )
        .then((res) => setStatisticMonth(res.data));
    }
  }, [navigate, params._account_number]);
  useEffect(() => {
    setData({
      labels: statistics.label,
      datasets: [
        {
          label: "Deposit",
          fill: true,
          lineTension: 0.2,
          backgroundColor: "rgba(120,120,255,0.5)",
          borderColor: "rgba(120,120,255,1)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(120,120,255,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 3,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(120,120,255,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 3,
          pointRadius: 1,
          pointHitRadius: 10,
          data: statistics.deposit,
          hidden: false,
        },
        {
          label: "Withdraw",
          fill: true,
          lineTension: 0.2,
          backgroundColor: "rgba(255,120,120,0.5)",
          borderColor: "rgba(255,120,120,1)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(255,120,120,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 3,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(255,120,120,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 3,
          pointRadius: 1,
          pointHitRadius: 10,
          data: statistics.withdraw,
          hidden: false,
        },
        {
          label: "Transfer",
          fill: true,
          lineTension: 0.2,
          backgroundColor: "rgba(75,192,192,0.5)",
          borderColor: "rgba(75,192,192,1)",
          borderCapStyle: "butt",
          borderDash: [5, 1],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 3,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 3,
          pointRadius: 1,
          pointHitRadius: 10,
          data: statistics.transfer,
          hidden: false,
        },
        {
          label: "Credited",
          fill: true,
          lineTension: 0.2,
          backgroundColor: "rgba(255,255,120,0.5)",
          borderColor: "rgba(255,255,120,1)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(255,255,120,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 3,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(255,255,120,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 3,
          pointRadius: 1,
          pointHitRadius: 10,
          data: statistics.credited,
          hidden: false,
        },
      ],
    });
    setOptions({
      scales: {
        x: {
          type: "category",
          labels: statistics.label,
          grid: {
            display: true,
          },
          display: false,
        },
        y: {
          grid: {
            display: true,
          },
          ticks: {
            callback: function (value) {
              return value.toLocaleString('vi-VN', {
                style: 'currency',
                currency: 'VND',
              });
            },
          },
        },
      },
      plugins: {
        legend: {
          display: false,
          position: "top",
          labels: {
            generateLabels: (chart) => {
              const labels = [];
              const datasets = chart.data.datasets;
              for (let i = 0; i < datasets.length; i++) {
                labels.push({
                  text: datasets[i].label,
                  fillStyle: datasets[i].backgroundColor,
                  strokeStyle: datasets[i].borderColor,
                });
              }
              return labels;
            },
          },
        },

      },
    });
    setOptions2({
      scales: {
        x: {
          type: "category",
          labels: statistics.label,
          grid: {
            display: true,
          },
          display: false,
        },
        y: {
          grid: {
            display: true,
          },
        },
      },
      plugins: {
        legend: {
          display: false,
          position: "top",
          labels: {
            generateLabels: (chart) => {
              const labels = [];
              const datasets = chart.data.datasets;
              for (let i = 0; i < datasets.length; i++) {
                labels.push({
                  text: datasets[i].label,
                  fillStyle: datasets[i].backgroundColor,
                  strokeStyle: datasets[i].borderColor,
                });
              }
              return labels;
            },
          },
        },

      },
    });
  }, [statistics]);
  const [depositVisible, setDepositVisible] = useState(true);
  const [withdrawVisible, setWithdrawVisible] = useState(true);
  const [transferVisible, setTransferVisible] = useState(true);
  const [creditedVisible, setCreditedVisible] = useState(true);

  useEffect(() => {
    let filter = [];
    if (depositVisible) filter = [...filter, "Deposit"];
    if (withdrawVisible) filter = [...filter, "Withdraw"];
    if (transferVisible) filter = [...filter, "Transfer"];
    if (creditedVisible) filter = [...filter, "Credited"];
    let max = 0;
    const newDatasets = data?.datasets.filter((dataset) => {
      if (filter.includes(dataset.label)) {
        if (dataset.data?.length > max)
          max = dataset.data.length;
        return true;
      } return false;
    })
    setDataUse({
      ...data,
      labels: data.labels?.slice(0, max),
      datasets: newDatasets,
    });

    if (options?.scales)
      options.scales["x"]["labels"] = data.labels?.slice(0, max)
    setOptions({
      ...options,
    })


  }, [depositVisible, withdrawVisible, transferVisible, creditedVisible, data]);

  return (
    <>
      <div className="col-start-2 col-end-4 p-4">
        {/* <p className="pb-4">Tổng quan số liệu</p> */}
        <div className="grid grid-cols-4 gap-5 pb-5">
          <div className="border rounded-md px-10 py-3 h-28 flex justify-around align-center " style={{ backgroundColor: "#ffffff14" }}>
            <div className="flex flex-col justify-center items-center">
              <div className="flex justify-center items-center  text-xl text-red-700">
                <RiLuggageDepositFill size={25} />
              </div>
              <div className="flex justify-center items-center text-xl text-red-700">
                {statisticMonth.deposit
                  ? parseInt(statisticMonth.deposit[0])
                  : ""}
              </div>
              <div className="flex justify-center items-center text-2xl font-bold text-red-700">
                Deposit
              </div>
            </div>

            <div className="flex flex-col justify-between items-center text-2xl font-bold text-red-700">
              <div className="h-10 w-10">
                <CircularProgressbar
                  value={
                    statisticMonth.deposit
                      ? parseInt(statisticMonth.deposit[2])
                      : 0
                  }
                  styles={buildStyles({
                    pathColor: "#f05252",
                    trailColor: "#ffffff",
                    strokeLinecap: "butt",
                    pathTransitionDuration: 1,
                    pathTransitionTimingFunction: "linear",
                  })}
                  strokeWidth={15}
                />
              </div>
              <div className="text-xl text-red-700 italic">
                +{statisticMonth.deposit ? statisticMonth.deposit[2].toFixed(2) : ""}%
              </div>
            </div>
          </div>
          <div className="border rounded-md px-10 py-3 h-28 flex justify-around" style={{ backgroundColor: "#ffffff14" }}>
            <div className="flex flex-col justify-center items-center">
              <div className="flex justify-center items-center  text-xl text-blue-700">
                <BiMoneyWithdraw size={25} />
              </div>
              <div className="flex justify-center items-center text-xl text-blue-700">
                {statisticMonth.transfer
                  ? parseInt(statisticMonth.withdraw[0])
                  : ""}
              </div>
              <div className="flex justify-center items-center text-2xl font-bold text-blue-700">
                Withdraw
              </div>
            </div>
            <div className="flex flex-col justify-between items-center text-2xl font-bold text-blue-700">
              <div className="h-10 w-10">
                <CircularProgressbar
                  value={
                    statisticMonth.withdraw
                      ? parseInt(statisticMonth.withdraw[2])
                      : ""
                  }
                  styles={buildStyles({
                    pathColor: "#3f83f8",
                    trailColor: "#ffffff",
                    strokeLinecap: "butt",
                    pathTransitionDuration: 1,
                    pathTransitionTimingFunction: "linear",
                  })}
                  strokeWidth={15}
                />
              </div>
              <div className="text-xl text-blue-700 italic">
                +
                {statisticMonth.withdraw
                  ? parseInt(statisticMonth.withdraw[2]).toFixed(2)
                  : ""}
                %
              </div>
            </div>
          </div>
          <div className="border rounded-md px-10 py-3 h-28 flex justify-around align-center" style={{ backgroundColor: "#ffffff14" }}>
            <div className="flex flex-col justify-center items-center">
              <div className="flex justify-center items-center  text-xl text-green-700">
                <TbTransitionRight size={25} />
              </div>
              <div className="flex justify-center items-center text-xl text-green-700">
                {statisticMonth.transfer
                  ? parseInt(statisticMonth?.transfer[0])
                  : ""}
              </div>
              <div className="flex justify-center items-center text-2xl font-bold text-green-700">
                Transfer
              </div>
            </div>
            <div className="flex flex-col justify-between items-center text-2xl font-bold text-green-700">
              <div className="h-10 w-10">
                <CircularProgressbar
                  value={
                    statisticMonth.transfer
                      ? parseInt(statisticMonth?.transfer[2])
                      : 0
                  }
                  styles={buildStyles({
                    pathColor: "#29992a",
                    trailColor: "#ffffff",
                    strokeLinecap: "butt",
                    pathTransitionDuration: 1,
                    pathTransitionTimingFunction: "linear",
                  })}
                  strokeWidth={15}
                />
              </div>
              <div className="text-xl italic text-green-700">
                +
                {statisticMonth.transfer
                  ? parseInt(statisticMonth?.transfer[2]).toFixed(2)
                  : ""}
                %
              </div>
            </div>
          </div>
          <div className="border rounded-md px-10 py-3 h-28 flex justify-around" style={{ backgroundColor: "#ffffff14" }}>
            <div className="flex flex-col justify-center items-center">
              <div className="flex justify-center items-center  text-xl text-yellow-700">
                <TbTransitionLeft size={25} />
              </div>
              <div className="flex justify-center items-center text-xl text-yellow-700">
                {statisticMonth.credited
                  ? parseInt(statisticMonth.credited[0])
                  : ""}
              </div>
              <div className="flex justify-center items-center text-2xl font-bold text-yellow-700">
                Credited
              </div>
            </div>
            <div className="flex flex-col justify-between items-center text-2xl font-bold text-yellow-700">
              <div className="h-10 w-10">
                <CircularProgressbar
                  value={
                    statisticMonth.credited
                      ? parseInt(statisticMonth.credited[2])
                      : ""
                  }
                  styles={buildStyles({
                    pathColor: "#f2ad41",
                    trailColor: "#ffffff",
                    strokeLinecap: "butt",
                    pathTransitionDuration: 1,
                    pathTransitionTimingFunction: "linear",
                  })}
                  strokeWidth={15}
                />
              </div>
              <div className="text-xl text-yellow-700 italic">
                +
                {statisticMonth.credited
                  ? parseInt(statisticMonth.credited[0]).toFixed(2)
                  : ""}
                %
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-5">
          <div className="col-span-2 border rounded-md px-6 py-3 h-200 flex justify-around" style={{ backgroundColor: "#ffffff14" }}>
            <div
              style={{
                width: "100%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  width: "600px",
                  margin: "0 auto",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    width: "600px",
                    margin: "0 auto",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    onClick={() => setDepositVisible(!depositVisible)}
                    onMouseOver={(e) => (e.target.style.cursor = "pointer")}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <div
                      style={{
                        width: "50px",
                        height: "15px",
                        backgroundColor: "rgba(120,120,255,0.4)",
                        border: "1px solid rgba(120,120,255,1)",
                        marginRight: 5,
                      }}
                    ></div>
                    <span
                      style={{
                        textDecoration: !depositVisible
                          ? "line-through"
                          : "unset",
                        color: "white"
                      }}
                    >
                      Deposit
                    </span>
                  </div>
                  <div
                    onClick={() => setWithdrawVisible(!withdrawVisible)}
                    onMouseOver={(e) => (e.target.style.cursor = "pointer")}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <div
                      style={{
                        width: "50px",
                        height: "15px",
                        backgroundColor: "rgba(255,120,120,0.4)",
                        border: "1px solid rgba(255,120,120,1)",
                        marginRight: 5,
                      }}
                    ></div>
                    <span
                      style={{
                        textDecoration: !withdrawVisible
                          ? "line-through"
                          : "unset",
                        color: "white"
                      }}
                    >
                      Withdraw
                    </span>
                  </div>
                  <div
                    onClick={() => setTransferVisible(!transferVisible)}
                    onMouseOver={(e) => (e.target.style.cursor = "pointer")}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <div
                      style={{
                        width: "50px",
                        height: "15px",
                        backgroundColor: "rgba(75,192,192,0.4)",
                        border: "1px solid rgba(75,120,120,1)",
                        marginRight: 5,
                      }}
                    ></div>
                    <span
                      style={{
                        textDecoration: !transferVisible
                          ? "line-through"
                          : "unset",
                        color: "white"
                      }}
                    >
                      Transfer
                    </span>
                  </div>
                  <div
                    onClick={() => setCreditedVisible(!creditedVisible)}
                    onMouseOver={(e) => (e.target.style.cursor = "pointer")}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <div
                      style={{
                        width: "50px",
                        height: "15px",
                        backgroundColor: "rgba(255,255,120,0.4)",
                        border: "1px solid rgba(255,255,120,1)",
                        marginRight: 5,
                      }}
                    ></div>
                    <span
                      style={{
                        textDecoration: !creditedVisible
                          ? "line-through"
                          : "unset",
                        color: "white"
                      }}
                    >
                      Credited
                    </span>
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  margin: "10px 0px",
                  flexWrap: "wrap",
                  justifyContent: "space-around",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    width: "60%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  {dataUse && options && (
                    <Line data={dataUse} options={options} />
                  )}
                </div>
                <div
                  style={{
                    width: "30%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  {dataUse && options2 && (
                    <Doughnut data={dataUse} options={options2} />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="border rounded-md px-6 py-3 h-200 flex justify-around " style={{ backgroundColor: "#ffffff14" }}>
            <div style={{ width: "100%" }}>
              <div>
                <Pie data={{
                  labels: ["Deposit", "Withdraw", "Transfer", "Credited"],
                  datasets: [
                    {
                      backgroundColor: ["rgba(120,120,255,0.5)", "rgba(255,120,120,0.5)", "rgba(75,192,192,0.5)", "rgba(255,255,120,0.5)"],
                      borderColor: "rgba(14, 159, 110,1)",
                      borderCapStyle: "butt",
                      borderDash: [],
                      borderDashOffset: 0.0,
                      borderJoinStyle: "miter",
                      pointBorderColor: "rgba(14, 159, 110,1)",
                      pointBackgroundColor: "#fff",
                      pointBorderWidth: 3,
                      pointHoverRadius: 5,
                      pointHoverBackgroundColor: "rgba(14, 159, 110,1)",
                      pointHoverBorderColor: "rgba(220,220,220,1)",
                      pointHoverBorderWidth: 3,
                      pointRadius: 1,
                      pointHitRadius: 10,
                      data: statistics.total,
                    },
                  ],
                }}
                  options={{
                    scales: {
                      x: {
                        type: "category",
                        labels: ["Deposit", "Withdraw", "Transfer", "Credited"],
                        grid: {
                          display: true,
                        },
                        display: false,
                      },
                      y: {
                        grid: {
                          display: true,
                        },
                      },
                    },
                    plugins: {
                      legend: {
                        display: false,
                        position: "top",
                        labels: {
                          generateLabels: (chart) => {
                            const labels = [];
                            const datasets = chart.data;
                            for (let i = 0; i < datasets.labels.length; i++) {
                              if (datasets.labels[i]) {
                                labels.push({
                                  text: datasets.labels[i],
                                  fillStyle:
                                    datasets.datasets[0].backgroundColor[i],
                                  strokeStyle:
                                    datasets.datasets[0].borderColor[i],
                                });
                              }
                            }
                            return labels;
                          },
                        },
                      },
                    },
                  }}
                  style={{ maxHeight: 350 }} />
              </div>
            </div>
          </div>
          <div className="col-span-3 border rounded-md px-6 py-3 h-200 flex justify-around" style={{ backgroundColor: "#ffffff14" }}>
            <div style={{ width: "100%" }}>
              <div>
                <Line
                  data={{
                    labels: statisticBalance.label,
                    datasets: [
                      {
                        label: "Balance",
                        fill: false,
                        lineTension: 0.5,
                        backgroundColor: "rgba(45,181,97,0.4)",
                        borderColor: "rgba(45,181,97,1)",
                        borderCapStyle: "butt",
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: "miter",
                        pointBorderColor: "rgba(45,181,97,1)",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 3,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(45,181,97,1)",
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointHoverBorderWidth: 3,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: statisticBalance.balance,
                        hidden: false,
                      },
                    ],
                  }}
                  options={{
                    scales: {
                      x: {
                        type: "category",
                        labels: statisticBalance.label,
                        grid: {
                          display: true,
                        },
                        display: false,
                      },
                      y: {
                        grid: {
                          display: true,
                        },
                        ticks: {
                          callback: function (value) {
                            return value.toLocaleString('vi-VN', {
                              style: 'currency',
                              currency: 'VND',
                            });
                          },
                        },
                      },
                    },
                    plugins: {
                      legend: {
                        display: false,
                        position: "top",
                        labels: {
                          generateLabels: (chart) => {
                            const labels = [];
                            const datasets = chart.data.datasets;
                            for (let i = 0; i < datasets.length; i++) {
                              labels.push({
                                text: datasets[i].label,
                                fillStyle: datasets[i].backgroundColor,
                                strokeStyle: datasets[i].borderColor,
                              });
                            }
                            return labels;
                          },
                        },
                      },
                    },
                  }}
                  style={{ maxHeight: 200 }}
                />
              </div>
            </div>
          </div>
          {/* <div className="border rounded-md px-6 py-3 h-200 flex justify-around" style={{ backgroundColor: "#ffffff14" }}>
            <div style={{ width: "100%" }}>
              <div>
                <Doughnut
                  data={{
                    labels: statisticBalance.label,
                    datasets: [
                      {
                        label: "Balance",
                        fill: false,
                        lineTension: 0.2,
                        backgroundColor: "rgba(75,192,192,0.4)",
                        borderColor: "rgba(75,192,192,1)",
                        borderCapStyle: "butt",
                        borderDash: [5, 1],
                        borderDashOffset: 0.0,
                        borderJoinStyle: "miter",
                        pointBorderColor: "rgba(75,192,192,1)",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 3,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(75,192,192,1)",
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointHoverBorderWidth: 3,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: statisticBalance.balance,
                        hidden: false,
                      },
                    ],
                  }}
                  options={{
                    scales: {
                      x: {
                        type: "category",
                        labels: statisticBalance.label,
                        grid: {
                          display: true,
                        },
                        display: false,
                      },
                      y: {
                        grid: {
                          display: true,
                        },
                      },
                    },
                    plugins: {
                      legend: {
                        display: false,
                        position: "top",
                        labels: {
                          generateLabels: (chart) => {
                            const labels = [];
                            const datasets = chart.data.datasets;
                            for (let i = 0; i < datasets.length; i++) {
                              labels.push({
                                text: datasets[i].label,
                                fillStyle: datasets[i].backgroundColor,
                                strokeStyle: datasets[i].borderColor,
                              });
                            }
                            return labels;
                          },
                        },
                      },
                    },
                  }}
                  style={{ maxHeight: 200 }}
                />
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default CustomChart;
