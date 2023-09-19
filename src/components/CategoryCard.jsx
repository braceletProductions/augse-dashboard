import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

function CategoryCard(props) {
  const router = useRouter();
  const { user } = router.query;

  return (
    <Link
      href={"/" + user + "/product/" + props.id}
      className="w-[10rem] bg-white pb-1"
    >
      <img
        src={process.env.NEXT_PUBLIC_IMAGE_URL + props.image}
        className="max-h-[10rem] mx-[auto]"
        alt=""
      />
      <div className="text-center font-medium">{props.name}</div>
    </Link>
  );
}

export default CategoryCard;
