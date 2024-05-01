import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import YouTube from "react-youtube";
import ImageSlider from "../components/ImageSlider/ImageSlider";
import Loading from "../components/Animations/Loading/Loading";

const MainSection = () => {
  const [imageUrls, setImageUrls] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchNasaImages = async () => {
      try {
        const response = await fetch(
          `https://api.nasa.gov/planetary/apod?api_key=${
            import.meta.env.VITE_NASA_API_KEY
          }&count=10`
        );
        const data = await response.json();

        if (response.ok) {
          const highQualityImages = data.filter((item) => {
            return (
              item.hdurl &&
              item.hdurl.includes("jpg") &&
              item.hdurl.includes("https://apod.nasa.gov/apod/") &&
              item.hdurl.includes("image/") &&
              item.hdurl.includes("ap")
            );
          });

          setImageUrls(highQualityImages.map((item) => item.hdurl));
        } else {
          setError("Error fetching NASA images. Please try again later.");
        }
      } catch (error) {
        setError("Error fetching NASA images. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchNasaImages();
  }, []);

  return (
    <div
      id='main'
      className='flex flex-col justify-center items-center'
      style={{ background: "black" }}>
      {loading && <Loading />}
      {error && <div className='text-red-600'>{error}</div>}

      {!loading && !error && (
        <div className='flex z-[20] w-[50%] h-[50%] justify-center items-center mb-32'>
          <ImageSlider images={imageUrls} />
        </div>
      )}
    </div>
  );
};

export default MainSection;
