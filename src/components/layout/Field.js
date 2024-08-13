import { memo } from "react";
import MainCard from "./MainCard";
import ChartCard from "./ChartCard";

function Field({ cardData, setCardData, setZoomView, cardsCount }) {
  let Chart = <></>;
  if (cardData.width !== 2)
    Chart = (
      <ChartCard
        cardsCount={cardsCount}
        cardData={cardData}
        setCardData={setCardData}
        height={206}
        setZoomView={setZoomView}
      />
    );
  return (
    <div className="d-flex flex-row">
      <MainCard
        index={cardData.FieldId}
        cardData={cardData}
        setCardData={setCardData}
        setZoomView={setZoomView}
      />
      {Chart}
    </div>
  );
}

export default memo(Field);
