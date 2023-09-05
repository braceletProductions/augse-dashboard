import React from "react";
import LoginForm from "@/components/LoginForm";
import Router from "next/router";

const Home = () => {
  const handleLogin = (email, password, path) => {
    if (path == "dashboard") {
      Router.push({
        pathname: "/dashboard/dashboard",
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <LoginForm onLogin={handleLogin} />
    </div>
  );
};

export default Home;
