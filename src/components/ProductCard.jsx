import Link from "next/link";
import React from "react";

function ProductCard(props) {
  return (
    <Link href={"/product/" + props.id} className="w-[10rem] bg-white pb-1">
      <img
        src={process.env.NEXT_PUBLIC_IMAGE_URL + props.image}
        className="max-h-[10rem] mx-[auto]"
        alt=""
      />
      <div className="text-center font-medium truncate px-1">{props.name}</div>
      {props.status ? (
        <div className="text-center font-medium text-red-500">Out of stock</div>
      ) : (
        <div className="text-center font-medium text-yellow-500">
          Low in stock
        </div>
      )}
    </Link>
  );
}

export default ProductCard;
