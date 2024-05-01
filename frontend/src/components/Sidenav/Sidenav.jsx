// This is the place where side nav bar data use
import React, { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import SidenavbarData from "../../data/SidenavbarData";
import PropTypes from "prop-types"; // Import prop-types

const Sidenav = ({ isLoggedIn }) => {
  Sidenav.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
  };
  const [nav, setNav] = useState(false);
  const handleNav = () => {
    setNav(!nav);
  };

  const scrollToSection = (link) => {
    const targetElement = document.querySelector(link);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      <AiOutlineMenu
        onClick={handleNav}
        className='fixed top-4 right-4 z-[99] md:hidden text-white'
        size={38}
      />
      {nav && (
        <div className='fixed w-full h-screen bg-gray-500  flex flex-col justify-center items-center z-20 md:hidden'>
          {SidenavbarData.map((item, index) =>
            // Check if the link is for the Profile page and the user is logged in
            (item.link === "/profile" && isLoggedIn) ||
            item.link !== "/profile" ? (
              <a
                key={index}
                href={item.link}
                className='w-[75%] flex justify-center items-center rounded-full shadow-lg bg-gray-100 shadow-gray-400 m-2 p-4 cursor-pointer hover:scale-110 ease-in duration-200'
                onClick={() => scrollToSection(item.link)}>
                <item.icon size={20} />
                <span className='pl-4'>{item.title}</span>
              </a>
            ) : null
          )}
        </div>
      )}

      <div className='md:block hidden fixed top-[25%] z-10 left-4'>
        <div className='flex flex-col'>
          {SidenavbarData.map((item, index) =>
            // Check if the link is for the Profile page and the user is logged in
            (item.link === "/profile" && isLoggedIn) ||
            item.link !== "/profile" ? (
              <a
                key={index}
                href={item.link}
                className='rounded-full shadow-lg bg-gray-100 shadow-gray-400 m-2 p-4 cursor-pointer hover:scale-110 ease-in duration-300 '
                onClick={() => scrollToSection(item.link)}>
                <item.icon size={30} />
              </a>
            ) : null
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidenav;
