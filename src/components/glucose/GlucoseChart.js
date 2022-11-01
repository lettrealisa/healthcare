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

const GlucoseChart = ({ date, byMonth }) => {
  const collectionId = "634dee997a4f62abf628";

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
  const { month, day, week, year } = useData();
  const { databases } = useClient();
  useEffect(() => {
    const getData = async () => {
      const res = await databases.listDocuments(
        "633f24764b9416fbd058",
        collectionId
      );

      const docs = res.documents;

      console.log(
        ("0" + new Date(docs[0].date).getHours()).slice(-2) +
          ":" +
          ("0" + new Date(docs[0].date).getMinutes()).slice(-2)
      );

      const handleLabels = () => {
        if (byMonth) {
          setLabels(
            docs
              .filter(
                (t) =>
                  new Date(t.date).getFullYear() === year &&
                  new Date(t.date).getMonth() + 1 === month &&
                  handleWeek(new Date(t.date)) === week
              )
              .map(
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
            docs
              .filter(
                (t) =>
                  new Date(t.date).getFullYear() === year &&
                  new Date(t.date).getMonth() + 1 === month &&
                  new Date(t.date).getDate() === day
              )
              .map(
                (d) =>
                  ("0" + new Date(d.date).getHours()).slice(-2) +
                  ":" +
                  ("0" + new Date(d.date).getMinutes()).slice(-2)
              )
          );
        }
      };
      handleLabels();

      setChartData(docs.map((d) => d.value));
    };
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
