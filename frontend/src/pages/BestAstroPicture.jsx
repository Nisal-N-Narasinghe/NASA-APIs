import React, { useState, useEffect } from "react";
import HomeSlider from "./HomeSlide";

const BestAstroPicture = () => {
  const [data, setData] = useState();

  useEffect(() => {
    fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${
        import.meta.env.VITE_NASA_API_KEY
      }`
    )
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  return (
    <div
      id='bestpicture'
      style={{ backgroundColor: "black" }}
      className='mt-24 '>
      <h1 className='text-white text-2xl  md:text-3xl font-bold text-center z-50 '>
        Astronomy Picture of the Day
      </h1>

      <div className='flex flex-col items-center justify-center '>
        <img
          src={data?.url}
          alt='Astronomy Picture of the Day'
          className='rounded-lg mt-5 w-1/3  z-[20]'
        />
        <p className='text-white text-center mt-5 mb-4 w-7/12 '>
          {data?.explanation}
        </p>
      </div>
    </div>
  );
};

export default BestAstroPicture;
