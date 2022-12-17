import { React, useEffect, useMemo, useState } from "react";

import {
  CategoryScale,
  Chart,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

import { useGetGlucoseQuery } from "../api/apiSlice";

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
      labels: {
        font: {
          family: "Montserrat, sans-serif",
        },
      },
    },
    title: {
      display: true,
      text: "График глюкозы",
      font: {
        family: "Montserrat, sans-serif",
      },
    },
  },
  scales: {
    y: {
      font: {
        size: 40,
      },
    },
  },
};

Chart.defaults.font.family = "Montserrat, sans-serif";
Chart.defaults.font.size = 16;

const year = 1;
const month = 1;
const day = 1;
const week = 1;

const GlucoseChart = ({ byMonth }) => {
  const {
    data: glucoseData = [],
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetGlucoseQuery();

  let content;

  const filteredItems = useMemo(() => {
    const filteredItems = glucoseData.slice();
    //return filterItemsByDate(filteredItems, {});
  }, [glucoseData]);

  const handleWeek = (date) => {
    function getWeekOfMonth() {
      var adjustedDate = date.getDate() + 7;
      var prefixes = ["0", "1", "2", "3", "4", "5"];
      return prefixes[0 | (adjustedDate / 7)];
    }
    const res = getWeekOfMonth();
    return parseInt(res);
  };

  const [chartData, setChartData] = useState([]);
  const [labels, setLabels] = useState([]);

  const getData = () => {
    const handleLabels = () => {
      if (byMonth) {
        setLabels(
          glucoseData.map(
            (d) =>
              ("0" + new Date(d.date).getDate()).slice(-2) +
              "." +
              ("0" + (new Date(d.date).getMonth() + 1)).slice(-2) +
              "." +
              new Date(d.date).getFullYear()
          )
        );
      } else {
        setLabels(
          glucoseData.map(
            (d) =>
              ("0" + new Date(d.date).getHours()).slice(-2) +
              ":" +
              ("0" + new Date(d.date).getMinutes()).slice(-2)
          )
        );
      }
    };
    handleLabels();

    setChartData(glucoseData.map((d) => d.value));
  };

  useEffect(() => {
    getData();
  }, [byMonth]);

  const data = {
    labels,
    datasets: [
      {
        label: "Уровень глюкозы",
        data: chartData,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return <Line options={options} data={data} />;
};

export default GlucoseChart;
