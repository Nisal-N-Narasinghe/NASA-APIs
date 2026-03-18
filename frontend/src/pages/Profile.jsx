import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { FaUserAstronaut, FaEnvelope, FaUserTag } from "react-icons/fa";
import { TbLogout2 } from "react-icons/tb";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:5000/api/v1/user/getme",
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("jwt")}`,
            },
          },
        );

        setUser(response.data.data.user);
      } catch (error) {
        setError(
          error?.response?.data?.message ||
            "Unable to load your profile. Please log in again.",
        );
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, []);

  const handleLogout = () => {
    document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate("/login");
  };

  return (
    <section className='min-h-screen bg-black flex items-center justify-center px-4 py-24'>
      <div className='w-full max-w-3xl rounded-2xl border border-gray-700 bg-gray-900/90 shadow-xl z-[20]'>
        <div className='border-b border-gray-700 px-6 py-5 md:px-10'>
          <div className='flex items-center gap-3'>
            <div className='h-12 w-12 rounded-full bg-gray-800 border border-gray-600 flex items-center justify-center text-white'>
              <FaUserAstronaut size={24} />
            </div>
            <div>
              <h1 className='text-2xl md:text-3xl font-bold text-white'>
                Astronaut Profile
              </h1>
              <p className='text-gray-300 text-sm md:text-base'>
                Your NASA APIs account details
              </p>
            </div>
          </div>
        </div>

        <div className='px-6 py-6 md:px-10 md:py-8'>
          {loading && (
            <div className='rounded-xl border border-gray-700 bg-gray-800 p-5 text-gray-200'>
              Loading profile...
            </div>
          )}

          {!loading && error && (
            <div className='rounded-xl border border-red-500/50 bg-red-900/20 p-5 text-red-200'>
              {error}
            </div>
          )}

          {!loading && !error && user && (
            <div className='space-y-4'>
              <div className='rounded-xl border border-gray-700 bg-gray-800 p-4 md:p-5'>
                <p className='text-xs uppercase tracking-wider text-gray-400 mb-2'>
                  Name
                </p>
                <div className='flex items-center gap-3'>
                  <FaUserAstronaut className='text-white' />
                  <p className='text-white text-lg font-semibold'>
                    {user.name || "Not available"}
                  </p>
                </div>
              </div>

              <div className='rounded-xl border border-gray-700 bg-gray-800 p-4 md:p-5'>
                <p className='text-xs uppercase tracking-wider text-gray-400 mb-2'>
                  Email
                </p>
                <div className='flex items-center gap-3'>
                  <FaEnvelope className='text-white' />
                  <p className='text-white text-lg font-semibold break-all'>
                    {user.email || "Not available"}
                  </p>
                </div>
              </div>

              <div className='rounded-xl border border-gray-700 bg-gray-800 p-4 md:p-5'>
                <p className='text-xs uppercase tracking-wider text-gray-400 mb-2'>
                  Role
                </p>
                <div className='flex items-center gap-3'>
                  <FaUserTag className='text-white' />
                  <p className='text-white text-lg font-semibold capitalize'>
                    {user.role || "user"}
                  </p>
                </div>
              </div>

              <div className='flex flex-col sm:flex-row gap-3 pt-2'>
                <button
                  type='button'
                  onClick={() => navigate("/")}
                  className='rounded-full border-2 border-white px-5 py-2 text-white font-semibold hover:bg-gray-100 hover:text-black transition duration-300'>
                  Back To Home
                </button>
                <button
                  type='button'
                  onClick={handleLogout}
                  className='rounded-full border-2 border-white px-5 py-2 text-white font-semibold hover:bg-gray-100 hover:text-black transition duration-300 flex items-center justify-center gap-2'>
                  <TbLogout2 />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Profile;
