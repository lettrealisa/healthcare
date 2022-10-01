import axios from "axios";
import { React, useEffect, useState } from "react";
import { useData } from "../../context/DataProvider";

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

const GlucoseChart = () => {
  const parseDate = (date) => {
    const d = new Date(date * 1000);
    //const h = d.toLocaleString()
    //return addWeeks(date, 100)
    return d;
  };
  const handleWeek = (date) => {
    function getWeekOfMonth() {
      var adjustedDate = date.getDate() + 7;
      var prefixes = ["0", "1", "2", "3", "4", "5"];
      return prefixes[0 | (adjustedDate / 7)];
    }
    const res = getWeekOfMonth();
    return parseInt(res);
  };
  const getMonth = (date) => {
    return date.getMonth();
  };
  const addWeeks = (date, weeks) => {
    const d = new Date(date);
    d.setDate(d.getDate() + weeks * 7);
    return d;
  };
  const [chartData, setChartData] = useState([]);
  const [labels, setLabels] = useState([]);
  const { month, day, week, year } = useData();
  useEffect(() => {
    const getData = async () => {
      const res = await axios.get("http://localhost:12012/alcohol");
      const docs = res.data.documents;
      console.log(docs);

      //setLabels(docs.filter((t) => parseDate(t.data.date) === parseDate(1656589004.291822)).map((d) => parseDate(d.data.date)))
      const handleLabels = () => {
        if (
          (year !== null && month !== null && day === null && week !== null) ||
          (month !== "" && day === "" && week !== "")
        ) {
          //if(week !== null || week !== "") {
          setLabels(
            docs
              .filter(
                (t) =>
                  parseDate(t.data.date).getFullYear() === year &&
                  parseDate(t.data.date).getMonth() + 1 === month &&
                  handleWeek(parseDate(t.data.date)) === week
              )
              .map(
                (d) =>
                  parseDate(d.data.date).getDate() +
                  "." +
                  parseDate(d.data.date).getMonth() +
                  "." +
                  parseDate(d.data.date).getFullYear()
              )
          );
          //} else setLabels(docs.filter((t) => parseDate(t.data.date).getFullYear() === year && parseDate(t.data.date).getMonth() + 1 === month).map((d) => parseDate(d.data.date).getDate() + '.' + parseDate(d.data.date).getMonth() + '.' + parseDate(d.data.date).getFullYear()))
        } else if (
          (year !== null && month !== null && day === null && week === null) ||
          (month !== "" && day === "" && week === "")
        ) {
          setLabels(
            docs
              .filter(
                (t) =>
                  parseDate(t.data.date).getFullYear() === year &&
                  parseDate(t.data.date).getMonth() + 1 === month
              )
              .map(
                (d) =>
                  parseDate(d.data.date).getDate() +
                  "." +
                  parseDate(d.data.date).getMonth() +
                  "." +
                  parseDate(d.data.date).getFullYear()
              )
          );
        } else if (
          (year !== null && month !== null && day !== null) ||
          (month !== "" && day !== "")
        ) {
          setLabels(
            docs
              .filter(
                (t) =>
                  parseDate(t.data.date).getFullYear() === year &&
                  parseDate(t.data.date).getMonth() + 1 === month &&
                  parseDate(t.data.date).getDate() === day
              )
              .map(
                (d) =>
                  parseDate(d.data.date).getHours() +
                  ":" +
                  parseDate(d.data.date).getMinutes()
              )
          );
        }
      };
      handleLabels();
      //setLabels(docs.filter((t) => parseDate(t.data.date).getMonth() + 1 === month || parseDate(t.data.date).getDate() === day || handleWeek() === week).map((d) => parseDate(d.data.date).getHours() + ':' + parseDate(d.data.date).getMinutes()))
      //setLabels(docs.map((d) => parseDate(d.data.date)))
      setChartData(docs.map((d) => d.data.glucose));
      console.log(new Date(1656588502.317451 * 1000).getMonth() + 1);
      console.log(month, day);
    };
    getData();
  }, [month, day, week, year]);

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
