import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Router, { useRouter } from "next/router";
import Sidebar from "@/components/Sidebar";
import ImageUpload from "@/components/ImageUpload";
import Backdrop from "@/components/Backdrop";
import AddAttributes from "@/components/AddAttributes";
import LoadingSpinner from "@/components/LoadingSpnner";

const sizeData = [
  { id: 1, name: "N/A", value: null },
  { id: 2, name: "S", value: "S" },
  { id: 3, name: "M", value: "M" },
  { id: 4, name: "L", value: "L" },
  { id: 5, name: "XL", value: "XL" },
  { id: 6, name: "XXL", value: "XXL" },
  { id: 7, name: "XXXL", value: "XXXL" },
];

const taxData = [
  { id: 1, name: "5%", value: 5 },
  { id: 2, name: "12%", value: 12 },
  { id: 3, name: "18%", value: 18 },
  { id: 4, name: "28%", value: 28 },
];

const helperData = [
  { id: 1, name: "Applicable", value: true },
  { id: 2, name: "Not Applicable", value: false },
];

function updateProduct() {
  const router = useRouter();
  const { user, productId } = router.query;
  const [isLoading, setIsLoading] = useState(false);
  const [showTags, setShowTags] = useState(false);
  const [showAddTags, setShowAddTags] = useState(false);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [category, setCategory] = useState([]);
  const [tagsOptions, setTagsOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [mainImageFile, setMainImageFile] = useState();
  const [firstImageFile, setFirstImageFile] = useState();
  const [secondImageFile, setSecondImageFile] = useState();
  const [thirdImageFile, setThirdImageFile] = useState();
  const [mainImageUrl, setMainImageUrl] = useState();
  const [firstImageUrl, setFirstImageUrl] = useState();
  const [secondImageUrl, setSecondImageUrl] = useState();
  const [thirdImageUrl, setThirdImageUrl] = useState();
  const nameRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();
  const taxRef = useRef();
  const quantityRef = useRef();
  const colorRef = useRef();
  const sizeRef = useRef();
  const codRef = useRef();
  const returnRef = useRef();
  const cancelOrderRef = useRef();
  const mrpRef = useRef();
  const offeredValueRef = useRef();
  const hsnRef = useRef();
  const keywordRef = useRef();
  const detailRef = useRef();

  const serverTimeZoneOffsetMinutes = 5 * 60 + 30; // 5 hours and 30 minutes in minutes
  const currentTimestamp = Math.floor(
    Date.now() / 1000 - serverTimeZoneOffsetMinutes * 60
  );

  useEffect(() => {
    if (
      typeof window !== undefined &&
      user &&
      user !== "admin" &&
      user !== "procurement" &&
      user != "sales"
    ) {
      router.replace("/");
    }
  }, [user]);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await axios.get(
          process.env.NEXT_PUBLIC_SERVER_URL + "/tags/tags",
          {
            params: {
              timestamp: currentTimestamp,
            },
          }
        );
        setTagsOptions(res.data.tags);
        const response = await axios.get(
          process.env.NEXT_PUBLIC_SERVER_URL + "/category/category",
          {
            params: {
              timestamp: currentTimestamp,
            },
          }
        );
        setCategory(response.data.category);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDetails();
  }, []);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await axios.get(
          process.env.NEXT_PUBLIC_SERVER_URL + "/products/product/" + productId,
          {
            params: {
              timestamp: currentTimestamp,
            },
          }
        );
        nameRef.current.value = res.data.productName;
        descriptionRef.current.value = res.data.shortDescription;
        categoryRef.current.value = res.data.category;
        setSelectedOptions(res.data.tags);
        taxRef.current.value = res.data.tax;
        quantityRef.current.value = res.data.quantity;
        colorRef.current.value = res.data.color;
        sizeRef.current.value = res.data.size;
        codRef.current.value = res.data.isCodAllowed;
        returnRef.current.value = res.data.isReturnAble;
        cancelOrderRef.current.value = res.data.isCancelAble;
        mrpRef.current.value = res.data.mrp;
        offeredValueRef.current.value = res.data.offeredPrice;
        hsnRef.current.value = res.data.hsn;
        keywordRef.current.value = res.data.keywords;
        detailRef.current.value = res.data.detailedDescription;
        setMainImageUrl(res.data.mainImage);
        if (res.data.otherImages) {
          setFirstImageUrl(res.data.otherImages[0]);
          setSecondImageUrl(res.data.otherImages[1]);
          setThirdImageUrl(res.data.otherImages[2]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (productId) fetchDetails();
  }, [productId, category]);

  const mainImageHandler = (file) => {
    setMainImageFile(file);
  };

  const firstImageHandler = (file) => {
    setFirstImageFile(file);
  };

  const secondImageHandler = (file) => {
    setSecondImageFile(file);
  };

  const thirdImageHandler = (file) => {
    setThirdImageFile(file);
  };

  const handleOptionChange = (value) => {
    setSelectedOptions(value);
  };

  const categoryAddHandler = (value) => {
    setCategory((prev) => [...prev, value]);
  };

  const tagAddHandler = (value) => {
    setTagsOptions((prev) => [...prev, value]);
  };

  const updateProductHandler = async () => {
    if (
      parseInt(offeredValueRef.current.value) > parseInt(mrpRef.current.value)
    ) {
      return;
    }
    setIsLoading(true);
    let mainImagePath;
    if (mainImageFile) {
      try {
        await axios.post(
          process.env.NEXT_PUBLIC_SERVER_URL + "/products/deleteimage",
          {
            path: mainImageUrl,
          }
        );
      } catch (error) {}
      const mainformData = new FormData();
      mainformData.append("image", mainImageFile);
      try {
        const response = await axios.post(
          process.env.NEXT_PUBLIC_SERVER_URL + "/products/addimage",
          mainformData
        );
        mainImagePath = response.data.path;
      } catch (error) {}
    } else {
      mainImagePath = mainImageUrl;
    }
    let firstImagePath;
    if (firstImageFile) {
      try {
        await axios.post(
          process.env.NEXT_PUBLIC_SERVER_URL + "/products/addimage",
          {
            path: firstImageUrl,
          }
        );
      } catch (error) {}
      const firstformData = new FormData();
      firstformData.append("image", firstImageFile);
      try {
        const response = await axios.post(
          process.env.NEXT_PUBLIC_SERVER_URL + "/products/addimage",
          firstformData
        );
        firstImagePath = response.data.path;
      } catch (error) {}
    } else {
      firstImagePath = firstImageUrl;
    }
    let secondImagePath;
    if (secondImageFile) {
      try {
        await axios.post(
          process.env.NEXT_PUBLIC_SERVER_URL + "/products/addimage",
          {
            path: secondImageUrl,
          }
        );
      } catch (error) {}
      const secondformData = new FormData();
      secondformData.append("image", secondImageFile);
      try {
        const response = await axios.post(
          process.env.NEXT_PUBLIC_SERVER_URL + "/products/addimage",
          secondformData
        );
        secondImagePath = response.data.path;
      } catch (error) {}
    } else {
      secondImagePath = secondImageUrl;
    }
    let thirdImagePath;
    if (thirdImageFile) {
      const thirdformData = new FormData();
      thirdformData.append("image", thirdImageFile);
      try {
        const response = await axios.post(
          process.env.NEXT_PUBLIC_SERVER_URL + "/products/addimage",
          thirdformData
        );
        thirdImagePath = response.data.path;
      } catch (error) {}
    } else {
      thirdImagePath = thirdImageUrl;
    }
    const formData = new FormData();
    formData.append("productName", nameRef.current.value);
    formData.append("shortDescription", descriptionRef.current.value);
    formData.append("size", sizeRef.current.value);
    formData.append("category", categoryRef.current.value);
    formData.append("tags", selectedOptions);
    formData.append("tax", taxRef.current.value);
    formData.append("quantity", quantityRef.current.value);
    formData.append("color", colorRef.current.value);
    formData.append("isCodAllowed", codRef.current.value);
    formData.append("isReturnAble", returnRef.current.value);
    formData.append("isCancelAble", cancelOrderRef.current.value);
    formData.append("mrp", mrpRef.current.value);
    formData.append("offeredPrice", offeredValueRef.current.value);
    formData.append("hsn", hsnRef.current.value);
    formData.append("keywords", keywordRef.current.value);
    formData.append("detailedDescription", detailRef.current.value);
    formData.append("mainImage", mainImagePath);
    formData.append("firstImage", firstImagePath);
    formData.append("secondImage", secondImagePath);
    formData.append("thirdImage", thirdImagePath);
    try {
      await axios.put(
        process.env.NEXT_PUBLIC_SERVER_URL +
          "/products/update_product/" +
          productId,
        formData
      );
      Router.push({
        pathname: `/${user}/dashboard/dashboard`,
      });
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const toggleShowtags = () => {
    setShowTags((prev) => !prev);
  };

  return (
    <div className="flex flex-col min-h-screen mt-[4rem]">
      {isLoading && (
        <div className="absolute z-50 top-0 bg-[rgba(34,84,114,0.2)] w-full">
          <LoadingSpinner />
        </div>
      )}
      <div className="flex-grow lg:flex lg:mt-5 ">
        <Sidebar />
        <div className="md:flex w-full lg:h-[38.2rem] lg:mx-[3rem] md:my-[0] my-[2rem] gap-[2%]">
          <div className="bg-white lg:w-[49%] lg:rounded-s-3xl rounded-3xl lg:pl-[2rem] pl-[0.5rem] py-[2rem]">
            <div className="flex flex-row lg:gap-[1rem]">
              <div className="">
                <div className="text-lg ml-[1rem] my-[0.5rem]">
                  Product Name
                </div>
                <input
                  type="text"
                  ref={nameRef}
                  className="border-b-2 border-[#4379a0]"
                />
                <div className="text-lg ml-[1rem] my-[1rem]">
                  Product Description
                </div>
                <textarea
                  className="border-2 border-[#4379a0]"
                  ref={descriptionRef}
                  rows="3"
                  cols="25"
                />
              </div>
              <div className="flex flex-col justify-center items-center w-[50%]">
                <ImageUpload
                  onInput={mainImageHandler}
                  main={true}
                  preview={mainImageUrl}
                />
                <div className="text-sm font-semibold">Product Main Image</div>
              </div>
            </div>
            <div className="lg:flex my-[1.5rem]">
              <div className="w-[50%]">
                <div className="text-lg ml-[1rem] my-[0.5rem]">Size</div>
                <select
                  name="size"
                  ref={sizeRef}
                  className="border-2 border-[#4379a0] w-[10rem]"
                >
                  {sizeData.map((color) => (
                    <option key={color.id} value={color.name}>
                      {color.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-[50%]">
                <div className="text-lg ml-[1rem] my-[0.5rem]">Tax</div>
                <select
                  name="tax"
                  className="border-2 border-[#4379a0] w-[10rem]"
                  ref={taxRef}
                  defaultValue="12"
                >
                  {taxData.map((cat) => (
                    <option key={cat.id} value={cat.value}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="lg:flex my-[1.5rem]">
              <div className="w-[50%]">
                <div className="text-lg ml-[1rem] my-[0.5rem]">Tags</div>
                <button
                  className="border-2 border-[#4379a0] w-[10rem] truncate shadow-sm active:shadow-none shadow-[#4379a0] hover:text-white hover:bg-[#4379a0]"
                  onClick={toggleShowtags}
                >
                  {selectedOptions.length === 0
                    ? "Select Tags"
                    : selectedOptions.map((tag, index) => (
                        <span key={index}>{tag},</span>
                      ))}
                </button>
                {showTags && (
                  <Backdrop
                    tags={tagsOptions}
                    onClick={toggleShowtags}
                    onSubmit={handleOptionChange}
                  />
                )}
                <div
                  className="w-[10rem] cursor-pointer text-center border-2 border-black hover:bg-black hover:text-white"
                  onClick={() => setShowAddTags(true)}
                >
                  Add more
                </div>
                {showAddTags && (
                  <AddAttributes
                    onSubmit={tagAddHandler}
                    onClick={() => {
                      setShowAddTags(false);
                    }}
                    for="Tag"
                    path="/tags/tags"
                  />
                )}
              </div>
              <div className="w-[50%]">
                <div className="text-lg ml-[1rem] my-[0.5rem]">Category</div>
                <select
                  name="category"
                  ref={categoryRef}
                  className="border-2 border-[#4379a0]"
                >
                  {category.map((cat, index) => (
                    <option key={index} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                <div
                  className="w-[9.9rem] cursor-pointer text-center border-2 border-black hover:bg-black hover:text-white"
                  onClick={() => setShowAddCategory(true)}
                >
                  Add more
                </div>
                {showAddCategory && (
                  <AddAttributes
                    onSubmit={categoryAddHandler}
                    onClick={() => {
                      setShowAddCategory(false);
                    }}
                    for="Category"
                    path="/category/category"
                  />
                )}
              </div>
            </div>
            <div className="lg:flex my-[1rem]">
              <div className="w-[50%]">
                <div className="text-lg ml-[1rem] my-[0.5rem]">Quantity</div>
                <input
                  type="text"
                  ref={quantityRef}
                  className="border-b-2 border-[#4379a0]"
                />
              </div>
              <div className="w-[50%]">
                <div className="text-lg ml-[1rem] my-[0.5rem]">Color</div>

                <input
                  type="color"
                  name="color"
                  ref={colorRef}
                  className="w-[10rem]"
                ></input>
              </div>
            </div>
          </div>
          <div className="bg-white lg:w-[49%] lg:h-auto h-[50rem] lg:rounded-e-3xl rounded-3xl pl-[1.5rem] pr-[2rem] py-[2rem]">
            <div className="lg:flex gap-[1.2rem]">
              <div className="">
                <div className="text-lg my-[0.5rem]">Cash On Delivery</div>
                <select
                  name="cod"
                  ref={codRef}
                  className="border-2 border-[#4379a0] w-[10rem]"
                >
                  {helperData.map((data) => (
                    <option key={data.id} value={data.value}>
                      {data.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="">
                <div className="text-lg my-[0.5rem]">Return Policy</div>
                <select
                  name="return"
                  ref={returnRef}
                  className="border-2 border-[#4379a0] w-[10rem]"
                >
                  {helperData.map((data) => (
                    <option key={data.id} value={data.value}>
                      {data.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="">
                <div className="text-lg my-[0.5rem]">Cancel Order</div>
                <select
                  name="cancelOrder"
                  ref={cancelOrderRef}
                  className="border-2 border-[#4379a0] w-[10rem]"
                >
                  {helperData.map((data) => (
                    <option key={data.id} value={data.value}>
                      {data.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="lg:flex mt-[0.5rem]">
              <div className="lg:w-[50%]">
                <div className="text-lg ml-[1rem] my-[0.5rem]">MRP</div>
                <input
                  type="text"
                  ref={mrpRef}
                  className="border-b-2 border-[#4379a0]"
                />
              </div>
              <div className="w-[50%]">
                <div className="text-lg ml-[1rem] my-[0.5rem]">
                  Offered Price
                </div>
                <input
                  type="text"
                  ref={offeredValueRef}
                  className="border-b-2 border-[#4379a0]"
                />
              </div>
            </div>
            <div className="lg:flex mt-[0.5rem]">
              <div className="lg:w-[50%]">
                <div className="text-lg ml-[1rem] my-[0.5rem]">HSN Code</div>
                <input
                  type="text"
                  ref={hsnRef}
                  className="border-b-2 border-[#4379a0]"
                />
              </div>
              <div className="w-[50%]">
                <div className="text-lg ml-[1rem] my-[0.5rem]">Keywords</div>
                <input
                  type="text"
                  ref={keywordRef}
                  className="border-b-2 border-[#4379a0]"
                />
              </div>
            </div>
            <div className="flex flex-col mt-[0.5rem]">
              <div className="text-lg ml-[1rem] my-[0.5rem]">
                Product's other images
              </div>
              <div className="flex gap-[1rem] h-[7.5rem]">
                <ImageUpload
                  onInput={firstImageHandler}
                  preview={firstImageUrl}
                />
                <ImageUpload
                  onInput={secondImageHandler}
                  preview={secondImageUrl}
                />
                <ImageUpload
                  onInput={thirdImageHandler}
                  preview={thirdImageUrl}
                />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="text-lg ml-[1rem] my-[0.5rem]">
                Detailed description of product
              </div>
              <textarea
                className="border-2 border-[#4379a0]"
                rows="3"
                ref={detailRef}
                cols="30"
              />
            </div>
            <button
              className="bg-[#4e87af] uppercase text-[white] py-1 px-3 cursor-pointer rounded-2xl mt-[1.2rem] float-right"
              onClick={updateProductHandler}
            >
              Update Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default updateProduct;
