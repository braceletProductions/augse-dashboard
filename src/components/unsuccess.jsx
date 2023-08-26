import React from "react";
import Image from "next/image";
import Link from "next/link";

const Unsuccess = () => {
  return (
    <div className="bg-gray-100 w-full h-screen flex justify-center item-center text-center ">
      <div className="  m-20 p-10 ">
        <div className="flex justify-center text-center  items-center  ">
          <div className="w-1/4 text-center ">
            <Image
              src="/image73.svg"
              alt="Checkmark"
              width={600}
              height={200}
            />
          </div>
        </div>
        <div className=" mt-5">
          <h1 className="text-4xl">Unsuccessful</h1>
          <p className="text-xl mt-5">
            The Payment was unsuccessful. Please try again
          </p>
        </div>
        <Link href={""}>
          {/* give link */}
          <button
            className="rounded-3xl px-11  py-2 mt-16"
            style={{ backgroundColor: "#D6CB6B", color: "white" }}
          >
            Payment Gateway
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Unsuccess;
