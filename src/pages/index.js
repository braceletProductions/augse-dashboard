import React from "react";
import Success from "@/components/success";
import Unsuccess from "@/components/unsuccess";
import Login from "./login";
const Home = () => {
  return (
    <div>
      <dashboard />

      {/* <Success /> */}
      {/* <Unsuccess /> */}

      <Login />
    </div>
  );
};

export default Home;
