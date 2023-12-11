import BackButton from "@/components/BackButton";
import ProductCard from "@/components/ProductCard";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import CategoryWiseStockChart from "@/components/CategoryWiseStockChart";
import LoadingSpinner from "@/components/LoadingSpnner";

function status() {
  const [outofstock, setoutofstock] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { user, status } = router.query;
  const products = useSelector((state) => state.products.totalProducts);

  useEffect(() => {
    if (
      typeof window !== undefined &&
      user &&
      user !== "admin" &&
      user !== "procurement" &&
      user != "sales"
    ) {
      router.replace("/");
    } else {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }, [user]);

  useEffect(() => {
    if (status == "outofstock") {
      const filter = products.filter((data) => data.quantity === 0);
      setoutofstock(true);
      setFilteredProducts(filter);
    } else {
      const filter = products.filter(
        (data) => data.quantity <= 5 && data.quantity !== 0
      );
      setFilteredProducts(filter);
    }
  }, [status, products]);

  if (isLoading || !products) {
    return <LoadingSpinner />;
  }

  return (
    <div className="w-full">
      <div className="ml-[2rem] mt-[2rem]">
        <BackButton />
      </div>
      <div className="max-w-screen-2xl mx-auto p-[2rem]">
        <div className="text-5xl text-white font-semibold">
          Products {outofstock ? "Out of" : "Less in"} Stock
        </div>
        <div className="flex lg:flex-row flex-col-reverse my-[2rem]">
          <div className="flex-[2] p-[1rem]">
            <div className="sm:grid 2xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 flex flex-col justify-center items-center gap-[2rem]">
              {filteredProducts.map((data) => (
                <ProductCard
                  key={data._id}
                  id={data._id}
                  image={data.mainImage}
                  name={data.productName}
                  status={outofstock}
                />
              ))}
            </div>
          </div>
          <CategoryWiseStockChart />
        </div>
      </div>
    </div>
  );
}

export default status;
