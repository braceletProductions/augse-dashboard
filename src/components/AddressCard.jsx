function AddressCard(props) {
  return (
    <div className="flex">
      <div>
        <div className="my-2 text-[1.25rem] text-blue-300 font-semibold underline">
          Address {props.index && props.index + 1}
        </div>
        <div className="sm:w-96 text-black font-normal px-5">
          <span className="font-semibold">{props.val.name}</span>
          <p className="">
            <span className="font-semibold">House/Street:</span>{" "}
            {props.val.houseNumber} {props.val.street}
          </p>
          <p className="">
            <span className="font-semibold">Landmark:</span>{" "}
            {props.val.landmark}
          </p>
          <p className="">
            <span className="font-semibold">City:</span> {props.val.city}
          </p>
          <p className="">
            <span className="font-semibold">State/Region/Province:</span>{" "}
            {props.val.state}
          </p>
          <p className="">
            <span className="font-semibold">Phone:</span> {props.val.phone}
          </p>
          <p className="">
            <span className="font-semibold">Pin Code:</span> {props.val.pinCode}
          </p>
          <p className="">
            <span className="font-semibold">Country:</span> {props.val.country}
          </p>
        </div>
      </div>
    </div>
  );
}

export default AddressCard;
