import React, { useState } from "react";
import Image from "next/image";
import axios from "axios";

const LoginForm = ({ onLogin }) => {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    //perform form validation
    if (email === "" || password === "") {
      setError("email and password are required");
    } else if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
    } else {
      setError(""); //clear previous error

      try {
        const response = await axios.post(
          process.env.NEXT_PUBLIC_SERVER_URL + `/user/login_admin`,
          {
            email: email,
            password: password,
          }
        );
        console.log(response);
        if (response.status === 200) {
          //successful login
          onLogin(email, password, response.data.path);
        } else {
          setError("Login Failed. Please check your credentials");
        }
      } catch (error) {
        console.log("error", error);
        setError("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="w-full h-screen bg-gray-100">
      <div className=" ">
        <div className=" w-32 h-1  lg:m-0 ">
          <Image
            src="/logo.png"
            alt="Checkmark"
            width={300}
            height={10}
            className="p-0 m-0"
          />
        </div>
      </div>
      <div className="rectangle1 mt-20 flex justify-center items-center h-screen">
        <div className="rectangle1 w-1/4 h-4/6 rounded-xl shadow-2xl p-8 m-0">
          <div className="justify-center text-center font-bold text-2xl text-gray-100">
            Login
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4 ">
              <label htmlFor="email" className="block text-gray-700"></label>
              <input
                type="text"
                id="email"
                placeholder="email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                className=" w-full border border-gray-300 p-1 rounded-2xl mt-14"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700"></label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 p-1 rounded-2xl "
              />
            </div>
            <div className="mt-4 mb-10 text-sm text-gray-600">
              <a href="#" className="text-gray-100  text-sm">
                Forgot Password?
              </a>
            </div>
            <div className="flex justify-center">
              {" "}
              {/* Center the button */}
              <button
                type="submit"
                className="login text-white pl-6 pr-6 pt-2 pb-2 rounded-xl font-bold shadow-md shadow-black"
              >
                Login
              </button>
            </div>
            {error && <p className="text-red-600  font-bold mt-1">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
