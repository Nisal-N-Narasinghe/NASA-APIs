import React, { useState, useEffect } from "react";
import PlanetsData from "../../data/PlanetData";

const SolarSystem = () => {
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlanets((prevPlanets) =>
        prevPlanets.map((planet) => ({
          ...planet,
          angle: (planet.angle + planet.speed) % 360,
        }))
      );
    }, 16);

    setPlanets(PlanetsData.map((planet) => ({ ...planet, angle: 0 })));

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className=' w-96 h-96'>
        {planets.map((planet) => (
          <React.Fragment key={planet.name}>
            {/* Sun */}
            <div className='absolute w-12 h-12 bg-yellow-400 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'></div>
            {/* Orbit */}
            <div
              className='absolute border border-gray-300 rounded-full'
              style={{
                width: `${2 * (planet.distance + planet.radius)}px`,
                height: `${2 * (planet.distance + planet.radius)}px`,
                top: `calc(50% - ${planet.distance + planet.radius}px)`,
                left: `calc(50% - ${planet.distance + planet.radius}px)`,
              }}
            />
            {/* Planet */}
            <div
              className='absolute w-8 h-8 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
              style={{
                backgroundColor: planet.color,
                transform: `translate(-50%, -50%) rotate(${planet.angle}deg) translateX(${planet.distance}px)`,
              }}
            />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default SolarSystem;
