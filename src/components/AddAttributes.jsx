import axios from "axios";
import React, { Fragment, useRef } from "react";

function AddAttributes(props) {
  const textRef = useRef();

  const addMoreHandler = async () => {
    const data = textRef.current.value;
    try {
      await axios.post(process.env.NEXT_PUBLIC_SERVER_URL + props.path, {
        data,
      });
      props.onSubmit(data);
      props.onClick();
    } catch (error) {
      console.log(error);
    }
  };

  const backdropClickHandler = () => {
    props.onClick();
  };

  return (
    <Fragment>
      <div
        className="h-[100vh] w-[100%] absolute top-0 left-0 bg-[rgba(61,60,60,0.57)]"
        onClick={backdropClickHandler}
      ></div>
      <div className="w-[20rem] absolute flex flex-col justify-center items-center top-[30%] mx-auto left-[40%] bg-[white] p-[2rem] text-lg">
        <h1 className="text-center text-2xl">Add {props.for}</h1>
        <hr />
        <hr />
        <input
          type="text"
          placeholder={`Enter a new ${props.for}`}
          className="border-2 border-[#4379a0] my-[1rem] w-[15rem]"
          ref={textRef}
        />
        <button
          className="float-right max-w-[10rem] bg-[#3b8aca] hover:bg-[#4179a7] text-white px-[1rem] py-[0.3rem] rounded-xl shadow-sm shadow-black active:shadow-none"
          onClick={addMoreHandler}
        >
          Add {props.for}
        </button>
      </div>
    </Fragment>
  );
}

export default AddAttributes;
