import { React, useEffect, useState } from "react";
import { useData } from "../../context/DataProvider";
import useClient from "../auth/useClient";

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
  const collectionId = "634dee997a4f62abf628";
  const parseDate = (date) => {
    const d = new Date(date * 1000);
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
  const { databases } = useClient();
  useEffect(() => {
    const getData = async () => {
      const res = await databases.listDocuments(
        "633f24764b9416fbd058",
        collectionId
      );

      const docs = res.documents;
      console.log(docs);

      const handleLabels = () => {
        if (
          (year !== null && month !== null && day === null && week !== null) ||
          (month !== "" && day === "" && week !== "")
        ) {
          setLabels(
            docs
              .filter(
                (t) =>
                  parseDate(t.date).getFullYear() === year &&
                  parseDate(t.date).getMonth() + 1 === month &&
                  handleWeek(parseDate(t.date)) === week
              )
              .map(
                (d) =>
                  parseDate(d.date).getDate() +
                  "." +
                  parseDate(d.date).getMonth() +
                  "." +
                  parseDate(d.date).getFullYear()
              )
          );
        } else if (
          (year !== null && month !== null && day === null && week === null) ||
          (month !== "" && day === "" && week === "")
        ) {
          setLabels(
            docs
              .filter(
                (t) =>
                  parseDate(t.date).getFullYear() === year &&
                  parseDate(t.date).getMonth() + 1 === month
              )
              .map(
                (d) =>
                  parseDate(d.date).getDate() +
                  "." +
                  parseDate(d.date).getMonth() +
                  "." +
                  parseDate(d.date).getFullYear()
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
                  parseDate(t.date).getFullYear() === year &&
                  parseDate(t.date).getMonth() + 1 === month &&
                  parseDate(t.date).getDate() === day
              )
              .map(
                (d) =>
                  parseDate(d.date).getHours() +
                  ":" +
                  parseDate(d.date).getMinutes()
              )
          );
        }
      };
      handleLabels();

      setChartData(docs.map((d) => d.value));
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
