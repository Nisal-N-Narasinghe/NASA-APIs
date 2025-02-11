import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Common/Button/Button";
import { FaSignInAlt } from "react-icons/fa";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import StarBackground from "../../components/Animations/starFalling/StarBackground";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigator = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://nasa-apis-server.vercel.app/api/v1/auth/login",
        formData
      );

      console.log("Login successful:", response.data);

      // Save token in cookies
      Cookies.set("jwt", response.data.token, { expires: 7 });

      toast.success(response.data.message);

      // Redirect user to the home page
      navigator("/");
    } catch (error) {
      console.error("Login error:", error.message);
      // Handle error, show error message to the user
      toast.error(error.response.data.message || "An error occurred");
    }
  };

  return (
    <div>
      <section className='bg-gray-50 dark:bg-gray-900 z-50'>
        <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
          <a
            href='#'
            className='flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white'>
            <img className='w-8 h-8 mr-2' src='/assets/nasa.svg' alt='logo' />
            Nasa Login
          </a>
          <div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
            <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
              <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
                Sign in to your account
              </h1>
              <form className='space-y-4 md:space-y-6' onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor='email'
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                    Your email
                  </label>
                  <input
                    type='email'
                    name='email'
                    id='email'
                    value={formData.email}
                    onChange={handleChange}
                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    placeholder='sample@gmail.com'
                    required=''
                  />
                </div>
                <div>
                  <label
                    htmlFor='password'
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                    Password
                  </label>
                  <input
                    type='password'
                    name='password'
                    id='password'
                    value={formData.password}
                    onChange={handleChange}
                    placeholder='••••••••'
                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    required=''
                  />
                </div>
                <div className='flex items-center justify-between'>
                  <div className='flex items-start'>
                    <div className='flex items-center h-5'>
                      <input
                        id='remember'
                        aria-describedby='remember'
                        type='checkbox'
                        className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800'
                        required=''
                      />
                    </div>
                    <div className='ml-3 text-sm'>
                      <label
                        htmlFor='remember'
                        className='text-gray-500 dark:text-gray-300'>
                        Remember me
                      </label>
                    </div>
                  </div>
                  <a
                    href='#'
                    className='text-sm font-medium text-white hover:underline dark:text-primary-500'>
                    Forgot password?
                  </a>
                </div>

                <div className='flex justify-center'>
                  <Button
                    text='Login'
                    name='login'
                    variant='outline'
                    icon={<FaSignInAlt />}
                    type='submit'
                  />
                </div>

                <p className='text-sm font-light text-gray-500 dark:text-gray-400'>
                  Don’t have an account yet?{" "}
                  <Link className='text-white' to='/signup'>
                    Sign up
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
