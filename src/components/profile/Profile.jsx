import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const [profile, setProfile] = useState({});
  const name = "John Doe";
  const phone = "123-456-7890";
  const email = "john.doe@example.com";
  
  useEffect(() => {}, []);

  return (
    <div className="w-full min-h-screen bg-white">
      <div
        className="w-full h-28 pt-8"
        style={{
          background: `url(
            "https://img.freepik.com/free-vector/background-realistic-abstract-technology-particle_23-2148431735.jpg?w=996&t=st=1700637262~exp=1700637862~hmac=d66e12260b843867f286fee7e4669c62b4de4e9a29ca57f8008d10f0d5bcf70c"
          )`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            className="h-40 mx-auto"
            alt="Profile Picture"
          />
          <h1 className="text-center">{name}</h1>
        </div>
      </div>
      <div className="mt-36 flex mx-10 gap-10">
        <div className="flex-1">
          <h2 className="text-center">Basic Information</h2>
          <table className="w-full border-collapse mt-4">
            <tbody>
              <tr>
                <td className="border p-3 text-left text-gray-600 font-medium">
                  Name
                </td>
                <td className="border p-3 text-left text-gray-800">{name}</td>
              </tr>
              <tr>
                <td className="border p-3 text-left text-gray-600 font-medium">
                  Phone
                </td>
                <td className="border p-3 text-left text-gray-800">{phone}</td>
              </tr>
              <tr>
                <td className="border p-3 text-left text-gray-600 font-medium">
                  Email
                </td>
                <td className="border p-3 text-left text-gray-800">{email}</td>
              </tr>
              <tr>
                <td className="border p-3 text-left text-gray-600 font-medium">
                  Employee Type
                </td>
                <td className="border p-3 text-left text-gray-800">{email}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex-1">
          <h2 className="text-center">Other Information</h2>
          <table className="w-full border-collapse mt-4">
            <tbody>
              <tr>
                <td className="border p-3 text-left text-gray-600 font-medium">
                  Name
                </td>
                <td className="border p-3 text-left text-gray-800">{name}</td>
              </tr>
              <tr>
                <td className="border p-3 text-left text-gray-600 font-medium">
                  Phone
                </td>
                <td className="border p-3 text-left text-gray-800">{phone}</td>
              </tr>
              <tr>
                <td className="border p-3 text-left text-gray-600 font-medium">
                  Email
                </td>
                <td className="border p-3 text-left text-gray-800">{email}</td>
              </tr>
              <tr>
                <td className="border p-3 text-left text-gray-600 font-medium">
                  Employee Type
                </td>
                <td className="border p-3 text-left text-gray-800">{email}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Profile;
