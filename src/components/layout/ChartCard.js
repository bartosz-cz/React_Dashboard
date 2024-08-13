import { useState } from "react";
import IconButton from "../ui/IconButton";
import FormSelect from "../ui/FormSelect";
import useChartOptions from "../../hooks/useChartOptions";

import LineChart from "../chart/LineChart";
var classnames = require("classnames");

const ChartCard = ({
  cardData,
  cardsCount,
  setCardData,
  height = null,
  width = cardData.width,
  setZoomView,
}) => {
  const [activeDataSets, setActiveDataSets] = useState(0);
  const updateChart = (status) => {
    setCardData({ ...cardData, updateChart: status }, cardData.FieldId);
  };

  const resizeChart = (newWidth) => {
    setCardData({ ...cardData, width: newWidth }, cardData.FieldId);
  };
  const chartOptions = useChartOptions(
    cardsCount,
    cardData.FieldId,
    setCardData,
    setActiveDataSets,
    activeDataSets
  );

  const isRightArrowVisible = cardData.width <= 6;
  const isLeftArrowVisible = cardData.width === 10;

  return (
    <div
      className={classnames("d-Flex", "flex-column", "card", "panel", "border")}
      style={{ width: (width - 2) * 106 - 6, height }}
    >
      <div
        className={"flex-row d-flex justify-content-start flex-fill"}
        style={{ height: height - 50 }}
      >
        <div className="flex-column flex-fill chart-canva">
          <LineChart CardID={cardData.FieldId} />
        </div>
        <div className="d-flex flex-column justify-content-center chart_menu">
          <div className="d-flex title">Options:</div>
          <div
            className={classnames(
              { chart_menu_options: height === 212 },
              "overflow-auto"
            )}
          >
            {chartOptions}
          </div>
          <div className="d-flex flex-row justify-content-center">
            <IconButton
              name="start"
              styleClass="chart_option"
              onClick={() => updateChart(true)}
              size={24}
              invisible={cardData.updateChart}
            />
            <IconButton
              name="stop"
              styleClass="chart_option"
              onClick={() => updateChart(false)}
              size={24}
              invisible={!cardData.updateChart}
            />
            {height === 206 && (
              <>
                <IconButton
                  name="leftArrow"
                  styleClass="chart_option"
                  onClick={() => resizeChart(cardData.width - 2)}
                  size={24}
                  invisible={isRightArrowVisible}
                />
                <IconButton
                  name="rightArrow"
                  styleClass="chart_option"
                  onClick={() => resizeChart(cardData.width + 2)}
                  size={24}
                  invisible={isLeftArrowVisible}
                />
              </>
            )}
          </div>
        </div>
      </div>
      {height !== 206 && (
        <ZoomOptions
          cardData={cardData}
          setCardData={setCardData}
          setZoomView={setZoomView}
        />
      )}
    </div>
  );
};

function ZoomOptions({ cardData, setCardData, setZoomView }) {
  let selectedFirst = cardData.refreshRate;
  let selectedSecond = cardData.DataMaxLength;
  function RefreshHandler(newValue) {
    setCardData({ ...cardData, refreshRate: newValue }, cardData.FieldId);
    selectedFirst = newValue;
  }
  function PointsHandler(newValue) {
    setCardData({ ...cardData, DataMaxLength: newValue }, cardData.FieldId);
    selectedSecond = newValue;
  }
  return (
    <div className="d-flex flex-row justify-content-center align-items-center">
      <IconButton
        name={"backArrow"}
        styleClass={"chart_option"}
        onClick={() => {
          setZoomView(false);
        }}
        size={24}
        invisible={false}
      />
      <FormSelect
        Label="Data Density"
        selected={selectedFirst}
        Handler={RefreshHandler}
        styleClass={"zoomFormSelect"}
        OptionsData={["1s", 1, "2s", 2, "5s", 5, "30s", 30, "60s", 60]}
      />
      <div className="title_spacer"></div>
      <FormSelect
        Label=" Chart Points "
        selected={selectedSecond}
        Handler={PointsHandler}
        styleClass={"zoomFormSelect"}
        OptionsData={["15", 15, "30", 30, "50", 50, "100", 100, "200", 200]}
      />
    </div>
  );
}

export default ChartCard;
