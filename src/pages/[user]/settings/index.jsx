import React, { Fragment } from "react";
import BackButton from "@/components/BackButton";
import SettingsChart from "@/components/Settings/SettingsChart";
import Head from "next/head";

function index() {
  return (
    <Fragment>
      <Head>
        <title>Settings</title>
      </Head>
      <div className="w-full">
        <div className="max-w-screen-2xl min-h-screen mx-auto p-8">
          <div className="mb-4 flex justify-between">
            <BackButton />
            <h1 className="text-3xl text-center text-white font-semibold">
              Settings
            </h1>
            <div />
          </div>
          <SettingsChart />
        </div>
      </div>
    </Fragment>
  );
}

export default index;
