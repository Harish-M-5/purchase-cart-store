import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

function Analytics({ cart }) {

  if (!cart || cart.length === 0) {
    return <p>No items available for analysis.</p>;
  }

  const labels = cart.map(item => item.name);
  const dataValues = cart.map(item => item.price * item.quantity);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Spending ₹",
        data: dataValues,
        backgroundColor: [
          "#ff6384",
          "#36a2eb",
          "#ffce56",
          "#4caf50",
          "#9966ff",
          "#ff9f40"
        ],
        borderWidth: 1
      }
    ]
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ textAlign: "center", fontWeight: "bold" }}>
        📊 Spending Analysis
      </h2>

      {/* PIE CHART */}
      <div style={{ maxWidth: "400px", margin: "20px auto" }}>
        <Pie data={chartData} />
      </div>

      {/* BAR CHART */}
      <div style={{ maxWidth: "500px", margin: "20px auto" }}>
        <Bar data={chartData} />
      </div>
    </div>
  );
}

export default Analytics;
