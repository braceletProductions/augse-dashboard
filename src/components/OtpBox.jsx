import React, { useRef, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { login } from "../../store/slices/auth";

function OtpBox({ email, password, onLogin }) {
  const dispatch = useDispatch();
  const [otpValues, setOtpValues] = useState(Array(6).fill(""));
  const [timeRemaining, setTimeRemaining] = useState(300);
  const boxes = Array.from({ length: 6 }, () => useRef(null));

  const handleInput = (index, event) => {
    const value = event.target.value;
    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;
    setOtpValues(newOtpValues);

    if (value && index < boxes.length - 1) {
      boxes[index + 1].current.focus();
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && !event.target.value) {
      const newOtpValues = [...otpValues];
      newOtpValues[index - 1] = "";
      setOtpValues(newOtpValues);

      if (index > 0) {
        boxes[index - 1].current.focus();
      }
    }
  };

  const onClickSubmitHandler = async (event) => {
    event.preventDefault();
    const otp = otpValues.join("");

    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_SERVER_URL + `/user/verify_login`,
        {
          email: email,
          password: password,
          otp: otp,
        }
      );

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
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (timeRemaining > 0) {
      const timer = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else {
      //   props.onSubmit();
      //   dispatch(logoutUser());
    }
  }, [timeRemaining]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <div className="absolute h-full w-[100%] bg-[#a7a4a480] z-50 top-0 right-0 flex justify-center items-center">
      <div className="bg-white shadow-lg rounded-2xl p-[2rem]">
        <div className="text-xl">Please enter OTP sent to</div>
        <div className="text-left">*******@gmail.com</div>
        <div className="flex justify-between mx-[1rem] my-[1rem] text-xl">
          {boxes.map((box, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              ref={box}
              value={otpValues[index]}
              className="w-[1.2rem] shadow-md"
              onChange={(event) => handleInput(index, event)}
              onKeyDown={(event) => handleKeyDown(index, event)}
            />
          ))}
        </div>
        <div className="mx-[1rem] flex gap-3">
          Enter the OTP in {formatTime(timeRemaining)}
          <p className="text-[#DECE43]"> Resend Otp</p>
        </div>
        <div
          className="bg-[#DECE43] w-[5rem] px-[1rem] text-[1.2rem] cursor-pointer text-white rounded-md mx-auto mt-[2rem]"
          onClick={onClickSubmitHandler}
        >
          Verify
        </div>
      </div>
    </div>
  );
}

export default OtpBox;
