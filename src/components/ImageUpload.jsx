import React, { useRef, useState, useEffect, Fragment } from "react";
import imageBackground from "../assests/image-background.png";

function ImageUpload(props) {
  const [file, setFile] = useState();
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
      setFile(pickedFile);
      props.onInput(pickedFile);
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
            {!previewUrl && props.preview && (
              <img
                src={"http://localhost:4001/files/" + props.preview}
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
      {!previewUrl && !props.preview && (
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
