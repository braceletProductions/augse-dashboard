import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Accountant from "@/components/dashboards/Accountant";
import React, { Fragment } from "react";

function dashboard() {
  const user = "accounts";
  return (
    <Fragment>
      <Header user={user} />
      <div className="w-full flex">
        <Sidebar user={user} />
        <Accountant />
      </div>
    </Fragment>
  );
}

export default dashboard;
