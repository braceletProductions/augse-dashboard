import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import BackButton from "@/components/BackButton";
import { useSelector } from "react-redux";
import CategoryCard from "@/components/CategoryCard";

const Category = () => {
  const [categoryData, setCategoryData] = useState([]);
  const router = useRouter();
  const { user, categoryName } = router.query;
  const products = useSelector((state) => state.products.totalProducts);

  useEffect(() => {
    if (
      typeof window !== undefined &&
      user &&
      user !== "admin" &&
      user != "procurement"
    ) {
      router.replace("/");
    }
  }, [user]);

  useEffect(() => {
    const filteredProducts = products.filter(
      (data) => data.category === categoryName
    );
    setCategoryData(filteredProducts);
  }, [products]);

  return (
    <div className="w-full">
      <div className="max-w-screen-2xl mx-auto">
        <div className="px-[3rem] py-[2rem]">
          <BackButton />
          <div className="text-4xl text-white my-[2rem] font-semibold">
            {categoryName}
          </div>
          <div className="sm:grid xl:grid-cols-5 md:grid-cols-4 sm:grid-cols-2 items-center justify-center gap-6 flex flex-col 2xl:mx-[4rem] my-[4rem]">
            {categoryData.map((data) => (
              <CategoryCard
                key={data._id}
                id={data._id}
                image={data.mainImage}
                name={data.productName}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
