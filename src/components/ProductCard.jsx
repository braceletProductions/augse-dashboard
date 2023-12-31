import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

function ProductCard(props) {
  const router = useRouter();
  const { user } = router.query;

  return (
    <Link
      href={"/" + user + "/product/" + props.id}
      className="w-[10rem] bg-white pb-1"
    >
      <Image
        src={process.env.NEXT_PUBLIC_IMAGE_URL + props.image}
        height="150"
        width="100"
        className="max-h-[10rem] mx-[auto]"
        alt={props.name}
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
