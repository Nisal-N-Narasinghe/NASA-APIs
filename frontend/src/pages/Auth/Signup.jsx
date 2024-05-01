import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Common/Button/Button";
import { FaUserPlus } from "react-icons/fa";
import axios from "axios";
import Cookies from "js-cookie"; // Importing js-cookie library
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigator = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/api/v1/auth/signup",
        formData
      );

      console.log("Signup successful:", response.data);
      console.log("Token:", response.data.message);

      // Save token as a cookie
      Cookies.set("jwt", response.data.token, { expires: 7 }); // Set cookie to expire in 7 days

      toast.success(response.data.message);

      navigator("/");

      // Redirect or show a success message
    } catch (error) {
      console.error("Signup error:", error.message);
      // Handle error, show error message to the user
      toast.error(error.response.data.message || "An error occurred");
    }
  };

  return (
    <div>
      <section className='bg-gray-50 dark:bg-gray-900'>
        <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
          <a
            href='#'
            className='flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white'>
            <img className='w-8 h-8 mr-2' src='/assets/nasa.svg' alt='logo' />
            Nasa Signup
          </a>
          <div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
            <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
              <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
                Create an account
              </h1>
              <form className='space-y-4 md:space-y-6' onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor='name'
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                    Your Name
                  </label>
                  <input
                    type='text'
                    name='name'
                    id='name'
                    value={formData.name}
                    onChange={handleChange}
                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    placeholder='User Name'
                    required
                  />
                </div>
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
                    required
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
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor='confirmPassword'
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                    Confirm password
                  </label>
                  <input
                    type='password'
                    name='confirmPassword'
                    id='confirmPassword'
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder='••••••••'
                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    required
                  />
                </div>
                <div className='flex items-start'>
                  <div className='flex items-center h-5'>
                    <input
                      id='terms'
                      aria-describedby='terms'
                      type='checkbox'
                      className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800'
                      required
                    />
                  </div>
                  <div className='ml-3 text-sm'>
                    <label
                      htmlFor='terms'
                      className='font-light text-gray-500 dark:text-gray-300'>
                      I accept the{" "}
                      <a
                        className='font-medium text-primary-600 hover:underline dark:text-primary-500'
                        href='#'>
                        Terms and Conditions
                      </a>
                    </label>
                  </div>
                </div>
                <div className='flex justify-center'>
                  <Button
                    text='Signup'
                    name='login'
                    variant='outline'
                    icon={<FaUserPlus />}
                    type='submit'
                  />
                </div>
                <p className='text-sm font-light text-gray-500 dark:text-gray-400'>
                  Already have an account?{" "}
                  <Link className='text-white' to='/login'>
                    Login here
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

export default Signup;
