import React from "react";

function CategoryTable(props) {
  return (
    <Fragment>
      <div
        className="h-[100vh] w-[100%] absolute top-0 left-0 bg-[rgba(61,60,60,0.57)]"
        onClick={() => props.onClick()}
      ></div>
      <div className="absolute"></div>
    </Fragment>
  );
}

export default CategoryTable;
