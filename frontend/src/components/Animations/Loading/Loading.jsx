import React from "react";
import "./SolarSystemLoading.css";

const Loading = () => {
  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='relative w-48 h-48'>
        {/* <div className='orbit orbit-mercury'></div>
        <div className='orbit orbit-venus'></div>
        <div className='orbit orbit-earth'></div>
        <div className='orbit orbit-mars'></div>
        <div className='orbit orbit-jupiter'></div>
        <div className='orbit orbit-saturn'></div>
        <div className='orbit orbit-uranus'></div>
        <div className='orbit orbit-neptune'></div> */}
        <div className='sun'></div>
        <div className='planet mercury'></div>
        <div className='planet venus'></div>
        <div className='planet earth'></div>
        <div className='planet mars'></div>
        <div className='planet jupiter'></div>
        <div className='planet saturn'></div>
        <div className='planet uranus'></div>
        <div className='planet neptune'></div>
      </div>
    </div>
  );
};

export default Loading;
