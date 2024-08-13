import { useMemo } from "react";
import DatasetOption from "../components/layout/DatasetOptions";

const useChartOptions = (
  cardsCount,
  FieldId,
  setCardData,
  setActiveDataSets,
  activeDataSets
) => {
  return useMemo(() => {
    const chartOptions = [];
    for (let i = 1; i <= cardsCount; i++) {
      if (i !== FieldId + 1) {
        chartOptions.push(
          <DatasetOption
            key={i}
            index={i}
            FieldId={FieldId}
            setCardData={setCardData}
            setActiveDataSets={setActiveDataSets}
            activeDataSets={activeDataSets}
          />
        );
      }
    }

    return chartOptions;
  }, [FieldId, setCardData, setActiveDataSets, activeDataSets, cardsCount]);
};

export default useChartOptions;
