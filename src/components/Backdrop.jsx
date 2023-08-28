import React, { Fragment, useState } from "react";

function Backdrop(props) {
  const [tagIndices, setTagIndices] = useState(new Set());

  const toggleTagIndex = (index) => {
    const newTagIndices = new Set(tagIndices);
    if (newTagIndices.has(index)) {
      newTagIndices.delete(index);
    } else {
      newTagIndices.add(index);
    }
    setTagIndices(newTagIndices);
  };

  const backdropClickHandler = () => {
    console.log("backdrop clicked");
    props.onClick();
  };

  const tagsSubmitHandler = () => {
    const selectedTagNames = Array.from(tagIndices).map(
      (index) => props.tags[index]
    );
    props.onSubmit(selectedTagNames);
    props.onClick();
  };

  return (
    <Fragment>
      <div
        className="h-[100vh] w-[100%] absolute top-0 left-0 bg-[rgba(61,60,60,0.57)]"
        onClick={backdropClickHandler}
      ></div>
      <div className="w-[50rem] absolute top-[25%] mx-auto left-[25%] bg-[white] p-[2rem] text-lg">
        <h1 className="text-center text-2xl">Select Tags</h1>
        <hr></hr>
        <div className="grid grid-cols-4 gap-x-[2.5rem] gap-y-[0.8rem] mt-[1rem]">
          {props.tags.map((tag, index) => (
            <label key={index}>
              {tag}
              {"  "}
              <input
                type="checkbox"
                checked={tagIndices.has(index)}
                onChange={() => toggleTagIndex(index)}
              />
            </label>
          ))}
        </div>
        <button
          className="float-right mr-[2rem] bg-[#3b8aca] text-white px-[1rem] py-[0.3rem] rounded-xl"
          onClick={tagsSubmitHandler}
        >
          Add Tags
        </button>
      </div>
    </Fragment>
  );
}

export default Backdrop;
