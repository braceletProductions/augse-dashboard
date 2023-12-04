import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Procurement from "@/components/dashboards/Procurement";
import React, { Fragment } from "react";

function dashboard() {
  const user = "procurement";

  return (
    <Fragment>
      <Header user={user} />
      <div className="w-full flex">
        <Sidebar user={user} />
        <Procurement />
      </div>
    </Fragment>
  );
}

export default dashboard;
