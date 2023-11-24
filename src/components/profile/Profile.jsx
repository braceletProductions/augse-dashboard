import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../store/slices/auth";
import { useRouter } from "next/router";

const Profile = () => {
  const [profile, setProfile] = useState({});
  const userId = useSelector((state) => state.auth.userId);
  const dispatch = useDispatch();
  const router = useRouter();
  const name = "John Doe";
  const phone = "123-456-7890";
  const email = "john.doe@example.com";

  const handleLogout = () => {
    dispatch(logout());
    router.replace("/");
  };

  const serverTimeZoneOffsetMinutes = 5 * 60 + 30; // 5 hours and 30 minutes in minutes
  const currentTimestamp = Math.floor(
    Date.now() / 1000 - serverTimeZoneOffsetMinutes * 60
  );

  useEffect(() => {
    const fetchProfileInfo = async () => {
      if (!userId) return;
      try {
        const response = await axios.get(
          process.env.NEXT_PUBLIC_SERVER_URL + "/user/me/" + userId,
          {
            params: {
              timestamp: currentTimestamp,
            },
          }
        );
        setProfile(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProfileInfo();
  }, []);

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
          <h1 className="text-center">{profile.name}</h1>
        </div>
      </div>
      <div className="mt-36 xl:flex mx-10 gap-10">
        <div className="flex-1">
          <h2 className="text-center">Basic Information</h2>
          <table className="w-full border-collapse mt-4">
            <tbody>
              <tr>
                <td className="border p-3 text-left text-gray-600 font-medium">
                  Name
                </td>
                <td className="border p-3 text-left text-gray-800">
                  {profile.name}
                </td>
              </tr>
              <tr>
                <td className="border p-3 text-left text-gray-600 font-medium">
                  Phone
                </td>
                <td className="border p-3 text-left text-gray-800">
                  {profile.phone}
                </td>
              </tr>
              <tr>
                <td className="border p-3 text-left text-gray-600 font-medium">
                  Email
                </td>
                <td className="border p-3 text-left text-gray-800">
                  {profile.email}
                </td>
              </tr>
              <tr>
                <td className="border p-3 text-left text-gray-600 font-medium">
                  Employee Type
                </td>
                <td className="border p-3 text-left text-gray-800">
                  {profile.employeeType}
                </td>
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
      <button
        className="text-white absolute bottom-10 right-10 px-4 py-2 bg-[#033A57] rounded hover:bg-[#041E3E]"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
