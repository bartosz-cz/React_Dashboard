import { memo, useContext, useEffect, useRef } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
import initChartsStructure from "./initiateChartsStructure";
import { chartArea, yScalePlugin } from "./chartPlugins";
import { CardsContext } from "../layout/MainContent";
import { chartColors } from "./chartStyle";

ChartJS.register(...registerables);

function LineChart({ CardID }) {
  const Charts = useRef(initChartsStructure());
  const ChartOBJ = useRef(null);
  const CardsData = useContext(CardsContext);
  const Card = CardsData[CardID];
  const Chart = Charts.current[CardID];
  useEffect(() => {
    setChartUnitAndName(Chart, Card);
  }, [Card.unit, Card.name]);
  useEffect(() => {
    if (Chart.Options != null) {
      newScaleAdded(Chart, CardsData, Card);
      if (ChartOBJ.current != null) {
        ChartOBJ.current.options = Chart.Options;
        ChartOBJ.current.data = Chart.Data;
        ChartOBJ.current.update();
      }
    }
  }, [Card.chartScales]);
  useEffect(() => {
    if (clear(Card.updateChart, Chart, Card))
      maxLengthChanged(Chart, CardsData, Card);
    if (ChartOBJ.current != null) ChartOBJ.current.update();
  }, [Card.updateChart]);

  useEffect(() => {
    if (clear(true, Chart, Card)) maxLengthChanged(Chart, CardsData, Card);
    if (ChartOBJ.current != null) ChartOBJ.current.update();
  }, [Card.refreshRate]);
  useEffect(() => {
    newValueAdded(Chart, CardsData, Card);
    if (ChartOBJ.current != null) ChartOBJ.current.update();
  }, [JSON.stringify(Card.timeBuffor)]);
  useEffect(() => {
    datasetChanged(Chart, CardsData, Card);
    if (ChartOBJ.current != null) ChartOBJ.current.update();
  }, [Card.occupiedColors]);
  useEffect(() => {
    maxLengthChanged(Chart, CardsData, Card);
    if (ChartOBJ.current != null) ChartOBJ.current.update();
  }, [Card.DataMaxLength]);
  return (
    <Line
      className="chartCanva"
      ref={ChartOBJ}
      data={Chart.Data}
      options={Chart.Options}
      plugins={[chartArea, yScalePlugin]}
      redraw={true}
    />
  );
}

export default memo(LineChart);

function newValueAdded(Chart, CardsData, Card) {
  if (Card.updateChart) {
    if (Card.timeFromRefresh >= Card.refreshRate - 1) {
      Card.timeFromRefresh = 0;
      let source, destiny;
      for (let i = 0; i < Card.occupiedColors.length + 2; i++) {
        if (i < 2 || Card.occupiedColors[i - 2] != -1) {
          switch (i) {
            case 0:
              source = Card.timeBuffor;
              destiny = Chart.Data.labels;
              break;
            case 1:
              source = Card.valueBuffor;
              destiny = Chart.Data.datasets[0].data;
              break;
            default:
              source = CardsData[Card.occupiedColors[i - 2] - 1].valueBuffor;
              destiny = Chart.Data.datasets[i - 1].data;
          }
          while (destiny.length >= Card.DataMaxLength) {
            destiny.shift();
          }
          destiny.push(source[source.length - 1]);
        }
      }
    } else Card.timeFromRefresh++;
  }
}

function datasetChanged(Chart, CardsData, Card) {
  for (let i = 0; i < Card.occupiedColors.length; i++) {
    if (Card.occupiedColors[i] !== -1) {
      let source = CardsData[Card.occupiedColors[i] - 1];
      let destiny = Chart.Data.datasets[i + 1].data;
      let index = 0;
      for (let i = Chart.Data.labels.length; i > 0; i++) {
        if (
          source.timeBuffor[source.valueBuffor.length - 1 - index] ==
          Chart.Data.labels[Chart.Data.labels.length - 1]
        )
          break;
        else index++;
      }
      while (destiny.length < Chart.Data.labels.length) {
        destiny.unshift(
          source.valueBuffor[source.valueBuffor.length - 1 - index]
        );
        index += Number(Card.refreshRate);
      }
    } else {
      while (Chart.Data.datasets[i + 1].data.length > 0)
        Chart.Data.datasets[i + 1].data.pop();
    }
  }
}

function maxLengthChanged(Chart, CardsData, Card) {
  Card.timeFromRefresh = 0;
  let source, destiny;
  for (let i = 0; i < Card.occupiedColors.length + 2; i++) {
    if (i < 2 || Card.occupiedColors[i - 2] != -1) {
      switch (i) {
        case 0:
          source = Card.timeBuffor;
          destiny = Chart.Data.labels;
          break;
        case 1:
          source = Card.valueBuffor;
          destiny = Chart.Data.datasets[0].data;
          break;
        default:
          source = CardsData[Card.occupiedColors[i - 2] - 1].valueBuffor;
          destiny = Chart.Data.datasets[i - 1].data;
      }
      let index = 0;
      while (destiny.length > 0) destiny.pop();
      while (
        destiny.length < Card.DataMaxLength &&
        destiny.length * Number(Card.refreshRate) < Card.valueBuffor.length
      ) {
        destiny.unshift(source[source.length - 1 - index]);
        index += Number(Card.refreshRate);
      }
    }
  }
}

function clear(Clear, Chart, Card) {
  if (Clear) {
    let destiny;
    for (let i = 0; i < Card.occupiedColors.length + 2; i++) {
      switch (i) {
        case 0:
          destiny = Chart.Data.labels;
          break;
        case 1:
          destiny = Chart.Data.datasets[0].data;
          break;
        default:
          destiny = Chart.Data.datasets[i - 1].data;
      }
      while (destiny.length > 0) destiny.pop();
    }
    return true;
  }
  return false;
}

function newScaleAdded(Chart, CardsData, Card) {
  for (let i = 0; i < Card.chartScales.length; i++) {
    let axis = Chart.Options.scales[`yAxis${i + 1}`];
    for (let u = 0; u < Card.occupiedColors.length; u++) {
      if (Card.chartScales[i] === -1) {
        axis.display = false;
        Chart.Data.datasets[u + 1].yAxisID = "y";
      } else if (Card.occupiedColors[u] === Card.chartScales[i]) {
        Chart.Data.datasets[u + 1].yAxisID = "yAxis" + (i + 1);
        axis.display = true;
        axis.title.text = CardsData[Card.occupiedColors[u] - 1].unit;
        axis.border.color = chartColors[u * 2 + chartColors[10]];
        axis.title.color = chartColors[u * 2 + chartColors[10]];
        axis.ticks.color = chartColors[u * 2 + chartColors[10]];
      }
    }
  }
}

function setChartUnitAndName(Chart, Card) {
  Chart.Options.plugins.yScalePlugin.text = Card.unit;
  Chart.Options.plugins.title.text = Card.name;
}
