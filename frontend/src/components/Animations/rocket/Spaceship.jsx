import React, { useState, useEffect } from "react";

const Spaceship = () => {
  const [floating, setFloating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFloating((prevFloating) => !prevFloating);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`ml-auto mr-auto w-32 h-32 md:w-96 md:h-96  transform ${
        floating
          ? "translate-y-2 translate-x-2"
          : "-translate-y-2 -translate-x-2 "
      } transition duration-1000 ease-in-out`}>
      <img
        src='/assets/images/animation/spaceship.png'
        alt='rocket'
        className='left-[50%]'
      />
    </div>
  );
};

export default Spaceship;
