import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Router, { useRouter } from "next/router";
import Sidebar from "@/components/Sidebar";
import ImageUpload from "@/components/ImageUpload";

const category = [
  { id: 1, name: "Pure Silk Saree" },
  { id: 2, name: "Semi Silk Saree" },
  { id: 3, name: "Cotton Saree" },
  { id: 4, name: "Kanchivaram Saree" },
  { id: 5, name: "Bandhani Saree" },
  { id: 6, name: "Organga Saree" },
  { id: 7, name: "Printed Saree" },
];

const colorData = [
  { id: 1, name: "Black", col: "black" },
  { id: 2, name: "Blue", col: "blue" },
  { id: 3, name: "White", col: "white" },
  { id: 4, name: "Navy", col: "navy" },
  { id: 5, name: "Green", col: "green" },
  { id: 6, name: "Red", col: "red" },
  { id: 7, name: "Yellow", col: "yellow" },
  { id: 8, name: "Indigo", col: "indigo" },
  { id: 9, name: "Orange", col: "orange" },
  { id: 10, name: "Purple", col: "purple" },
  { id: 11, name: "Pink", col: "pink" },
  { id: 12, name: "Gray", col: "gray" },
];

const sizeData = [
  { id: 1, name: "M" },
  { id: 2, name: "L" },
  { id: 3, name: "XL" },
  { id: 4, name: "XXL" },
  { id: 5, name: "XXXL" },
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
  const { productId } = router.query;
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
  const detailRef = useRef();

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await axios.get(
          process.env.NEXT_PUBLIC_SERVER_URL + "/tags/tags"
        );
        setTagsOptions(res.data.tags);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTags();
  }, []);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await axios.get(
          process.env.NEXT_PUBLIC_SERVER_URL + "/products/product/" + productId
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
  }, [productId]);

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

  const handleOptionChange = (event) => {
    const selectedValues = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setSelectedOptions(selectedValues);
  };

  const updateProductHandler = async () => {
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
    formData.append("detailedDescription", detailRef.current.value);
    formData.append("mainImage", mainImagePath);
    formData.append("firstImage", firstImagePath);
    formData.append("secondImage", secondImagePath);
    formData.append("thirdImage", thirdImagePath);
    try {
      const res = await axios.put(
        process.env.NEXT_PUBLIC_SERVER_URL +
          "/products/update_product/" +
          productId,
        formData
      );
      Router.push({
        pathname: "/dashboard/dashboard",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen mt-[4rem]">
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
                <div className="text-lg ml-[1rem] my-[0.5rem]">Category</div>
                <select
                  name="category"
                  ref={categoryRef}
                  className="border-2 border-[#4379a0]"
                >
                  {category.map((cat) => (
                    <option key={cat.id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="lg:flex my-[1.5rem]">
              <div className="w-[50%]">
                <div className="text-lg ml-[1rem] my-[0.5rem]">Tags</div>
                <select
                  multiple
                  name="tags"
                  onChange={handleOptionChange}
                  value={selectedOptions}
                  className="border-2 border-[#4379a0]"
                >
                  {tagsOptions.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
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
                <select
                  name="color"
                  ref={colorRef}
                  className="border-2 border-[#4379a0] w-[10rem]"
                >
                  {colorData.map((color) => (
                    <option key={color.id} value={color.name}>
                      {color.name}
                    </option>
                  ))}
                </select>
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
            <div className="lg:flex mt-[0.8rem]">
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
            <div className="flex flex-col mt-[0.8rem]">
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
              <div className="text-lg ml-[1rem] my-[0.8rem]">
                Detailed description of product
              </div>
              <textarea
                className="border-2 border-[#4379a0]"
                rows="5"
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
