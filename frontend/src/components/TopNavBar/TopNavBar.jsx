import React, { useEffect, useState } from "react";
import checkLoginStatus from "../../utils/helpers/checkLogingStatus";
import Button from "../Common/Button/Button";
import { TbLogout2 } from "react-icons/tb";
import { FaUserPlus, FaSignInAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import SolarSystem from "../SolarSytem/SolarSytem";

const TopNavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoggedIn(checkLoginStatus());
  }, []);

  const handleLogout = () => {
    // Clear authentication token from cookies
    document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <div
      className='fixed w-full flex justify-between items-center  p-4 pr-16  md:pr-4 text-white  z-50'
      style={{ background: "black" }}>
      <Link to='https://api.nasa.gov/' target='_blank'>
        <div className='flex'>
          <img className='w-8 h-8 mr-2' src='/assets/nasa.svg' alt='logo' />
          <h1 className='text-2xl font-bold'>NASA APIs</h1>
        </div>
      </Link>
      <div className='flex'></div>
      <div className=' flex top-4 md:top-8 right-16 md:right-6 space-x-2 md:space-x-4'>
        {!isLoggedIn && (
          <>
            <Link className='text-white' to='/login'>
              <Button
                text='Login'
                name='login'
                variant='outline'
                icon={<FaSignInAlt />}
              />
            </Link>
            <Link className='text-white' to='/signup'>
              <Button
                text='Signup'
                name='login'
                variant='outline'
                icon={<FaUserPlus />}
              />
            </Link>
          </>
        )}

        {isLoggedIn && (
          <Button
            text='Logout'
            name='login'
            variant='outline'
            icon={<TbLogout2 />}
            onClick={handleLogout}
          />
        )}
      </div>
    </div>
  );
};

export default TopNavBar;
