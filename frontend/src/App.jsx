import React from "react";
import { RouterProvider } from "react-router-dom";
import router from "./routes/routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import StarBackground from "./components/Animations/starFalling/StarBackground";

function App() {
  return (
    <div style={{ backgroundColor: "black" }} className='h-screen '>
      <RouterProvider router={router} />

      <ToastContainer />
      {[...Array(50)].map((_, index) => (
        <StarBackground key={index} />
      ))}
    </div>
  );
}

export default App;
