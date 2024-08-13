import React from "react";
import IconButton from "../ui/IconButton";

function LeftMenu({
  isActive,
  setIsActive,
  zoomView,
  setZoomView,
  groupsCount,
}) {
  const groupNames = [
    "allGroup",
    "group0",
    "group1",
    "group2",
    "group3",
    "group4",
  ];
  let visibleGroupNames = groupNames.slice(0, groupsCount + 1);
  visibleGroupNames = [...visibleGroupNames, "settings"];

  const handleOptionClick = (index) => {
    if (zoomView) {
      setZoomView(false);
    }
    setIsActive(index);
  };

  return (
    <div className="d-flex flex-column dashboard_menu border">
      {visibleGroupNames.map((name, index) => (
        <IconButton
          key={name}
          name={name}
          onClick={() => handleOptionClick(index)}
          invisible={false}
          styleClass={"option"}
          active={isActive === index}
        />
      ))}
      <div className="d-flex flex-fill" />{" "}
    </div>
  );
}

export default LeftMenu;
