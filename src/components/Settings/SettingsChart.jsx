import React from "react";
import LeftContent from "./LeftContent";
import RightContent from "./RightContent";

function SettingsChart() {
  return (
    <div className="bg-white min-h-screen rounded-3xl p-6">
      <div className="flex min-h-full">
        <LeftContent />
        <RightContent />
      </div>
    </div>
  );
}

export default SettingsChart;
