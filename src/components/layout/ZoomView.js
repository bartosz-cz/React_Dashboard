import ChartCard from "./ChartCard";

export default function ZoomView({
  setZoomView,
  cardData,
  setCardsData,
  cardsCount,
}) {
  return (
    <div className="flex-column">
      <ChartCard
        cardData={cardData}
        cardsCount={cardsCount}
        setCardData={setCardsData}
        width={window.innerWidth / 106 + 1}
        height={window.innerHeight - 150}
        setZoomView={setZoomView}
      ></ChartCard>
    </div>
  );
}
