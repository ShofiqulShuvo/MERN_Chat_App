import React from "react";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();
  const handleCLick = () => {
    navigate(-1);
  };
  return (
    <div className="container">
      <div className="mt-5 p-3 text-center">
        <h3 className="mt-3">404 Not Found</h3>
        <button
          className="btn btn-outline-primary mt-3 py-1 px-5"
          onClick={handleCLick}
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default Error;
