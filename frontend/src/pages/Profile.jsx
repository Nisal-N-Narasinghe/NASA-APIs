import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const Profile = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    //check if user is logged in

    const getUser = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:5000/api/v1/user/getMe",
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("jwt")}`,
            },
          }
        );
        console.log("User:", response.data);
        setUser(response.data.data.user);
      } catch (error) {
        console.error("User fetch error:", error.message);
      }
    };
    getUser();
  }, []);

  return (
    <div>
      <h2 className='text-white'>Profile</h2>
    </div>
  );
};

export default Profile;
