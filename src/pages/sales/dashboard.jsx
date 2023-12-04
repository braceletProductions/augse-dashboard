import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Sales from "@/components/dashboards/Sales";
import React, { Fragment } from "react";

function dashboard() {
  const user = "sales";
  return (
    <Fragment>
      <Header user={user} />
      <div className="w-full flex">
        <Sidebar user={user} />
        <Sales />
      </div>
    </Fragment>
  );
}

export default dashboard;
