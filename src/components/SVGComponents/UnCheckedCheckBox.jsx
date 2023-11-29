import React, { Fragment } from "react";

function UnCheckedCheckBox() {
  return (
    <Fragment>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect
          x="3"
          y="3"
          width="18"
          height="18"
          rx="2"
          ry="2"
          style={{ fill: "none", stroke: "#3498db" }}
        />
      </svg>
    </Fragment>
  );
}

export default UnCheckedCheckBox;
