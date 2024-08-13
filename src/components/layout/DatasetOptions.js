import React, { useState } from "react";
import { chartColors } from "../chart/chartStyle";
import isEqual from "lodash/isEqual";
import { useContext } from "react";
import { CardsContext } from "./MainContent";

function DatasetOption({
  index,
  FieldId,
  setCardData,
  activeDataSets,
  setActiveDataSets,
}) {
  let cardData = useContext(CardsContext)[FieldId];
  const [color, setColor] = useState({
    backColor: chartColors[2 * cardData.occupiedColors.indexOf(index)],
    borderColor: chartColors[2 * cardData.occupiedColors.indexOf(index) + 1],
  });
  const [scaleActive, setScaleActive] = useState(
    cardData.chartScales.indexOf(index) !== -1
  );

  const toggleDataset = () => {
    let newOccupiedColors = [...cardData.occupiedColors];
    if (color.backColor !== undefined) {
      let newColorIndex = newOccupiedColors.indexOf(index);
      let newChartScales = [...cardData.chartScales];
      if (scaleActive) {
        newChartScales[newColorIndex] = -1;
        setScaleActive(false);
      }

      newOccupiedColors[newColorIndex] = -1;
      setColor({
        backColor: undefined,
        borderColor: undefined,
      });
      setActiveDataSets((current) => current - 1);
      setCardData(
        {
          ...cardData,
          occupiedColors: newOccupiedColors,
          chartScales: newChartScales,
        },
        cardData.FieldId
      );
    } else if (activeDataSets < 5) {
      let newColorIndex = newOccupiedColors.indexOf(-1);
      newOccupiedColors[newColorIndex] = index;
      setColor({
        backColor: chartColors[2 * newColorIndex],
        borderColor: chartColors[2 * newColorIndex + 1],
      });
      setActiveDataSets((current) => current + 1);
      setCardData(
        { ...cardData, occupiedColors: newOccupiedColors },
        cardData.FieldId
      );
    }
  };

  const toggleScale = () => {
    if (!color.backColor) return;
    let newOccupiedColors = [...cardData.occupiedColors];
    let newScaleIndex = newOccupiedColors.indexOf(index);
    let newChartScales = [...cardData.chartScales];
    if (!scaleActive) {
      newChartScales[newScaleIndex] = index;
      setCardData(
        { ...cardData, chartScales: newChartScales },
        cardData.FieldId
      );
    } else {
      newChartScales[newScaleIndex] = -1;
      setCardData(
        { ...cardData, chartScales: newChartScales },
        cardData.FieldId
      );
    }
    setScaleActive(!scaleActive);
  };

  return (
    <div className="d-flex flex-row justify-content-between">
      <div className="form-check check">
        <input
          disabled={color.backColor == null && activeDataSets === 5}
          checked={color.backColor != null}
          readOnly
          style={{
            backgroundColor: color.backColor,
            borderColor: color.borderColor,
          }}
          className="form-check-input"
          onClick={toggleDataset}
          type="checkbox"
          id={`flexCheckDefault-${index}`}
        />
        <label
          className="form-check-label"
          htmlFor={`flexCheckDefault-${index}`}
        >
          ({index})
        </label>
      </div>
      <div className="form-check form-switch">
        <input
          className="form-check-input"
          disabled={!color.backColor}
          checked={scaleActive}
          readOnly
          style={{
            backgroundColor: scaleActive ? color.backColor : null,
            borderColor: scaleActive ? color.borderColor : null,
          }}
          onClick={toggleScale}
          type="checkbox"
          id={`flexSwitchCheckDefault-${index}`}
        />
      </div>
    </div>
  );
}

export default React.memo(DatasetOption, (prevProps, nextProps) =>
  isEqual(prevProps, nextProps)
);
