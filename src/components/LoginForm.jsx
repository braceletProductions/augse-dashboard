import React, { Fragment, useState } from "react";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";
import { GoDot } from "react-icons/go";
import { useDispatch } from "react-redux";
import { login } from "../../store/slices/auth";
import OtpBox from "./OtpBox";

const LoginForm = ({ onLogin }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [showOtpBox, setShowOtpBox] = useState(false);
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    //perform form validation
    if (email === "" || password === "") {
      setError("Email and password are required");
    } else if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
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
        console.log(response.data);
        if (response.status === 200) {
          if (response.data.status) {
            dispatch(
              login({
                userId: response.data.userId,
                token: response.data.token,
                userType: response.data.userType,
              })
            );
            const res = await fetch("/api/setCookie", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                token: response.data.token,
              }),
            });

            if (res.ok) onLogin(email, password, response.data.userType);
          } else {
            setShowOtpBox(true);
          }
          setLoading(false);
        } else {
          setLoading(false);
          setError("Login Failed. Please check your credentials");
        }
      } catch (error) {
        // console.log("error", error);
        setLoading(false);
        setError("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="w-full">
      <div className="max-w-screen-2xl mx-auto h-screen bg-gray-100">
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
        <div className="rectangle1 mt-20 flex relative justify-center items-center h-screen">
          {showOtpBox ? (
            <OtpBox email={email} password={password} onLogin={onLogin} />
          ) : (
            <Fragment>
              <span className="absolute bg-[#52B8C4] hidden 2xl:block h-[11rem] w-[12rem] rounded-3xl right-[28%] top-[6%]"></span>
              <span className="absolute bg-[#52B8C4] hidden 2xl:block h-[6rem] w-[6rem] rounded-3xl right-[33%] bottom-[12%]"></span>
              <span className="absolute bg-[#52B8C4] hidden 2xl:block h-[9rem] w-[9rem] rounded-3xl left-[30%] top-[12%]"></span>
              <span className="absolute bg-[#52B8C4] hidden 2xl:block h-[7rem] w-[8rem] rounded-3xl left-[32%] bottom-[25%]"></span>
              <div className="bg-[#53afb981] z-50 sm:w-[25rem] w-[20rem] rounded-tr-3xl rounded-bl-3xl border-[1px] border-black shadow-[0_4px_24px_-1px_rgba(0,0,0,0.20)] px-[2rem] py-[3rem]">
                <div className="text-center text-white font-bold text-[3rem]">
                  Login
                </div>
                <div>
                  <div className="mb-6 ">
                    <label
                      htmlFor="email"
                      className="block text-gray-700"
                    ></label>
                    <input
                      type="text"
                      id="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setemail(e.target.value)}
                      className="w-full border border-gray-300 p-1 h-[2rem] rounded-2xl px-[1rem] mt-14"
                    />
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="password"
                      className="block text-gray-700"
                    ></label>
                    <input
                      type="password"
                      id="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full border border-gray-300 p-1 h-[2rem] rounded-2xl px-[1rem]"
                    />
                  </div>
                  <div className="mt-4 mb-6 text-sm text-gray-600">
                    <Link
                      href="/"
                      className="text-gray-100 px-[0.8rem]  text-sm"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                  {error && (
                    <p className="text-red-600 text-center font-bold mt-1">
                      {error}
                    </p>
                  )}
                  <div className="flex justify-center mt-[2rem]">
                    <button
                      onClick={() => handleSubmit()}
                      type="submit"
                      className="bg-[#1383A6] flex text-white pl-6 pr-6 pt-2 pb-2 rounded-xl font-bold shadow-md shadow-black active:shadow-none active:translate-y-1"
                    >
                      {loading ? (
                        <GoDot className="mt-2 animate-bounce" />
                      ) : null}{" "}
                      Login
                    </button>
                  </div>
                </div>
              </div>
            </Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
