import React from "react";
import LoginForm from "@/components/LoginForm";
import Router from "next/router";

const Home = () => {
  const handleLogin = (email, password, path) => {
    if (
      path === "admin" ||
      path === "seller" ||
      path === "procurment" ||
      path === "accountant"
    ) {
      Router.push(`/${path}/dashboard/dashboard`);
    } else {
      window.location.href = "https://augse.in"; // Redirect to Augse.in using JavaScript
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <LoginForm onLogin={handleLogin} />
    </div>
  );
};

export default Home;
