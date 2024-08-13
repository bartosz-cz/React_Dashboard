import React, { memo } from "react";
import Field from "./Field";

function Rows({
  actualSettings,
  allCardsCount,
  groupsCount,
  setZoomView,
  isActive,
  screenWidth,
  CardsData,
  setFieldData,
}) {
  let cardsCount = 0;
  let startIndex = 0;
  if (isActive === 0) {
    cardsCount = allCardsCount;
  } else if (isActive !== groupsCount + 1) {
    if (allCardsCount % groupsCount !== 0 && isActive === groupsCount) {
      cardsCount =
        allCardsCount -
        (groupsCount - 1) * Math.floor(allCardsCount / groupsCount);
    } else {
      cardsCount = Math.floor(allCardsCount / groupsCount);
    }
    startIndex = Math.floor(allCardsCount / groupsCount) * (isActive - 1);
  }
  const rows = [];
  let cards = [];
  let addedCards = 0;
  for (let i = 0; i < allCardsCount; i++) {
    let cumulativeWidth = 0;
    for (
      let u = 0;
      addedCards < cardsCount &&
      u < actualSettings.current.maxCards &&
      (cumulativeWidth + CardsData[startIndex + addedCards].width * 106 <
        screenWidth - 200 ||
        u === 0);
      u++
    ) {
      const field = CardsData[startIndex + addedCards];
      cumulativeWidth += field.width * 106;
      cards.push(
        <Field
          cardsCount={allCardsCount}
          key={field.FieldId}
          cardData={field}
          setCardData={setFieldData}
          setZoomView={setZoomView}
        />
      );
      addedCards++;
    }
    rows.push(<Row key={i} Cards={cards} />);
    cards = [];
  }

  return <>{rows}</>;
}

function Row({ Cards }) {
  return <div className="d-flex">{Cards}</div>;
}

export default memo(Rows);
