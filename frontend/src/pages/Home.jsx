import React from "react";
import { useState, useEffect } from "react";
import YouTube from "react-youtube";

const Home = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [videoDimensions, setVideoDimensions] = useState({
    height: 390,
    width: 640,
  });

  useEffect(() => {
    fetchImage();
  }, []);

  const fetchImage = () => {
    fetch(
      `https://api.nasa.gov/EPIC/archive/natural/2019/05/30/png/epic_1b_20190530011359.png?api_key=${
        import.meta.env.VITE_NASA_API_KEY
      }`
    )
      .then((response) => {
        if (response.ok) {
          setImageUrl(response.url);
        } else {
          throw new Error("Failed to fetch image");
        }
      })
      .catch((error) => {
        console.error("Error fetching image:", error);
      });
  };

  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      autoplay: 1,
    },
  };

  useEffect(() => {
    const updateDimensions = () => {
      const aspectRatio = 640 / 390;
      const newWidth = window.innerWidth * 0.4;
      const newHeight = newWidth / aspectRatio;
      setVideoDimensions({
        width: newWidth,
        height: newHeight,
      });
    };

    updateDimensions();

    window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  // YouTube video ID
  const videoId = "P9C25Un7xaM";
  return (
    <div className='flex justify-center items-center h-screen ' id='home'>
      <img
        src={imageUrl}
        alt='Astronomy Picture of The Day'
        className='rounded-lg relative z-10'
        style={{ maxWidth: "50%", maxHeight: "50%" }}
      />
      <div
        style={{ borderRadius: "20px", overflow: "hidden" }}
        className='relative z-[20]'>
        <YouTube videoId={videoId} opts={videoDimensions} />
      </div>
    </div>
  );
};

export default Home;
