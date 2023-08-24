import React, { useRef, useState, useEffect, Fragment } from "react";
import imageBackground from "../assests/image-background.png";
import axios from "axios";

function ImageUpload(props) {
  const [file, setFile] = useState();
  const [filePath, setFilePath] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const filePickerRef = useRef();

  useEffect(() => {
    if (!file) return;
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickedHandler = async (event) => {
    let pickedFile;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      if (filePath != undefined) {
        try {
          const res = await axios.post(
            "http://localhost:4001/api/v1/products/deleteimage",
            {
              path: filePath,
            }
          );
        } catch (error) {}
      }
      const formData = new FormData();
      formData.append("image", pickedFile);
      try {
        const res = await axios.post(
          "http://localhost:4001/api/v1/products/addimage",
          formData
        );
        props.onInput(res.data.path);
        setFile(pickedFile);
        setFilePath(res.data.path);
      } catch (error) {}
    }
  };

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  return (
    <Fragment>
      <div>
        <input
          style={{ display: "none" }}
          ref={filePickerRef}
          type="file"
          accept=".jpg,.png,.jpeg"
          onChange={pickedHandler}
        />
        <div>
          <div>
            {previewUrl && (
              <img
                src={previewUrl}
                alt="Preview"
                className={`${
                  props.main ? "h-[10rem]" : "max-h-[7.5rem] max-w-[12rem]"
                }`}
                onClick={pickImageHandler}
              />
            )}
          </div>
        </div>
      </div>
      {!previewUrl && (
        <div
          style={{
            backgroundImage: `url(${imageBackground.src})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
          className={`h-[100%] ${
            props.main ? "w-[9rem]" : "w-[5.8rem]"
          } cursor-pointer`}
          onClick={pickImageHandler}
        ></div>
      )}
    </Fragment>
  );
}

export default ImageUpload;
