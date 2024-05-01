import { useEffect, useState } from "react";
import getCookie from "./getCookie";
import axios from "axios";

const CheckLoginStatus = () => {
  // Check if authentication token exists in cookies
  const token = getCookie("jwt");

  let isLoggedIn = false;

  if (token) {
    const checkLogin = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:5000/api/v1/auth/checkloginstatus",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Response:", response.status);

        if (response.status === 200) {
          isLoggedIn = true;
          console.log("if true", isLoggedIn);
          return isLoggedIn;
        } else {
          isLoggedIn = false;
          console.log("if false", isLoggedIn);
          return isLoggedIn;
        }
      } catch (error) {
        console.error("Error checking login status:", error);
        isLoggedIn = false;
        console.log("if error", isLoggedIn);
        return isLoggedIn;
      }
    };

    return checkLogin();
  } else {
    console.log("At end", isLoggedIn);
    return isLoggedIn;
  }
};
export default CheckLoginStatus;
