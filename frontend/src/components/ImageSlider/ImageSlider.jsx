import React, { useState } from "react";
import PropTypes from "prop-types";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

const ImageSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className='relative w-full'>
      <div className='overflow-hidden w-full'>
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          className='rounded-3xl   transition-transform duration-1000 transform'
        />
      </div>
      <div className='absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2'>
        <button
          onClick={goToPrevSlide}
          className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l'>
          <BsChevronLeft />
        </button>
        <button
          onClick={goToNextSlide}
          className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r'>
          <BsChevronRight />
        </button>
      </div>
    </div>
  );
};

ImageSlider.propTypes = {
  images: PropTypes.array.isRequired,
};

export default ImageSlider;
