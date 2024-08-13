import React from "react";
import isEqual from "lodash/isEqual";

function Title({ isActive, zoomView, name, groupsCount }) {
  const title = zoomView
    ? name
    : isActive === 0
    ? "All Groups"
    : isActive === groupsCount + 1
    ? "Settings"
    : "Group " + isActive;

  return (
    <div className="d-flex justify-content-center align-items-center dashboard_header border">
      <div className="title">{title}</div>
    </div>
  );
}

export default React.memo(Title, (prevProps, nextProps) =>
  isEqual(prevProps, nextProps)
);
