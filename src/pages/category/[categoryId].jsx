import { useRouter } from "next/router";
import varietyData from "@/tempData/varietyData";

const CategoryDetailPage = () => {
  const router = useRouter();
  const { categoryId } = router.query;

  // Find the category data by matching categoryId
  const category = varietyData.find(
    (category) => category.id === Number(categoryId)
  );

  if (!category) {
    return <p>Category not found</p>;
  }

  return (
    <div className=" bg-gray-100 flex flex-col text-center items-center rounded-2xl  m-20 p-10">
      <h1>{category.name}</h1>
      <p>{category.description}</p>
      <div className="justify-center border item-center mt-20 p-4">
        <img src={category.imageUrl} alt={category.name} />
      </div>
    </div>
  );
};

export default CategoryDetailPage;
