import React, { useEffect, useState } from "react";
import Loading from "../components/Animations/Loading/Loading";
import Button from "../components/Common/Button/Button";
import { FaFilter } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CAMERA_TYPES, ROVER_TYPES } from "../data/MarsRoverData";

const MarsRover = () => {
  const BASE_URL = "https://api.nasa.gov/mars-photos/api/v1/rovers";

  const [photoData, setphotoData] = useState([]);

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedCamera, setSelectedCamera] = useState("");
  const [selectedRover, setSelectedRover] = useState("curiosity");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDateChange = (event) => {
    const selectedDate = event.target.value;
    const maxDate = new Date("2024-01-01").toISOString().split("T")[0];

    // Check if the selected date is below 2023-01-01
    if (selectedDate <= maxDate) {
      setSelectedDate(selectedDate);
    } else {
      // If selected date is above 2023-01-01, show an error or prevent further action
      setError("Please select a date before 2024.");
      toast.error("Please select a date before 2024.");
    }
  };

  const handleCameraChange = (event) => {
    setSelectedCamera(event.target.value);
  };

  const handleRoverChange = (event) => {
    setSelectedRover(event.target.value);
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${BASE_URL}/${selectedRover}/photos?earth_date=${selectedDate}&camera=${selectedCamera}&api_key=${
          import.meta.env.VITE_NASA_API_KEY
        }`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      console.log(data);
      if (data.photos.length === 0) {
        throw new Error("No data available for selected areas.");
      }
      setphotoData(data.photos);
    } catch (error) {
      toast.error("No data available for selected areas.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id='marsrover' className='container mx-auto p-4 '>
      <h2 className='text-2xl md:text-3xl font-semibold mb-8 mt-4  text-white text-center'>
        Mars Rover Photos
      </h2>
      <div className='flex flex-row justify-center items-center space-x-3'>
        <div className='mb-4  '>
          <label htmlFor='rover' className='mr-2 text-white z-[20]'>
            Select Rover:
          </label>
          <select
            id='rover'
            onChange={handleRoverChange}
            className='border border-gray-300 rounded px-2 py-1 z-[20]'>
            {ROVER_TYPES.map((rover) => (
              <option key={rover} value={rover.toLowerCase()}>
                {rover}
              </option>
            ))}
          </select>
        </div>
        <div className='mb-4 '>
          <label htmlFor='date' className='mr-2 text-white z-[20]'>
            Select Date:
          </label>
          <input
            type='date'
            id='date'
            onChange={handleDateChange}
            className='border border-gray-300 rounded px-2 py-1 z-[20]'
          />
        </div>
        <div className='mb-4 '>
          <label htmlFor='camera' className='mr-2 text-white z-[20]'>
            Select Camera:
          </label>
          <select
            id='camera'
            onChange={handleCameraChange}
            className='border border-gray-300 rounded px-2 py-1 z-[20]'>
            {CAMERA_TYPES.map((camera) => (
              <option key={camera} value={camera}>
                {camera}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className='flex flex-col justify-center items-center mb-4'>
        <Button
          onClick={handleSearch}
          text='Filter'
          name='filter'
          variant='outline'
          icon={<FaFilter />}
        />
      </div>
      {loading && <Loading />}
      {/* {error && <p className='mt-4 text-red-500'>{error}</p>} */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 '>
        {photoData.map((image) => (
          <img
            key={image.id}
            src={image.img_src}
            alt='Mars Rover'
            className='rounded-lg  z-[20] flex justify-center items-center w-full h-64 object-cover'
          />
        ))}
      </div>
    </div>
  );
};

export default MarsRover;
