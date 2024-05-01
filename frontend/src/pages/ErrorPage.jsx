// eslint-disable-next-line no-unused-vars
import React from "react";
import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <div>
      <h3 className='text-white'>Page Not Found</h3>
      <Link className='text-white' to='/'>
        Go Back Home
      </Link>
    </div>
  );
}

export default ErrorPage;
