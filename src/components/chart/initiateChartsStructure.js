import {
  chartColors,
  dataset0Colors,
  textColor,
  chartBackground,
} from "./chartStyle";

class Chart {
  constructor() {
    let colors = dataset0Colors.concat(chartColors);
    this.Data = {
      labels: [],
      datasets: Array(6)
        .fill()
        .map((_, idx) => ({
          backgroundColor: colors[idx * 2 + 1] || "#fff",
          borderColor: colors[idx * 2] || "#000",
          data: [],
          yAxisID: "y",
        })),
    };
    this.Options = {
      response: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        title: {
          display: true,
          text: "",
          color: textColor,
          font: { size: 18, weight: "bolder" },
        },
        yScalePlugin: {
          fontColor: textColor,
          text: "",
        },
        chartArea: {
          borderColor: "#001c1f",
          borderWidth: 1,
          backgroundColor: chartBackground,
        },
      },
      scales: {
        x: {
          grid: { color: "#001c1f" },
          ticks: {
            color: textColor,
            font: { weight: "bolder" },
            autoSkip: true,
            maxRotation: 0,
          },
        },
        y: {
          grid: { color: "#001c1f" },
          ticks: { color: textColor, font: { weight: "bolder" } },
        },
      },
    };
    for (let i = 1; i <= 5; i++) {
      this.Options.scales[`yAxis${i}`] = {
        display: false,
        grid: { display: true, drawOnChartArea: false },
        border: { color: chartColors[i] },
        ticks: { font: { weight: "bolder" }, color: chartColors[i] },
        title: {
          display: true,
          color: chartColors[i],
          font: { weight: "bolder" },
          text: "",
          padding: 0,
        },
      };
    }
  }
}

function initChartsStructure() {
  return Array(30)
    .fill()
    .map(() => new Chart());
}

export default initChartsStructure;
