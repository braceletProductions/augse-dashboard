import React from "react";
import LoginForm from "../components/LoginForm";

const Login = () => {
  const handleLogin = (username, password) => {
    //     console.log("Logging in with:", username, password);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <LoginForm onLogin={handleLogin} />
    </div>
  );
};

export default Login;
