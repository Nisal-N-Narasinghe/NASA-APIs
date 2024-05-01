// components/Star.js
import React from "react";
import "./StarBackground.css";
import Spaceship from "../rocket/Spaceship";
import Pigship from "../rocket/Pigship";

const StarBackground = () => {
  // Randomize star position and animation duration
  const xStart1 = Math.random() * 100;
  const yStart1 = Math.random() * 100;
  const durationStar1 = 10 + Math.random() * 5;
  const xStart2 = Math.random() * 200;
  const yStart2 = Math.random() * 200;
  const durationStar2 = 1 + Math.random() * 5;

  return (
    <div>
      <div
        className='star1'
        style={{
          left: `${xStart1}vw`,
          top: `${yStart1}vh`,
          animationDuration: `${durationStar1}s`,
        }}></div>

      <div
        className='star2'
        style={{
          left: `${xStart2}vw`,
          top: `${yStart2}vh`,
          animationDuration: `${durationStar2}s`,
        }}></div>
    </div>
  );
};

export default StarBackground;
