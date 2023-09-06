// components/BackButton.js
import React from "react";
import { useRouter } from "next/router";

const BackButton = () => {
  const router = useRouter();

  return (
    <img
      src="https://cdn-icons-png.flaticon.com/512/7168/7168657.png"
      onClick={() => router.back()}
      className="rounded-full bg-white cursor-pointer hover:scale-105 shadow-sm active:shadow-none shadow-black h-[2rem]"
    />
  );
};

export default BackButton;
