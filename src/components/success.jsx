import React from "react";
import Image from "next/image";
import Link from "next/link";

const Success = () => {
  return (
    <div className="success w-full h-screen bg-gray-50">
      <div className="flex  .lg:h-96 ">
        <div className="w-1/4">
          <Image src="/image67.svg" alt="Image 1" width={400} height={50} />
        </div>
        <div className="w-1/4 ">
          <Image src="/image69.svg" alt="Image 2" width={400} height={50} />
        </div>
        <div className="w-1/4">
          <Image src="/image71.svg" alt="Image 3" width={400} height={50} />
        </div>
        <div className="w-1/4">
          <Image src="/image70.svg" alt="Image 4" width={400} height={50} />
        </div>
        <div className="w-1/4">
          <Image src="/image68.svg" alt="Image 4" width={400} height={50} />
        </div>
      </div>
      <div className="flex justify-center text-center  items-center  ">
        <div className="w-1/4 text-center ">
          <Image src="/image72.svg" alt="Checkmark" width={100} height={50} />
        </div>
      </div>
      <div className="flex justify-center items-center ">
        <div className=" text-center  mt-5">
          <h1 className="font-bold text-4xl text-gray-900">Successful</h1>
          <p className="text-2xl">You have Successfully Placed your order</p>
        </div>
      </div>
      <div className="flex justify-center items-center ">
        <div className=" flex gap-x-8 text-center  mt-36">
          <p className="text-xl">Thank you and continue shopping with Augse</p>
          <Link href={""}>
            {/* give link */}
            <button
              className="rounded-3xl px-16  py-2"
              style={{ backgroundColor: "#D6CB6B", color: "white" }}
            >
              Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Success;
