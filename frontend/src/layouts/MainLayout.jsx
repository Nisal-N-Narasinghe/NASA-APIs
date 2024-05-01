import { Outlet } from "react-router-dom";
import Sidenav from "../components/Sidenav/Sidenav";
import MainSection from "../pages/MainSection";
import Home from "../pages/Home";
import { useState, useEffect } from "react";
import checkLoginStatus from "../utils/helpers/checkLogingStatus";
import BestAstroPicture from "../pages/BestAstroPicture";
import MarsRover from "../pages/MarsRover";
import TopNavBar from "../components/TopNavBar/TopNavBar";
import Spaceship from "../components/Animations/rocket/Spaceship";

const MainLayout = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    console.log("loginstaus", checkLoginStatus());
    setIsLoggedIn(checkLoginStatus());
  }, []);

  return (
    <div style={{ backgroundColor: "black" }}>
      <Sidenav isLoggedIn={isLoggedIn} />
      <TopNavBar />
      <Outlet />
      <Home />
      <MainSection />
      <BestAstroPicture />
      <MarsRover />

      <Spaceship />
    </div>
  );
};

export default MainLayout;
