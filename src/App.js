import React, { useState } from "react";
import "./App.css";
import LeftMenu from "./components/layout/LeftMenu";
import MainContent from "./components/layout/MainContent";

export default function App() {
  const [activeGroup, setActiveGroup] = useState(0);
  const [isZoomView, setIsZoomView] = useState(false);
  const [cardsCount, setCardsCount] = useState(30);
  const [groupsCount, setGroupsCount] = useState(3);
  return (
    <div className="overflow-auto d-flex flex-row dashboard">
      <LeftMenu
        setIsActive={setActiveGroup}
        isActive={activeGroup}
        zoomView={isZoomView}
        setZoomView={setIsZoomView}
        groupsCount={groupsCount}
      />
      <MainContent
        setActiveGroup={setActiveGroup}
        isActive={activeGroup}
        zoomView={isZoomView}
        setZoomView={setIsZoomView}
        groupsCount={groupsCount}
        cardsCount={cardsCount}
        setCardsCount={setCardsCount}
        setGroupsCount={setGroupsCount}
      />
    </div>
  );
}
