// components/BackButton.js
import React from "react";
import { useRouter } from "next/router";

const BackButton = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="rounded-2xl font-bold texl-xl"
      style={{ backgroundColor: "rgb(27,72,121)", color: "white" }}
    >
      Back
    </button>
  );
};

export default BackButton;
