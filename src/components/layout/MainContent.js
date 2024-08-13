import React, { useState, useEffect, useRef, createContext } from "react";
import Title from "../ui/Title";
import Websocket from "../../api/websocket";
import ZoomView from "./ZoomView";
import MainSettings from "./MainSettings";
import Rows from "./Rows";
import Data from "../utils/DataStructure";

export const CardsContext = createContext();

function MainContent({
  isActive,
  setActiveGroup,
  zoomView,
  setZoomView,
  groupsCount,
  cardsCount,
  setCardsCount,
  setGroupsCount,
}) {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const actualSettings = useRef({
    refresh: 1,
    points: 15,
    maxCards: 3,
    archivesSize: 200,
  });
  const [cardsData, setCardsData] = useState(Data(cardsCount));
  const zoomCardId = useRef(0);
  const maxCardsInRow = useRef(3);
  useEffect(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const setFieldData = (data, index) => {
    const newData = cardsData.map((c, i) => (i === index ? data : c));
    setCardsData(newData);
  };

  const setZoomCardId = (fieldId) => {
    zoomCardId.current = fieldId;
    setZoomView(true);
  };

  return (
    <div className="d-flex flex-column">
      <Websocket
        CardsData={cardsData}
        setCardsData={setCardsData}
        actualSettings={actualSettings}
        setCardsCount={setCardsCount}
      />
      <Title
        isActive={isActive}
        zoomView={zoomView}
        name={cardsData[zoomCardId.current].name}
        groupsCount={groupsCount}
      />
      <CardsContext.Provider value={cardsData}>
        {zoomView ? (
          <ZoomView
            cardsCount={cardsCount}
            setZoomView={setZoomView}
            cardData={cardsData[zoomCardId.current]}
            setCardsData={setFieldData}
          />
        ) : isActive !== groupsCount + 1 ? (
          <Rows
            actualSettings={actualSettings}
            allCardsCount={cardsCount}
            groupsCount={groupsCount}
            setZoomView={setZoomCardId}
            isActive={isActive}
            screenWidth={screenWidth}
            CardsData={cardsData}
            setFieldData={setFieldData}
          />
        ) : (
          <MainSettings
            setActiveGroup={setActiveGroup}
            actualSettings={actualSettings}
            CardsData={cardsData}
            setCardsData={setCardsData}
            MaxCardsInRow={maxCardsInRow}
            setGroupsCount={setGroupsCount}
            groupsCount={groupsCount}
          />
        )}
      </CardsContext.Provider>
    </div>
  );
}

export default MainContent;
