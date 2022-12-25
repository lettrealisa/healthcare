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

const GlucoseChart = ({ date, byMonth, week }) => {
  const { data: glucoseData = [], isLoading } = useGetGlucoseQuery();

  const [chartData, setChartData] = useState([]);
  const [labels, setLabels] = useState([]);

  const handleDate = (prop, date) => {
    let res;
    switch (prop) {
      case "year":
        res = new Date(date).getFullYear();
        break;
      case "month":
        res = new Date(date).getMonth() + 1;
        break;
      case "day":
        res = new Date(date).getDate();
        break;
      case "week":
        const getWeekOfMonth = () => {
          var adjustedDate = new Date(date).getDate() + 7;
          var prefixes = ["0", "1", "2", "3", "4", "5"];
          return prefixes[0 | (adjustedDate / 7)];
        };
        res = parseInt(getWeekOfMonth());
        break;
      case "hours":
        res = new Date(date).getHours();
        break;
      case "minutes":
        res = new Date(date).getMinutes();
        break;
    }
    return res;
  };

  const items = useMemo(() => {
    if (!isLoading) {
      const items = glucoseData.slice();
      return items;
    }
  }, [glucoseData]);

  useEffect(() => {
    const filteredItems = () => {
      if (items !== undefined) {
        if (byMonth) {
          setLabels(
            items
              .filter(
                (t) =>
                  handleDate("year", t.date) === handleDate("year", date) &&
                  handleDate("month", t.date) === handleDate("month", date) &&
                  handleDate("week", t.date) === week
              )
              .map(
                (d) =>
                  ("0" + handleDate("day", d.date)).slice(-2) +
                  "." +
                  ("0" + handleDate("month", d.date)).slice(-2) +
                  "." +
                  handleDate("year", d.date)
              )
          );
        } else {
          setLabels(
            items
              .filter(
                (t) =>
                  handleDate("year", t.date) === handleDate("year", date) &&
                  handleDate("month", t.date) === handleDate("month", date) &&
                  handleDate("day", t.date) === handleDate("day", date)
              )
              .map(
                (d) =>
                  ("0" + handleDate("hours", d.date)).slice(-2) +
                  ":" +
                  ("0" + handleDate("minutes", d.date)).slice(-2)
              )
          );
        }
        setChartData(items.map((d) => d.value));
      }
    };
    filteredItems();
  }, [items, byMonth, date, week]);

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
