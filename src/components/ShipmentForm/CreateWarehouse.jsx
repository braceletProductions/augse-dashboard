import React from "react";
import CardWithBackDrop from "../Settings/CardWithBackDrop";

function CreateWarehouse({ onClose }) {
  return (
    <CardWithBackDrop onClose={onClose}>
      <h2 className="text-xl font-semibold mb-4 text-center">Create Warehouse</h2>
    </CardWithBackDrop>
  );
}

export default CreateWarehouse;
