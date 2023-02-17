import React, { useState } from "react";
import { FaEye } from "react-icons/fa";

const Login = () => {
  const [showPass, setShowPass] = useState(false);

  const [userData, setUserData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userData);
  };

  return (
    <>
      <>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="loginemail" className="form-label fw-bold">
              Email:
            </label>
            <input
              type="email"
              className="form-control "
              id="loginemail"
              name="email"
              value={userData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label fw-bold">
              Password:
            </label>
            <div className="input-group">
              <input
                type={showPass ? "text" : "password"}
                className="form-control "
                id="password"
                name="password"
                value={userData.password}
                onChange={handleChange}
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowPass(!showPass)}
              >
                <FaEye />
              </button>
            </div>
          </div>
          <div className="mb-2">
            <button type="submit" className="btn btn-sm btn-primary w-100">
              Login
            </button>
          </div>
        </form>
      </>
    </>
  );
};

export default Login;
