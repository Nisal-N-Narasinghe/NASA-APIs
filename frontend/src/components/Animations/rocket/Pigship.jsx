import React, { useState, useEffect } from "react";
import "./Rocket.css";

const Pigship = () => {
  const [animation, setAnimation] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const animations = ["move-up", "move-right", "move-left"];
      const randomAnimation =
        animations[Math.floor(Math.random() * animations.length)];
      setAnimation(randomAnimation);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`rocket ${animation} w-28 h-28 md:w-80 md:h-80`}>
      <img src='/assets/images/animation/pigship.png' alt='rocket' />
    </div>
  );
};

export default Pigship;
